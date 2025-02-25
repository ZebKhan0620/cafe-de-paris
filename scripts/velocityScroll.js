function createScrollEffect(containerId, contentId, direction = 1) {
  const container = document.getElementById(containerId);
  const content = document.getElementById(contentId);
  
  if (!container || !content) return;
  
  let scrollPosition = 0;
  let ticking = false;

  const updatePosition = (scrollPos) => {
    // Reduced speed by lowering the multiplier (0.05 -> 0.02)
    let translateX = (scrollPos * direction * 0.02);
    
    // Create looping effect by resetting position
    const moveAmount = Math.abs(translateX % 100);
    translateX = direction > 0 ? -moveAmount : moveAmount;
    
    // Apply transform with smooth easing
    content.style.transform = `translateX(${translateX}%)`;
  };

  window.addEventListener('scroll', () => {
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top;
    
    // Smooth out the scroll position
    scrollPosition = -containerTop;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updatePosition(scrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial position
  updatePosition(scrollPosition);
}

// Adjust the speed multipliers for each row
document.addEventListener('DOMContentLoaded', () => {
  createScrollEffect('scrollContainer1', 'scrollContent1', 0.95);   // Slightly slower
  createScrollEffect('scrollContainer2', 'scrollContent2', -0.85);  // Even slower
  createScrollEffect('scrollContainer3', 'scrollContent3', 0.90);   // Varied speed
  createScrollEffect('scrollContainer4', 'scrollContent4', -0.80);  // Slowest
}); 