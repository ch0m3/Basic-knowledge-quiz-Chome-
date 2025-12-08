

const questions = [
    {
        question: "What herb can be infused with hot water and tea leaves to make flavoured tea?",
        answers: [
            { text: "Ginger", correct: false },
            { text: "cloves", correct: true },
            { text: "lemmon grass", correct: false },
            { text: "mariwana", correct: false },
        ]
    },
    {
        question: "What spice adds a herby flavour to stews?",
        answers: [
            { text: "Dhania ", correct: false },
            { text: "Corriander", correct: true },
            { text: "Oregano", correct: false },
            { text: "cannabis", correct: false },
        ]
    },
    {
        question: "What food spice can be used in baking sweets pastries?",
        answers: [
            { text: "cinnamon ", correct: false },
            { text: "Corriander", correct: true },
            { text: "cummin", correct: false },
            { text: "cannabis", correct: false },
        ]
    },
    {
        question: "What plant has a female name?",
        answers: [
            { text: "Poison Ivy", correct: false },
            { text: "Jasmin", correct: true },
            { text: "Daisy", correct: false },
            { text: "Mary Jane", correct: false },
        ]
    },
    {
        question: "What plant gives humans and animals a psycadellic effect when taken(eaten, smoked, inhaled, brewed)?",
        answers: [
            { text: "Datuta ", correct: false },
            { text: "Coca", correct: true },
            { text: "Opium Poppy", correct: false },
            { text: "cannabis", correct: false },
        ]
    },
    {
        question: "What plant is believed to have a spiritual significance (Any religion can be concidered)?",
        answers: [
            { text: "Basil ", correct: false },
            { text: "Sage", correct: true },
            { text: "Ashoka", correct: false },
            { text: "Ganja", correct: false },
        ]
    },
    {
        question: "What plant commonly provides a sustainable revenue for countries economies when grown in large scale but is shun down by society?",
        answers: [
            { text: "Tobbaco", correct: false },
            { text: "Coca", correct: true },
            { text: "Opium", correct: false },
            { text: "cannabis", correct: false },
        ]
    },
    {
        question: "What plant is commonly grown and used by the citizens on Uganda?",
        answers: [
            { text: "Plantains ", correct: false },
            { text: "Banana", correct: true },
            { text: "Coffee", correct: false },
            { text: "Hash", correct: false },
        ]
    },
    {
        question: "What plant/herb can be used for pleasant aromas?",
        answers: [
            { text: "Lavender", correct: false },
            { text: "cinnamon", correct: true },
            { text: "sage", correct: false },
            { text: "sativa", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn !== answerButtonsElement.lastElementChild;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
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