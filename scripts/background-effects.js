document.addEventListener('DOMContentLoaded', () => {
  initBackgroundEffects();
  initScrollAnimations();
});

function initBackgroundEffects() {
  // Add smooth reveal animations
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-4');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(element => {
    element.classList.add('transform', 'transition-all', 'duration-700', 'opacity-0', 'translate-y-4');
    observer.observe(element);
  });

  // Add floating animation to decorative elements
  const floatingElements = document.querySelectorAll('.floating');
  floatingElements.forEach((el, index) => {
    el.style.animation = `float ${3 + Math.random()}s ease-in-out ${index * 0.2}s infinite`;
  });
}

function initScrollAnimations() {
  // Add parallax scroll effect to background
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }
} 