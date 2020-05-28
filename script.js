const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("questions-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
let timerId;
const endGamePage = document.getElementById("end");
const username = document.getElementById("username");
const saveScoreButton = document.getElementById("save-score-button");

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    console.log("Game is started")
    startButton.classList.add("hide")
    timerId = setInterval(clock, 1000);
    timer.textContent = time;
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        endGamePage.classList.add("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
        endGame()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function clock() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
      endGame();
    }
}

function endGame() {
    clearInterval(timerId);
    endGamePage.classList.remove("hide");

}

function saveHighScore(e) {
    console.log("User clicked the save button!");
    e.preventDefault();
}

const questions = [
    {
        question: "What tag can be used to insert a line break in an HTML document?",
        answers: [
            {text: "<body></body>", correct: false},
            {text: "<br></br>", correct: true},
            {text: "<head></head>", correct: false},
            {text: "None of the choices", correct: false}
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hypertext Makeup Language", correct: false},
            {text: "Hypertext Marker Level", correct: false},
            {text: "Happy Tacos Mean Love", correct: false},
            {text: "Hypertext Markup Language", correct: true}
        ]
    },
    {
        question: "The largest header on an HTML document would have the following tag...",
        answers: [
            {text: "<h1></h1>", correct: true},
            {text: "<h2></h2>", correct: false},
            {text: "<h3></h3>", correct: false},
            {text: "It doesn't matter", correct: false}
        ]
    },
    {
        question: "DRY stands for...",
        answers: [
            {text: "Definitely Repeat Yourself", correct: false},
            {text: "Data Reports, Yuck", correct: false},
            {text: "Don't Repeat Yourself", correct: true},
            {text: "Dragons Rule, Yeah?", correct: false}
        ]
    },
    {
        question: "What are the three fundamental programming languages?",
        answers: [
            {text: "JavaScript, HTML, and CSS", correct: true},
            {text: "JavaScript, HTML, and C++", correct: false},
            {text: "HTML, CSS, and Python", correct: false},
            {text: "CSS, C++ and JavaScript", correct: false}
        ]
    },
    {
        question: "We are learning a lot and really enjoying this class and we are all working really hard!",
        answers: [
            {text: "Yes", correct: true},
            {text: "You right", correct: true},
            {text: "Absolutely", correct: true},
            {text: "Heck yeah!", correct: true}
        ]
    }
]

const timer = document.getElementById("time");
let time = questions.length * 15;