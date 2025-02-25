class MeshGradient {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('webgl');
    this.vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]);
    
    // Match the color palettes from nice-color-palettes
    this.colorPalettes = [
      ["#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900"],
      ["#fe4365", "#fc9d9a", "#f9cdad", "#c8c8a9", "#83af9b"],
      ["#ecd078", "#d95b43", "#c02942", "#542437", "#53777a"],
      // Add more color palettes as needed
    ];
    
    this.currentPalette = 0;
    this.speed = 0.01;
    this.time = 0;
    this.wireframe = false;
    this.backgroundColor = '#1f1c1c';
    this.init();
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  toggleWireframe() {
    this.wireframe = !this.wireframe;
    this.updateShaders();
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
  }

  randomizePalette() {
    this.currentPalette = Math.floor(Math.random() * this.colorPalettes.length);
    this.updateColors();
  }

  init() {
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec3 colors[5];
      uniform float time;
      uniform bool wireframe;
      varying vec2 vUv;

      vec2 rotate(vec2 v, float a) {
        float s = sin(a);
        float c = cos(a);
        mat2 m = mat2(c, -s, s, c);
        return m * v;
      }

      void main() {
        vec2 uv = vUv;
        vec2 center = vec2(0.5);
        vec2 toCenter = uv - center;
        
        // Rotate UV coordinates
        uv = rotate(toCenter, time * 0.5) + center;
        
        // Create mesh pattern
        float distortion = sin(uv.x * 10.0 + time) * 0.1 +
                          cos(uv.y * 8.0 - time) * 0.1;
        
        float d = length(toCenter) + distortion;
        
        vec3 color = colors[0];
        for(int i = 1; i < 5; i++) {
          float factor = sin(d * 10.0 - float(i) * 1.5 + time) * 0.5 + 0.5;
          color = mix(color, colors[i], factor);
        }
        
        if(wireframe) {
          float grid = abs(fract(uv.x * 10.0) - 0.5) + 
                      abs(fract(uv.y * 10.0) - 0.5);
          color = mix(color, vec3(1.0), step(0.05, grid));
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Create and compile shaders
    this.program = this.createProgram(vertexShaderSource, fragmentShaderSource);
    this.ctx.useProgram(this.program);

    // Set up attributes and uniforms
    this.setupBuffers();
    this.updateColors();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  createProgram(vertexSource, fragmentSource) {
    const vertexShader = this.ctx.createShader(this.ctx.VERTEX_SHADER);
    const fragmentShader = this.ctx.createShader(this.ctx.FRAGMENT_SHADER);

    this.ctx.shaderSource(vertexShader, vertexSource);
    this.ctx.shaderSource(fragmentShader, fragmentSource);

    this.ctx.compileShader(vertexShader);
    this.ctx.compileShader(fragmentShader);

    const program = this.ctx.createProgram();
    this.ctx.attachShader(program, vertexShader);
    this.ctx.attachShader(program, fragmentShader);
    this.ctx.linkProgram(program);

    return program;
  }

  setupBuffers() {
    const positionBuffer = this.ctx.createBuffer();
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, positionBuffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, this.vertices, this.ctx.STATIC_DRAW);

    const position = this.ctx.getAttribLocation(this.program, 'position');
    this.ctx.enableVertexAttribArray(position);
    this.ctx.vertexAttribPointer(position, 2, this.ctx.FLOAT, false, 0, 0);

    this.timeLocation = this.ctx.getUniformLocation(this.program, 'time');
    this.wireframeLocation = this.ctx.getUniformLocation(this.program, 'wireframe');
    this.colorsLocation = this.ctx.getUniformLocation(this.program, 'colors');
  }

  updateColors() {
    const colors = this.colorPalettes[this.currentPalette].map(this.hexToRGB).flat();
    this.ctx.uniform3fv(this.colorsLocation, new Float32Array(colors));
  }

  hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  }

  resize() {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth * pixelRatio;
    const height = window.innerHeight * pixelRatio;
    
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    
    this.ctx.viewport(0, 0, width, height);
  }

  animate() {
    this.time += this.speed;
    this.ctx.uniform1f(this.timeLocation, this.time);
    this.ctx.uniform1i(this.wireframeLocation, this.wireframe);
    
    const bgColor = this.hexToRGB(this.backgroundColor);
    this.ctx.clearColor(bgColor[0], bgColor[1], bgColor[2], 1);
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
    this.ctx.drawArrays(this.ctx.TRIANGLES, 0, 6);
    
    requestAnimationFrame(() => this.animate());
  }

  mount(container) {
    this.canvas.className = 'fixed inset-0 w-full h-full -z-10';
    container.appendChild(this.canvas);
  }
}

// Initialize gradient when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const gradient = new MeshGradient();
  gradient.mount(document.body);

  // Optional: Add controls
  window.gradient = gradient; // Make it accessible globally for debugging
}); 