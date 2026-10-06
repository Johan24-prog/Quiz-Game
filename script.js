// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


// Quiz Questions
const quizQuestions = [
{
    question: "What is the capital of france?",
    answers: [
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Madrid", correct: false },
    ],
},

{
    question: "Which planet is known as the Red Planet?",
    answers: [
        { text: "Venus", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Earth", correct: false },
    ],
},

{
    question: "What is the largest ocean on Earth?",
    answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
    ],
},

{
    question: "Which of these is not a programming language?",
    answers: [
        { text: "Java", correct: false },
        { text: "C#", correct: false },
        { text: "JS", correct: false },
        { text: "Banana", correct: true},
    ],
},

{
    question: "What is the chemical symbol of Gold?",
    answers: [
        { text: "Go", correct: false },
        { text: "Au", correct: true },
        { text: "Ag", correct: false },
        { text: "Gd", correct: false },
    ],
},
];

// QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    // Reset Variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestions();
}

function showQuestions(){
    // Reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event){

    if(answersDisabled) return;

    answersDisabled = true;
    const selectedbutton = event.target;
    const isCorrect = selectedbutton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        else if(button === selectedbutton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        // Check if there are more questions or if the quiz is over
        if(currentQuestionIndex < quizQuestions.length){
            showQuestions();
        }
        else{
            showResults();
        }

    }, 1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if(percentage >= 100){
        resultMessage.textContent = "Perfect, You're a genius!";
    }
    else if(percentage >= 80){
        resultMessage.textContent = "Great Job! You know your stuff!";
    }
    else if(percentage >= 60){
        resultMessage.textContent = "Good effort! Keep Learning!";
    }
    else if(percentage >= 40){
        resultMessage.textContent = "Not bad! Try again to improve!";
    }
    else{
        resultMessage.textContent = "Keep Studying! You'll get better!";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");
    
    startQuiz();
}




