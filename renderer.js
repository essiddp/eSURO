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

const urls = [
  "in-app/jeopardy/indexJeopardy.html",
  "in-app/pascal.html",
  "in-app/wordhunt/wordhunt.html",
  "in-app/wheel.html",
  "in-app/bingo/indexBingo.html"
];

// Function to get a random URL from the array
function getRandomUrl() {
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
}

// Event listener for the image click
document.getElementById("random-link").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default anchor click behavior
  const randomUrl = getRandomUrl();
  window.location.href = randomUrl; // Redirect to the random URL
});