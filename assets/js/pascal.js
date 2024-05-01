const button = document.getElementById('inputButton');
const triangleContent = document.getElementById('triangle');

function solveTriangle(n) 
{
  let result = [];
  for (let line = 1; line <= n; line++) 
  {
    let numLine = [];
    
    // used to represent C(line, i)
    let C = 1;
    for (let i = 1; i <= line; i++) 
    {
      // The first value in a line is always 1
      numLine.push(C + "&nbsp&nbsp&nbsp&nbsp&nbsp");
      C = C * (line - i) / i;
    }
      result.push(numLine.join(""));
  }
  return result.join("<br>");
}

function changeTriangle()
{
  finalResult = solveTriangle(document.getElementById("numInput").value);
  triangleContent.innerHTML = '<p>' + finalResult + '</p>';
}

button.addEventListener('click', changeTriangle);
