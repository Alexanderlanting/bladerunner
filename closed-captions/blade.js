document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.container'); // Change the selector to match your container element
  const word = 'Fuck off';
  const times = 100;


  for (let i = 0; i < times; i++) {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.position = 'fixed';
    span.style.top = `${Math.random() * 100}vh`;
    // Subtract the maximum width of the text from the maximum possible left value
    const maxLeft = 100 - (1 * word.length); 
    span.style.left = `${Math.random() * maxLeft}vw`;
    span.style.transformOrigin = 'center';  // Set the transform origin to center
    container.appendChild(span);
  }
  

  const voice3 = document.querySelector('.voice3');

 // Create a new MutationObserver instance
// Create a new MutationObserver instance
const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'class') {
        const classList = voice3.classList;
        const iframe = document.querySelector('iframe');
        if (classList.contains('off')) {
          container.style.display = 'none';
          // Reset the animation
          iframe.style.animation = '';
        } else if (classList.contains('on')) {
          container.style.display = 'block';
          // Apply the animation to all span elements
          const spans = container.querySelectorAll('span');
          for (let span of spans) {
            span.style.animation = 'grow 2s ease forwards';
          }
          // Apply the animation to the iframe
          iframe.style.animation = 'shrink 2s ease forwards';
        }
      }
    }
  });
  
  
  

  // Start observing mutations in the attributes of the voice3 element
  observer.observe(voice3, { attributes: true });
});
