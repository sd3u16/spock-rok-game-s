import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

function resetSelected() {
    allGameIcons.forEach((icon) => {
        icon.classList.remove('selected');
    });
    stopConfetti();
    removeConfetti();
}

function resetAll() {
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    playerScoreEl.textContent = playerScoreNumber;
    computerScoreEl.textContent = computerScoreNumber;
    playerChoiceEl.textContent = '';
    computerChoiceEl.textContent = '';
    resetSelected();
}
window.resetAll = resetAll;

function computerRandomChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    computerChoice = choices[randomIndex];
}

// AI Model: This function adjusts the computer's move based on the player's recent choices
const playerChoicesHistory = [];
const MAX_HISTORY = 5;

function getAIMove() {
    if (playerChoicesHistory.length < MAX_HISTORY) {
        // Not enough data yet, so choose randomly
        computerRandomChoice();
        return computerChoice;
    }

    const recentChoices = playerChoicesHistory.slice(-MAX_HISTORY);
    const choiceCounts = { rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0 };

    recentChoices.forEach(choice => choiceCounts[choice]++);

    const mostFrequentChoice = Object.keys(choiceCounts).reduce((a, b) => choiceCounts[a] > choiceCounts[b] ? a : b);

    switch (mostFrequentChoice) {
        case 'rock':
            computerChoice = 'paper';
            break;
        case 'paper':
            computerChoice = 'scissors';
            break;
        case 'scissors':
            computerChoice = 'rock';
            break;
        case 'lizard':
            computerChoice = 'rock';
            break;
        case 'spock':
            computerChoice = 'lizard';
            break;
        default:
            computerRandomChoice();
            break;
    }
}

function recordPlayerChoice(choice) {
    playerChoicesHistory.push(choice);
    if (playerChoicesHistory.length > MAX_HISTORY) {
        playerChoicesHistory.shift();
    }
}

function displayComputerChoice() {
    switch (computerChoice) {
        case 'rock':
            computerRock.classList.add('selected');
            computerChoiceEl.textContent = ' --- Rock';
            break;
        case 'paper':
            computerPaper.classList.add('selected');
            computerChoiceEl.textContent = ' --- Paper';
            break;
        case 'scissors':
            computerScissors.classList.add('selected');
            computerChoiceEl.textContent = ' --- Scissors';
            break;
        case 'lizard':
            computerLizard.classList.add('selected');
            computerChoiceEl.textContent = ' --- Lizard';
            break;
        case 'spock':
            computerSpock.classList.add('selected');
            computerChoiceEl.textContent = ' --- Spock';
            break;
        default:
            break;
    }
}

function updateScore(playerChoice) {
    if (playerChoice === computerChoice) {
        return;
    }
    if (
        (playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (playerChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
        (playerChoice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))
    ) {
        startConfetti();
        playerScoreNumber++;
        playerScoreEl.textContent = playerScoreNumber;
    } else {
        computerScoreNumber++;
        computerScoreEl.textContent = computerScoreNumber;
    }
}

function checkResult(playerChoice) {
    resetSelected();
    recordPlayerChoice(playerChoice);
    getAIMove();
    displayComputerChoice();
    updateScore(playerChoice);
}

window.select = function select(playerChoice) {
    checkResult(playerChoice);
    switch (playerChoice) {
        case 'rock':
            playerRock.classList.add('selected');
            playerChoiceEl.textContent = ' --- Rock';
            break;
        case 'paper':
            playerPaper.classList.add('selected');
            playerChoiceEl.textContent = ' --- Paper';
            break;
        case 'scissors':
            playerScissors.classList.add('selected');
            playerChoiceEl.textContent = ' --- Scissors';
            break;
        case 'lizard':
            playerLizard.classList.add('selected');
            playerChoiceEl.textContent = ' --- Lizard';
            break;
        case 'spock':
            playerSpock.classList.add('selected');
            playerChoiceEl.textContent = ' --- Spock';
            break;
        default:
            break;
    }
};
