// =========================================
// Gyan Sagar Science Quiz
// Part 1
// =========================================

let questions = [];
let currentQuestion = 0;
let score = 0;

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");

const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startQuiz");
const scoreText = document.getElementById("scoreText");

async function loadQuestions() {

    const response = await fetch("questions.json");

    questions = await response.json();

}

startBtn.addEventListener("click", async () => {

    await loadQuestions();

    homeScreen.style.display = "none";

    quizScreen.style.display = "block";

    currentQuestion = 0;

    score = 0;

    showQuestion();

});

function showQuestion() {

    const q = questions[currentQuestion];

    questionNumber.textContent =
        "प्रश्न " + (currentQuestion + 1) + " / " + questions.length;

    questionText.textContent = q.question;

    optionsBox.innerHTML = "";

    nextBtn.style.display = "none";
        q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.style.display = "block";
        button.style.width = "100%";
        button.style.margin = "10px 0";

        button.onclick = () => checkAnswer(index);

        optionsBox.appendChild(button);

    });

}

function checkAnswer(selectedIndex) {

    const q = questions[currentQuestion];

    const buttons = optionsBox.querySelectorAll("button");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.answer) {

        score++;

        buttons[selectedIndex].style.background = "green";
        buttons[selectedIndex].style.color = "white";

    } else {

        buttons[selectedIndex].style.background = "red";
        buttons[selectedIndex].style.color = "white";

        buttons[q.answer].style.background = "green";
        buttons[q.answer].style.color = "white";

    }

    const reason = document.createElement("div");

    reason.style.marginTop = "20px";
    reason.style.padding = "15px";
    reason.style.background = "#eef7ff";
    reason.style.borderRadius = "10px";

    reason.innerHTML =
        "<b>कारण:</b><br>" + q.reason;

    optionsBox.appendChild(reason);

    nextBtn.style.display = "inline-block";

}
nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        quizScreen.style.display = "none";
        resultScreen.style.display = "block";

        scoreText.textContent =
            "आपने " + score + " / " + questions.length + " प्रश्न सही किए।";

    }

});
