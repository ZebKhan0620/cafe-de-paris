document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  // Mouse movement parallax
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    parallaxElements.forEach((element, index) => {
      const speed = index === 0 ? 0.03 : 0.02;
      const x = (clientX - centerX) * speed;
      const y = (clientY - centerY) * speed;
      
      element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.05}deg)`;
    });
  });

  // Scroll parallax
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.setProperty('--scroll-offset', `${scrolled * speed}px`);
    });
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    parallaxElements.forEach(element => {
      element.style.transform = 'translate(0, 0) rotate(0deg)';
    });
  });
}); 