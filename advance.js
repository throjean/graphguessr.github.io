var generatedExpression = "";

let time = 120; 
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

function generateRandomExpressionHardcore() {
  
  var functions = ['\\exp', '\\sin', '\\tan', '\\abs', '\\ln', '\\arctan', '1/']; // 'power', 'inv'];
  var selectedFunctions = [];

  for (var i = 0; i < 3; i++) {
    var randomFunction = functions[Math.floor(Math.random() * functions.length)]; // Sélectionner trois fonctions aléatoirement
    selectedFunctions.push(randomFunction);
  }

  var expression = "y = ";

  expression += selectedFunctions.join("(") + "(x";   // Composer les fonctions en chaîne

  for (var i = 0; i < 3; i++) {   // Fermer les parenthèses pour chaque fonction composée

    expression += ")";
  }

  return expression;
}
var generatedExpression = generateRandomExpressionHardcore();

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
  latex: `y = `,
  color : 'red'
});

