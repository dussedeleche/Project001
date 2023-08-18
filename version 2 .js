const startButton = document.querySelector('#start-btn');
startButton.addEventListener('click', startGame);



const pads = document.querySelectorAll('.pad');
const pink = document.querySelector('#pink');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
const purple = document.querySelector('#purple');

let turn = 0; // unused
let score = 0; // unused
let wrongAnswer = true;
let scoreBoard = 0; // unused
let turnCounter = 0;
let round = 4;
let patComp = [];
let playerPattern = [];
let maxTurn = 0;

function startGame() {
    computerTurn();
}

function newRound() {
    turnCounter = 0;
    round++;
    playerPattern = [];
}

function randomGuess(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function computerGuess(round, pads) {
    if (wrongAnswer) {
        patComp = []
        for (let i = 0; i < round; i++) {
            patComp.push(randomGuess(pads));
        }
    } else {
        patComp.push(randomGuess(pads));
    }
    wrongAnswer = null;
    return patComp;
}
//console.log(computerGuess(round, pads))

function computerTurn() {
    const pastPattern = patComp;
    patComp = computerGuess(round, pads); // Generate computer's pattern
    let i = 0;
    console.log(patComp);

    const interval = setInterval(() => {
        highlightButton(patComp[i]); // Highlight the current color in the pattern
        i++;

        if (i >= patComp.length) { // If the pattern is fully highlighted
            clearInterval(interval); // Stop the interval (no more highlighting)
            setTimeout(() => {
                //   clearButtons(); // Clear any highlighting
                // enablePlayerInput(); // Allow the player to start interacting
            }, 500); // Wait 500 milliseconds before allowing player input related to line 41
        }
    }, 1000); // Highlight each color every 1000 milliseconds (1 second) releated to line 35
}

function highlightButton(color) {
    let clr = color.getAttribute('id');
    console.log(clr);
    document.querySelector(`#${clr}`).classList.add('lit');
    setTimeout(() => {
        document.querySelector(`#${clr}`).classList.remove('lit');
    }, 500);
}

function comparePattern() {
    console.log(patComp);
    if (playerPattern.length !== patComp.length) {
        for (let i = 0; i < playerPattern.length; i++) {
            console.log(`comp pattern index ${i}: ${patComp[i].classList[1]}`);
            if (playerPattern[i] !== patComp[i].classList[1]) {
                wrongAnswer = true;
                playerPattern = [];
                turnCounter = 0;
                computerTurn();
                return false;
            }
        }
    }
  
    wrongAnswer = false
    newRound()
    computerTurn()
    return true;
}

//NEXT STEPS
// for player guess
pads.forEach(pad => {
    pad.addEventListener('click', (e) => {    // Light up the pad and play a sound
        turnCounter++;
        lightUpPad(pad);
        playerPattern.push(e.target.id);
        console.log(patComp);
        if (playerPattern[turnCounter-1] !== patComp[turnCounter-1].getAttribute('id')){
            wrongAnswer = true;
            computerTurn();
        }
    });
});

function lightUpPad(pad) {
    console.log("clicked")
    pad.classList.add('lit');
    // turnCounter++;
    // console.log(turnCounter);
    // if (turnCounter !== round) {
    //     //comparePattern()
    //     // turnCounter = 0;

    // } else if (turnCounter === round) {
    //     turnCounter = 0;
    //     //comparePattern()
    // }
    setTimeout(() => {
        pad.classList.remove('lit');
    }, 300);
}

//player turn, how to keep score, track of rounds, restarting game or win game.



//if true keep game going, if false end the game


