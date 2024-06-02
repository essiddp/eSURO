// document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('music');

  // Unmute the audio after the page has loaded
  audio.muted = false;
  if (audio.paused) {
    audio.play().catch((error) => {
      console.error('Autoplay failed:', error);
    });
  }
  
// });