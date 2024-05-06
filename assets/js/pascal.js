const button = document.getElementById('inputButton');
const triangleContent = document.getElementById('triangle');

let numCache = [];

function solveTriangle(n) 
{
  let result = [];
  numCache = []; //Clear cache memory
  for (let line = 1; line <= n; line++) 
  {
    let numLine = [];
    
    // used to represent C(line, i)
    let C = 1;
    for (let i = 1; i <= line; i++) 
    {
      if (line == n)
      {
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

function getExpansion(n)
{
  let terms = [];
  let xval, yval;
  for (let i = 0; i <= n; i++)
  {
    if (i == 0)
    {
      terms.push("x<sup>" + (n - 1) + "</sup>");
    }
    else if (i == n)
    {
      terms.push("y<sup>" + (n - 1) + "</sup>");
    }
    else
    {
      xval = (n - 1) - i;
      yval = i;
      if (xval > 0)
      {
        terms.push(numCache[i] + "x<sup>" + xval + "</sup>" + "y<sup>" + yval + "</sup>");
      }
    }
  }
  return terms.join(" + ");
}

function changeTriangle()
{
  finalResult = solveTriangle(document.getElementById("numInput").value);
  expResult = getExpansion(document.getElementById("numInput").value);
  triangleContent.innerHTML = '<p>' + finalResult + '<br><br>' + "(x + y)<sup>n-1</sup> " + "Expansion:<br>" +expResult +'</p>';
}

button.addEventListener('click', changeTriangle);
