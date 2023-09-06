var codeQuiz = [
    {
        question: 'What is JavaScript?', 
        a: 'JavaScript is a compiled language used to make the website interactive',
        b: 'JavaScript is a programming language used to make web pages interactive.',
        c: 'JavaScript is a type of coffee.',
        d: 'None of the above.',
        answer: 'b'
    }, 
    {
        question: 'Which of the following is correct about JavaScript?',
        a: 'JavaScript is Assembly-language',
        b: 'JavaScript is an Object-Oriented language',
        c: 'JavaScript is an Object-Based language',
        d: 'JavaScript is a High-level language',
        answer: 'c'
    },
    {
        question: 'Which of the following is not a way to write a function?',
        a: 'let myFunc = function() { ... };',
        b: 'const myFunc = () => { ... };',
        c: 'var myFunc() = function { ... };',
        d: 'function myFunc() { ... };',
        answer: 'c'
    },
    {
        question: 'What type of data is "36"?',
        a: 'undefined',
        b: 'number',
        c: 'boolean',
        d: 'string',
        answer: 'd'
    },
    {
        question: 'What will parseInt(9.57) return?',
        a: '9',
        b: '9.57',
        c: '9.6',
        d: '10',
        answer: 'a'
    }
]

var background = document.querySelector("body");
var startBtn = document.querySelector("#start-btn");
var quizEl = document.querySelector(".quiz-container");
var endEl = document.querySelector(".end");
var scoreEl = document.querySelector(".score");
var questionCounter = 0;
var currentScore = 99;
var highScores = [];

// starts score counter upon quiz start
var scoreCounter = function() {
    scoreEl.textContent = "Current score: 100"

    var scoreInterval = setInterval(function() {
        if (currentScore > 0 && questionCounter < codeQuiz.length) {
            scoreEl.textContent = "Current score: " + currentScore;
            currentScore--
        }
        else {
            clearInterval(scoreInterval);
            endQuiz();
        }
    }, 1000);
}

var createQuiz = function() {
    document.querySelector("#instructions").remove();
    quizEl.classList.remove("hide")

    nextQues(questionCounter);
    scoreCounter();
}

// iterates through questions and answers
var nextQues = function(index) {
    var questionHeader = document.querySelector(".question-header");
    var questionEl = document.querySelector(".question");
    var btnA = document.getElementById("btn-a");
    var btnB = document.getElementById("btn-b");
    var btnC = document.getElementById("btn-c");
    var btnD = document.getElementById("btn-d");

    questionHeader.textContent = "Question #" + parseInt(index + 1)
    questionEl.textContent = codeQuiz[index].question;
    btnA.textContent = codeQuiz[index].a;
    btnB.textContent = codeQuiz[index].b;
    btnC.textContent = codeQuiz[index].c;
    btnD.textContent = codeQuiz[index].d;

    btnA.addEventListener("click", checkAnswer);
    btnB.addEventListener("click", checkAnswer);
    btnC.addEventListener("click", checkAnswer);
    btnD.addEventListener("click", checkAnswer);
}

var checkAnswer = function(event) {
    var clickedBtn = event.target.getAttribute("value");
    var feedbackEl = document.querySelector(".feedback");
    feedbackEl.classList.remove("hide");
    
    // checks button value against correct answer in array
    if (clickedBtn === codeQuiz[questionCounter].answer) {
        background.className = "correct";
        feedbackEl.textContent = "CORRECT!"
    }
    else {
        if (currentScore >= 5) {
            currentScore -= 5;
            scoreEl.textContent = "Current score: " + currentScore;
            }
        background.className = "incorrect";
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = "INCORRECT!"
    }

    questionCounter++

    if (questionCounter < codeQuiz.length) {        
        nextQues(questionCounter);
    }
    else {
        endQuiz();
    }
}

var endQuiz = function() {
    quizEl.remove();
    scoreEl.remove();
 
    endEl.innerHTML = "<h2 class='end-title'>That's all she wrote!</h2><p>Your final score is " + currentScore + ".  Please enter your name.</p>";

    var scoreForm = document.createElement("form");
    scoreForm.id = "score-form";
    endEl.appendChild(scoreForm);

    var nameInput = document.createElement("input");
    nameInput.className = "name-input";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "player-name");
    nameInput.setAttribute("placeholder", "ENTER YOUR NAME");
    scoreForm.appendChild(nameInput);

    var nameBtn = document.createElement("button");
    nameBtn.className = "btn";
    nameBtn.id = "name-btn"
    nameBtn.textContent = "SUBMIT";
    scoreForm.appendChild(nameBtn);

    nameBtn.addEventListener("click", saveScore);
}

var saveScore = function() {
    event.preventDefault()

    var playerName = document.querySelector("input[name='player-name']").value;

    if (!playerName) {
        alert("Please enter your name!")
    }
    else {
        var scoreObj = {
            name: playerName,
            score: currentScore
        }
    
        highScores.push(scoreObj);
        document.querySelector("#score-form").reset();
        localStorage.setItem("scores", JSON.stringify(highScores));
        document.location.href = "highscore.html";
    }
}

var loadScores = function() { 
    highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = [];
        return false;
    }

    highScores = JSON.parse(highScores);
}

loadScores();
startBtn.addEventListener("click", createQuiz)