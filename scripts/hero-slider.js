document.addEventListener('DOMContentLoaded', () => {
    const sections = gsap.utils.toArray(".hero-section .slide");
    const outerWrappers = gsap.utils.toArray(".hero-section .slide__outer");
    const innerWrappers = gsap.utils.toArray(".hero-section .slide__inner");
    let animating = false;
    let currentIndex = 0;
  
    // Initial setup
    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".hero-section .slide:first-child .slide__outer", { xPercent: 0 });
    gsap.set(".hero-section .slide:first-child .slide__inner", { xPercent: 0 });
  
    function gotoSection(index, direction) {
      if (animating) return;
      
      animating = true;
      index = gsap.utils.wrap(0, sections.length)(index);
  
      let tl = gsap.timeline({
        defaults: { duration: 1.6, ease: "power2.inOut" },
        onComplete: () => {
          animating = false;
        }
      });
  
      // Set visibility and z-index
      gsap.set(sections, { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index]], { zIndex: 2, autoAlpha: 1 });
  
      // Animate transition
      tl.fromTo(
        outerWrappers[index],
        { xPercent: 100 * direction },
        { xPercent: 0 },
        0
      )
      .fromTo(
        innerWrappers[index],
        { xPercent: -100 * direction },
        { xPercent: 0 },
        0
      );
  
      currentIndex = index;
    }
  
    // Autoplay function
    function autoPlay() {
      gsap.to({}, {
        duration: 4, // Change slide every 4 seconds
        repeat: -1,
        onRepeat: () => {
          gotoSection(currentIndex + 1, 1);
        }
      });
    }
  
    // Start autoplay
    autoPlay();
  });