// =========================================
// Gyan Sagar Science Quiz
// Part 1
// =========================================

let questions = [];
let currentQuestion = 0;
let score = 0;
let playerName = "";
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");

const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startQuiz");
const scoreText = document.getElementById("scoreText");
const homeBtn = document.getElementById("homeBtn");
const prevBtn = document.getElementById("prevBtn");
const certificateBtn = document.getElementById("certificateBtn");
const { jsPDF } = window.jspdf;
async function loadQuestions() {

    const response = await fetch("questions.json");

    questions = await response.json();

}

startBtn.addEventListener("click", async () => {
    playerName = document.getElementById("playerName").value.trim();

if (playerName === "") {
    alert("कृपया अपना नाम दर्ज करें।");
    return;
}

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
    homeBtn.style.display = "inline-block";
prevBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
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
        let grade = "";

if (score >= 46) {
    grade = "🏆 Grade: A+ (Excellent)";
} else if (score >= 40) {
    grade = "🥇 Grade: A (Very Good)";
} else if (score >= 30) {
    grade = "🥈 Grade: B (Good)";
} else if (score >= 20) {
    grade = "📘 Grade: C (Keep Practicing)";
} else {
    grade = "💪 Grade: D (Need More Practice)";
}
scoreText.innerHTML =
"🎉 <b>" + playerName + "</b>, बधाई हो!<br><br>" +
"आपने <b>" + score + " / " + questions.length + "</b> प्रश्न सही किए!<br><br>" +
grade;
        const percentage = Math.round((score / questions.length) * 100);

document.getElementById("progressCircle").style.background =
`conic-gradient(#FFD700 ${percentage * 3.6}deg, #e0e0e0 0deg)`;

document.getElementById("progressCircle").innerHTML = percentage + "%";
    
        confetti({
  particleCount: 180,
  spread: 100,
  origin: { y: 0.6 }
});

    }

});
// Home Button
homeBtn.addEventListener("click", () => {
    homeScreen.style.display = "block";
    quizScreen.style.display = "none";
    resultScreen.style.display = "none";

    currentQuestion = 0;
    score = 0;
});

// Previous Button
prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});
certificateBtn.addEventListener("click", () => {
    const doc = new jspdf.jsPDF();

    doc.setFontSize(22);
    doc.text("Certificate of Achievement", 105, 30, { align: "center" });

    doc.setFontSize(16);
    doc.text("This certifies that", 105, 50, { align: "center" });

    doc.setFontSize(20);
    doc.text(playerName, 105, 65, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Score: ${score}/${questions.length}`, 105, 85, { align: "center" });

    doc.text("Grade: A+", 105, 100, { align: "center" });

    doc.save(playerName + "-Certificate.pdf");
});
