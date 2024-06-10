const button = document.getElementById('inputButton');
const home = document.getElementById('homeButton');
const triangleContent = document.getElementById('triangle');
const form = document.getElementById('triangleForm');

let numCache = [];

function solveTriangle(n) {
  let result = [];
  numCache = []; // Clear cache memory
  for (let line = 1; line <= n; line++) {
    let numLine = [];
    let C = 1; // used to represent C(line, i)
    for (let i = 1; i <= line; i++) {
      if (line == n) {
        numCache.push(C);
      }
      // The first value in a line is always 1
      numLine.push(C + "&nbsp&nbsp&nbsp&nbsp&nbsp");
      C = C * (line - i) / i;
    }
    result.push(numLine.join(""));
  }
  return result.join("<br>");
}

function getExpansion(n) {
  let terms = [];
  let xval, yval;
  for (let i = 0; i <= n; i++) {
    if (i == 0) {
      terms.push("x<sup>" + (n - 1) + "</sup>");
    } else if (i == n) {
      terms.push("y<sup>" + (n - 1) + "</sup>");
    } else {
      xval = (n - 1) - i;
      yval = i;
      if (xval > 0) {
        terms.push(numCache[i] + "x<sup>" + xval + "</sup>" + "y<sup>" + yval + "</sup>");
      }
    }
  }
  return terms.join(" + ");
}

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const numInput = document.getElementById('numInput').value;
  const num = parseInt(numInput);

  if (isNaN(num) || num < 1 || num > 25) {
    // Invalid input: Display error message
    triangleContent.innerHTML = '<p>Please enter a valid number between 1 and 25.</p>';
  } else {
    // Valid input: Generate and display results
    const finalResult = solveTriangle(num);
    const expResult = getExpansion(num);
    triangleContent.innerHTML = '<p>' + finalResult + '<br><br>' + "(x + y)<sup>n-1</sup> " + "Expansion:<br>" + expResult + '</p>';
  }
});

function redirectToHome(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  window.location.href = '../index.html'; // Redirect to home
}

document.addEventListener("DOMContentLoaded", function() {
  // Add event listener to the home button
  const homeButton = document.getElementById('homeButton');
  homeButton.addEventListener('click', redirectToHome);

  // Add event listener to prevent form submission on Enter key press within the form
  form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});
