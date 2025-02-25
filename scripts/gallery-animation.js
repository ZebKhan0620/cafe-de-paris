// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector('.cluster')) {
    animateAbout();
  }
  
  if(document.querySelector('.concept-animation')) {
    animateConcept();
  }
  
  // Title animations
  const titles = document.querySelectorAll('.title');
  titles.forEach(title => {
    let words = title.textContent.split(' ');
    let html = '';
    words.forEach(word => {
      html += `<div class="word-wrap"><div class="word">${word}</div></div> `;
    });
    title.innerHTML = html;

    gsap.from(title.querySelectorAll('.word'), {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
});

// Concept Section Animation (restored to original)
function animateConcept() {
  // Set initial positions with improved opacity handling
  gsap.set(".concept-animation .concept-image", {
    opacity: 0.4,
    xPercent: -80,
    scale: 0.98  // Slightly larger initial scale for subtler growth
  });

  gsap.set(".concept-animation .concept-circle", {
    opacity: 0.4,
    xPercent: -10,
    scale: 0.98
  });

  gsap.set(".concept-animation .decorative-dots", {
    opacity: 0.4,
    xPercent: -10,
    scale: 0.98
  });

  // Enhanced timeline with smoother scroll settings
  const conceptTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".concept-animation",
      start: "top 65%",
      end: "bottom 15%",
      scrub: 2.5,        // Slightly increased for even smoother scrolling
      toggleActions: "play reverse play reverse",
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: true,
      smoothDistribution: true  // Added for smoother motion
    }
  });

  // Refined animations with optimized opacity transitions
  conceptTL
    .fromTo(".concept-image", {
      opacity: 1,
      xPercent: 0,
      yPercent: -10,
      fade: "easeInOut",
      scale: 0.98,
    }, {
      opacity: 1,
      xPercent: -50,
      scale: 1,
      yPercent: 10,
      duration: 5,
      ease: "power2.inOut"
    })
    .fromTo(".concept-circle", {
      opacity: 0,
      xPercent: -10,
      scale: 0.98,
    }, {
      opacity: 1,
      xPercent: 80,
      scale: 1,
      duration: 5,
      ease: "power2.inOut"
    }, "<0.2")
    .fromTo(".decorative-dots", {
      opacity: 0,
      xPercent: -10,
      scale: 0.98,
    }, {
      opacity: 1,
      xPercent: 50,
      scale: 1,
      duration: 6,
      ease: "power2.inOut"
    }, "<0.3");

  // Enhanced floating animation
  gsap.to([".concept-circle", ".decorative-dots"], {
    y: "4%",
    duration: 6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    stagger: {
      amount: 0.4,
      ease: "power1.inOut"
    },
    yoyoEase: "power1.inOut"
  });
}


// About Section Animation
function animateAbout() {
  // TRIANGLE ANIMATIONS

  gsap.fromTo(".cluster .triangle", 
    { rotation: 0 },
    {
      rotation: 360,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%",
        end: "30% 15%",
        scrub: 1,   
        toggleActions: "play none none reverse",
        smoothDistribution: true,
        anticipatePin: 1.5,
        fastScrollEnd: true,
        preventOverlaps: true,
        overwrite: true,
      },
      ease: "sine.inOut",
      transformOrigin: "center center"
    }
  );

  // OWL IMAGE ANIMATIONS
  gsap.set(".cluster .owlHorned", {
    opacity: 0,
    xPercent: -50,
  });

  // DOTS ANIMATIONS
  gsap.set(".cluster .dotsBlue", {
    opacity: 0,
    xPercent: 50,
    yPercent: -90
  });

  // MAIN TIMELINE (for opacity and movement)
  const aboutTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%",
      end: "center center",
      toggleActions: "play none none reverse",
      scrub: 1.5
    }
  });

  aboutTL
    .to(".cluster .owlHorned", {
      opacity: 1,
      xPercent: 0,
      yPercent: -20,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5")
    .to(".cluster .dotsBlue", {
      opacity: 1,
      xPercent: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5");

  // HOVER EFFECTS (for owl and dots only)
  const elements = document.querySelectorAll('.cluster .owlHorned, .cluster .dotsBlue');
  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

// Global defaults
gsap.defaults({
  ease: "power2.inOut",
  duration: 2
});
