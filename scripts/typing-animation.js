document.addEventListener('DOMContentLoaded', function() {
    const initialPhrase = "afé de Paris";
    const phrases = [
      "afé de Paris",
      "ozy Corner",
      "ulinary Delights",
      "harming Moments",
      "rafted Excellence"
    ];
    
    const typingText1 = document.getElementById('typingText1');
    const typingText2 = document.getElementById('typingText2');
    
    // Set the static "C"
    typingText1.textContent = 'C';
    
    // Initial typing animation for "afé de Paris"
    async function typeInitialPhrase() {
      typingText2.textContent = '';
      let currentText = '';
      for (let char of initialPhrase) {
        currentText += char;
        typingText2.textContent = currentText;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
      startPhraseAnimation();
    }
    
    // Animate the rest of each phrase with skewed bounce effect
    async function animatePhrase(phrase) {
      typingText2.style.opacity = '0';
      typingText2.style.transform = 'translateY(20px) skew(-10deg)';
      await new Promise(resolve => setTimeout(resolve, 100));
      
      typingText2.textContent = phrase;
      typingText2.classList.remove('bounce-in');
      void typingText2.offsetWidth;
      typingText2.classList.add('bounce-in');
      
      await new Promise(resolve => setTimeout(resolve, 4000));
    }
    
    // Start the phrase animation cycle
    async function startPhraseAnimation() {
      while (true) {
        for (let phrase of phrases) {
          await animatePhrase(phrase);
        }
      }
    }
    
    // Start with typing animation
    typeInitialPhrase();
  });