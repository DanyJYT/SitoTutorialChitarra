const quizData = {
    "Introduzione musica": [
        { question: "La musica classica è conosciuta per il suo famoso compositore Bach?", answers: ["Sì", "No"], correct: 0 },
        { question: "Che cos'è la melodia?", answers: ["Variazioni nell'intensità del suono", "Pattern temporale che guida il movimento della musica", "Combinazione di suoni simultanei.", "Sequenza di suoni che formano una linea musicale riconoscibile"], correct: 3 },
        { question: "Che tipo di strumento è la chitarra?", answers: ["Membranofono", "Cordofono", "Idiofono", "Elettrofono"], correct: 1 },
        { question: "Quale invenzione ha reso la musica più accessibile nel Rinascimento?", answers: ["Il pianoforte", "Il violino", "La stampa musicale", "Il microfono"], correct: 2 },
        { question: "Quale tra questi è un elemento della musica che riguarda la qualità distintiva del suono?", answers: ["Melodia", "Timbro", "Armonia", "Ritmo"], correct: 1 },
        { question: "Quale genere musicale è nato nel XX sec?", answers: ["Barocco", "Gregoriano", "Jazz", "Polifonico"], correct: 2 }
    ],
    "Introduzione note musicali": [
        { question: "Quali note compongono l'accordo di Do maggiore?", answers: ["Do-Mi-Sol", "Re-Fa-La", "Mi-Sol-Si", "Fa-La-Do"], correct: 0 },
        { question: "Un accordo minore ha...", answers: ["Terza maggiore", "Terza minore", "Settima minore", "Quinta aumentata"], correct: 1 },
        { question: "Quanti tasti bianchi ci sono in un'ottava sul pianoforte?", answers: ["5", "6", "7", "8"], correct: 2 }
    ],
    "Introduzione chitarra": [
        { question: "Quali note compongono l'accordo di Do maggiore?", answers: ["Do-Mi-Sol", "Re-Fa-La", "Mi-Sol-Si", "Fa-La-Do"], correct: 0 },
        { question: "Un accordo minore ha...", answers: ["Terza maggiore", "Terza minore", "Settima minore", "Quinta aumentata"], correct: 1 },
        { question: "Quanti tasti bianchi ci sono in un'ottava sul pianoforte?", answers: ["5", "6", "7", "8"], correct: 2 }
    ],
    "Mani e dita sulla tastiera": [
        { question: "Quali note compongono l'accordo di Do maggiore?", answers: ["Do-Mi-Sol", "Re-Fa-La", "Mi-Sol-Si", "Fa-La-Do"], correct: 0 },
        { question: "Un accordo minore ha...", answers: ["Terza maggiore", "Terza minore", "Settima minore", "Quinta aumentata"], correct: 1 },
        { question: "Quanti tasti bianchi ci sono in un'ottava sul pianoforte?", answers: ["5", "6", "7", "8"], correct: 2 }
    ]
};

const numQuestions = 3;
let currentSection = "";
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const sectionSelector = document.getElementById("section-selector");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const quizContainer = document.querySelector(".quiz-container");
const sectionSelection = document.getElementById("section-selection");

function populateSections() {
    sectionSelector.innerHTML = "";
    for (let section in quizData) {
        let option = document.createElement("option");
        option.value = section;
        option.innerText = section;
        sectionSelector.appendChild(option);
    }
}

function startQuiz() {
    currentSection = sectionSelector.value;
    shuffledQuestions = shuffleArray([...quizData[currentSection]]).slice(0, numQuestions);
    currentQuestionIndex = 0;
    score = 0;

    sectionSelection.style.display = "none";
    quizContainer.style.display = "block";
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";

    showQuestion();
}

function showQuestion() {
    answersContainer.innerHTML = "";
    let question = shuffledQuestions[currentQuestionIndex];
    questionText.innerText = question.question;

    question.answers.forEach((answer, index) => {
        let btn = document.createElement("button");
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index);
        answersContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    if (selectedIndex === shuffledQuestions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionText.innerText = `Sezione: ${currentSection}\nHai totalizzato ${score} su ${shuffledQuestions.length} punti.`;
    answersContainer.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";

    let scoreHistory = JSON.parse(localStorage.getItem("quizScores")) || {};

    if (!scoreHistory[currentSection]) {
        scoreHistory[currentSection] = { attempts: 0, scores: [], totalCorrect: 0 };
    }

    scoreHistory[currentSection].scores.push(score);
    scoreHistory[currentSection].totalCorrect += score;
    scoreHistory[currentSection].attempts++;

    localStorage.setItem("quizScores", JSON.stringify(scoreHistory));

    let sectionData = scoreHistory[currentSection];
    let attemptsList = sectionData.scores.length > 0 ? sectionData.scores.join(" - ") : "Nessun punteggio registrato";

    scoreDisplay.innerHTML = `
        <strong>Storico ${currentSection}:</strong><br>
        Tentativi: ${sectionData.attempts} <br>
        Dettaglio punteggi: ${attemptsList} <br>
        Totale risposte corrette: ${sectionData.totalCorrect}
    `;
    scoreDisplay.style.display = "block";
}

function restartQuiz() {
    sectionSelection.style.display = "block";
    quizContainer.style.display = "none";
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", populateSections);
