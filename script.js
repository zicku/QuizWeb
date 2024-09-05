const questions = [
  {
    question: "what shortcut to make class ",
    answers: [
      { Text: "#", correct: false },
      { Text: ".", correct: true },
      { Text: "*", correct: false },
      { Text: "@", correct: false },
    ],
  },
  {
    question: "what shortcut to make id ",
    answers: [
      { Text: "#", correct: true },
      { Text: ".", correct: false },
      { Text: "*", correct: false },
      { Text: "@", correct: false },
    ],
  },
  {
    question: "what shortcut to close sidebar in visual studiocode  ",
    answers: [
      { Text: "cntl+c", correct: false },
      { Text: "cntl+d", correct: false },
      { Text: "ctrl+b", correct: true },
      { Text: "@", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let skor = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  skor = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    skor++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.style.cursor = "no-drop";
  });
  nextButton.style.display = "block";
}

function showSkor() {
  resetState();
  questionElement.innerHTML = `You answered ${skor} question correctly  out of ${questions.length}`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showSkor();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
