var generatedExpression = "";




let time = 60; 
let counter;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}
 
function countDownTimer() {
  let display = document.getElementById("timer");
  display.innerHTML = formatTime(time);

  time--;
 
  if (time < 0) {
    clearInterval(counter);
    window.location.href = 'score.html?expression=' + encodeURIComponent(generatedExpression);
  }
}   
 
function startTimer() {
  counter = setInterval(countDownTimer, 1000);
}
  
startTimer(); 




// Génération d'un polynôme

function generateRandomExpressionPolynome() {
  var a = Math.floor(Math.random() * 11) - 5;
  var b = Math.floor(Math.random() * 11) - 5;
  var c = Math.floor(Math.random() * 11) - 5;
  var d = Math.floor(Math.random() * 11) - 5;

  return `y = ${a}x^3 + ${b}x^2 + ${c}x + ${d}`;
}

generatedExpression = generateRandomExpressionPolynome();

var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt, {border: false, zoomButtons: false, settingsMenu: false, keypad: false, expressionsTopbar: true, xAxisMinorSubdivisions: 2, yAxisMinorSubdivisions: 2});    

calculator.setExpression({
  id: 'secretExpression',
  latex: generatedExpression,
  lineOpacity: 0.5,
  lineWidth: 6,
  secret: true
});

calculator.setExpression({
  id: 'guess',
  latex: `y = ax^3 + bx^2 + cx + d`,
  color : 'red'
});

calculator.setExpression({
  id: 'a_slider',
  latex: 'a = 1',
  sliderBounds: { min: -5, max: 5, step: 1 }
});

calculator.setExpression({
  id: 'b_slider',
  latex: 'b = 1',
  sliderBounds: { min: -5, max: 5, step: 1 }
});

calculator.setExpression({
  id: 'c_slider',
  latex: 'c = 1',
  sliderBounds: { min: -5, max: 5, step: 1 }
});

calculator.setExpression({
  id: 'd_slider',
  latex: 'd = 1',
  sliderBounds: { min: -5, max: 5, step: 1 }
});



