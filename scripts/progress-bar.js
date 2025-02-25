document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('progress-bar');
  const progressParent = progressBar.parentElement;
  let currentProgress = 0;
  let targetProgress = 0;
  let velocity = 0;
  let lastTime = performance.now();
  let isVisible = false;

  // Enhanced spring physics parameters
  const spring = {
    stiffness: 0.05,    // Reduced for smoother movement
    damping: 0.75,      // Adjusted for natural feel
    mass: 1,            // Added mass for more realistic physics
    precision: 0.001    // Increased precision
  };

  // Show/hide progress bar with fade effect
  const toggleProgressBar = (show) => {
    if (show !== isVisible) {
      isVisible = show;
      progressParent.style.opacity = show ? '1' : '0';
      progressParent.style.transform = show ? 'translateY(0)' : 'translateY(-100%)';
    }
  };

  // Enhanced scroll progress calculation with boundaries
  const calculateScrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = Math.max(0, Math.min(window.scrollY, documentHeight));
    return Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
  };

  // Improved animation with physics-based interpolation
  const animate = (currentTime) => {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;

    // Calculate spring force with mass
    const distance = targetProgress - currentProgress;
    const acceleration = (distance * spring.stiffness) / spring.mass;
    
    // Update velocity with damping
    velocity += acceleration;
    velocity *= spring.damping;
    
    // Update position
    currentProgress += velocity;

    // Apply easing at the edges
    if (currentProgress < 0) {
      currentProgress = 0;
      velocity = 0;
    } else if (currentProgress > 100) {
      currentProgress = 100;
      velocity = 0;
    }

    // Update progress bar with transform for better performance
    progressBar.style.transform = `translateX(${currentProgress - 100}%)`;

    // Add subtle gradient effect based on velocity
    const hue = Math.abs(velocity) * 10;
    progressBar.style.backgroundColor = `hsl(${hue + 340}, 85%, 65%)`; // Adjust base color as needed

    // Continue animation if movement is still significant
    if (Math.abs(distance) > spring.precision || Math.abs(velocity) > spring.precision) {
      requestAnimationFrame(animate);
    }
  };

  // Optimized scroll handler with debounce and RAF
  let scrollTimeout;
  let rafId;
  
  const handleScroll = () => {
    // Show progress bar
    toggleProgressBar(true);

    // Update target progress
    targetProgress = calculateScrollProgress();
    
    // Reset timeout for hiding progress bar
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (targetProgress === 0 || targetProgress === 100) {
        toggleProgressBar(false);
      }
    }, 1500);

    // Start animation if not already running
    if (!rafId) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(function update(time) {
        animate(time);
        if (Math.abs(targetProgress - currentProgress) > spring.precision) {
          rafId = requestAnimationFrame(update);
        } else {
          rafId = null;
        }
      });
    }
  };

  // Optimized event listeners
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial setup
  handleScroll();
}); 