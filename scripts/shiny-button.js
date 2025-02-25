document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.shiny-button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.querySelector('.shiny-button-content').style.opacity = '0.9';
    });
    
    button.addEventListener('mouseleave', function() {
      this.querySelector('.shiny-button-content').style.opacity = '1';
    });
  });
}); 