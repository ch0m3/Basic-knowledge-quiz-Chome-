#!/usr/bin/env node

import chalk from "chalk";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

let currentQuestionIndex = 0;
let score = 0;
let timer = null; 
let timeLeft = 10;

function askQuestion() {
    const q =questions[currentQuestionIndex];

    console.log(
        chalk.bold.white(`\nQuestion ${currentQuestionIndex +1}: ${q.question}`)
    );

    q.answers.forEach((a, i) => {
        console.log(chalk.yellow(`${i + 1}. ${a.text}`));
    });

    timeLeft = 10;

    startCountdown();
        rl.question(chalk.green("Your answer (1-4): "), handleAnswer);
}

function startCountdown() {
    timer = setInterval (() =>{
        timeLeft--;

        process.stdout.write(
            chalk.magenta(`Time left: ${timeLeft}s  \r`)
        );

        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log(chalk.red("\n Time's up! "));

            autoSubmitTimeoutAnswer();
        }
    }, 1000);
}


// If time expires before answering
function autoSubmitTimeoutAnswer() {
    rl.pause();

    const q = questions[currentQuestionIndex];
    const correctAnswer = q.answers.find(a => a.correct);

    console.log(chalk.red(`Correct answer: ${correctAnswer.text}`));

    moveToNextQuestion();
}

// Handle user input
function handleAnswer(input) {
     clearInterval(timer);

    const q = questions[currentQuestionIndex];
    const index = parseInt(input) - 1;

    if (q.answers[index] && q.answers[index].correct) {
        console.log(chalk.green("✅ Correct!"));
        score++;
    } else {
        const correctText = q.answers.find(a => a.correct).text;
        console.log(chalk.red("🗿 Incorrect!"));
        console.log(chalk.blue("Correct answer:"), chalk.yellow(correctText));
    }

    moveToNextQuestion();
}

function moveToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        askQuestion();
    } else {
        console.log(chalk.bold.green(`\n🎉 Game over! Your score: ${score}/${questions.length}`));
        rl.close();
    }
}


console.log(chalk.bgGreen.bold("Welcome to the Herb & Spice Trivia CLI Game!"));
askQuestion();