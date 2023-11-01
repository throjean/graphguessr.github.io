var generatedExpression = "";

let time = 300; 
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

function generateExpression() { // Générer une expression aléatoire
  const functions = ["\\exp", "\\ln", "\\sin", "\\tan", "\\arctan", "1/"]; //, "power" "\\abs"];// Fonctions disponibles
  const operators = ["cdot" , "circ"]; // Opérateurs disponibles

  function randomInRange(min, max) { // Générer un nombre aléatoire entre min et max (inclus)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomFunction() {
    return functions[Math.floor(Math.random() * functions.length)]; // Générer une fonction aléatoire
  }

  function randomOperator() {
    return operators[Math.floor(Math.random() * operators.length)]; // Générer une opérateur aléatoire
  }

  const numFunctions = randomInRange(3, 5);
  let expression = "(x)";

  for (let i = 0; i < numFunctions; i++) {
      
      if (i > 0) 
      {
        const selectedOperator = randomOperator();

        if (selectedOperator === "cdot") {
          expression = "(x)"+"\\cdot "+ expression;

        } else if (selectedOperator === "circ") {
          expression = "(" + expression + ")";
        }
      }

    const selectedFunction = randomFunction();
    
    //if (selectedFunction === "power") {
    //const exponent = randomInRange(1, 3);
    //expression = 'x^{${exponent}}' + expression;
    //}
    //else if (selectedFunction === "abs"){
    //expression = "\|" + expression + "\|";
    //} 
    //else { 
    expression = selectedFunction + expression;
    //}    
  }

  return "y = " + expression ;

}

var generatedExpression = generateExpression();
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

