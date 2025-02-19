// Game options
const GAME_OPTIONS = ['rock', 'paper', 'scissor'];

// DOM Elements
const userScoreDisplay = document.querySelector('#userScore');
const computerScoreDisplay = document.querySelector('#computerScore');
const choices = document.querySelectorAll('.option');
const userImage = document.querySelector('#userImage');
const compImage = document.querySelector('#compImage');
const displayMessage = document.querySelector('#msg');
const resetButton = document.querySelector('#reset-button');

// Initial State
let initialMessage = displayMessage.innerText;
let userScore = 0;
let computerScore = 0;

// Display images based on user and computer choices
const printImages = (option, player) => {
    let imageNode = document.createElement("img");
    const imagesPath = {
        rock:'./images/Rockimage.png',
        paper:'./images/Paperimage.png',
        scissor:'./images/Scissorsimage.png',
    };
    if (option.includes('rock')) {
        imageNode.src = imagesPath.rock;
        imageNode.alt = 'rock';
    } else if (option.includes('paper')) {
        imageNode.src = imagesPath.paper;
        imageNode.alt = 'paper';
    } else if (option.includes('scissor')) {
        imageNode.src = imagesPath.scissor;
        imageNode.alt = 'scissor';
    }
    if (player === 'user') {
        userImage.appendChild(imageNode);
    } else if (player === 'computer') {
        compImage.appendChild(imageNode);
    }
};

// Remove previously selected images
const clearImages = () => {
    // console.log(userImage.lastElementChild, compImage.lastElementChild);
    if (userImage.children.length > 0)
    { userImage.removeChild(userImage.lastElementChild);}
    if (compImage.children.length > 0)
    { compImage.removeChild(compImage.lastElementChild);}
};

// Generate random option [rock, paper and scissors] for computer
const randomOption = () => {
    const randomIndex = Math.floor(Math.random() * GAME_OPTIONS.length);
    return GAME_OPTIONS[randomIndex];
};

// Update the score display
const displayScore = () => {
    userScoreDisplay.innerText = userScore;
    computerScoreDisplay.innerText = computerScore;
};

// Display draw message
const drawMessage = () => {
    displayMessage.innerText = `Game was Draw!`;
};

// Display game outcome
const displayMessageHandler = (userWon) => {
    if(userWon) {
        userScore++;
        displayMessage.innerText = 'You won!';
    }
    else{
        computerScore++;
        displayMessage.innerText = `You lost!`;
    }
};

// Reset game message
const clearMessage=()=>{
    displayMessage.innerText = initialMessage;
};

// Determine Winner
const checkWinner = (user, computer) => {
    if (user === computer) {
        drawMessage();
    }
    else {
        let userWin = true;
        if (user === 'rock')
        { userWin = (computer !== 'paper'); }
        else if (user === 'paper')
        { userWin = (computer !== 'scissor'); }
        else if (user === 'scissor')
        { userWin = (computer !== 'rock'); }

        // Code 2 - different way of finding the winner
        // comment above code before using this logic

        // const winningConditions = {
        //     rock: 'scissor',
        //     paper: 'rock',
        //     scissor: 'paper',
        // };
        // const userWin = winningConditions[user] === computer;

        displayMessageHandler(userWin);
    }
    displayScore();
};

// Game Logic
const playGame = (choice) => {
    const userChoiceId = choice.getAttribute('id');
    const compChoiceId = randomOption();

    clearImages();
    printImages(userChoiceId, 'user');
    printImages(compChoiceId, 'computer');
    checkWinner(userChoiceId, compChoiceId);
};

// Attach event listeners to choices
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
    playGame(choice);
    });
});

// Reset Game
const gameReset = () => {
    userScore = 0;
    computerScore = 0;
    displayScore();
    clearMessage();
    clearImages();
};

resetButton.addEventListener('click', () => {gameReset();});

