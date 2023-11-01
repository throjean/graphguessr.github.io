var generatedExpression = "";

// Redirection au bout de 30s

let time = 30; 
let counter;
 
function countDownTimer() {
  let display = document.getElementById("timer");
  display.innerHTML = time;
 
 
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


// Fonction pour générer une expression aléatoire avec des fonctions mathématiques

function generateRandomExpressionIntermediate() {
  var functions = ['exp', 'ln', 'sin', 'tan', 'abs', 'power']; 
  var selectedFunction = functions[Math.floor(Math.random() * functions.length)];

  var a = Math.floor(Math.random() * 11) - 5;
  var b = Math.floor(Math.random() * 11) - 5;

  var expression = "";
  switch (selectedFunction) {
    case 'exp':
      expression = `y = ${a} \\cdot \\exp(${b}x)`;
      break;
    case 'sin':
      expression = `y = ${a} \\cdot \\sin(${b}x)`;
      break;
    case 'tan':
      expression = `y = ${a} \\cdot \\tan(${b}x)`;
      break;
    case 'abs':
      expression = `y = ${a} \\cdot \\abs(${b}x)`;
      break;
    case 'power':
      expression = `y = x^${a}`;
      break;
    default:
      expression = `y = ${a}x^2 + ${b}x`;
  }

  return expression;
}

var generatedExpression = generateRandomExpressionIntermediate();

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