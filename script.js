let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const scoreContainer = document.getElementById("score");

// Mensagem inicial enquanto carrega
questionElement.textContent = "Carregando perguntas...";

// Carrega perguntas do JSON
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(error => {
    console.error('Erro ao carregar o JSON:', error);
    questionElement.textContent = "Erro ao carregar perguntas. Tente novamente.";
  });

// Exibe a pergunta atual
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = currentQuestion.options.map((option, index) => `
    <label>
      <input type="radio" name="answer" value="${option}">
      ${option}
    </label>
  `).join('');
}

// Verifica a resposta selecionada
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
    score++;
  }
}

// Configura o botão "Próxima Pergunta"
nextButton.addEventListener("click", () => {
  checkAnswer();
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    displayResults();
  }
});

// Configura o botão "Reiniciar"
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  restartButton.style.display = "none";
  nextButton.style.display = "inline-block";
  scoreContainer.textContent = "";
  loadQuestion();
});

// Exibe os resultados
function displayResults() {
  questionElement.textContent = "Quiz concluído!";
  optionsElement.innerHTML = "";
  nextButton.style.display = "none";
  restartButton.style.display = "inline-block";

  if (score === questions.length) {
    scoreContainer.textContent = `Parabéns! Você acertou todas as perguntas! 🎉`;
  } else if (score > questions.length / 2) {
    scoreContainer.textContent = `Boa! Você acertou ${score} de ${questions.length} perguntas!`;
  } else {
    scoreContainer.textContent = `Você acertou ${score} de ${questions.length}. Tente novamente para melhorar!`;
  }
}
