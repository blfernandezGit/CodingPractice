// Dice randomization
let randomNumber1 = Math.floor( Math.random() * 6 + 1 )
let randomNumber2 = Math.floor( Math.random() * 6 + 1 )

const p1Dice = document.querySelector('.img1')
const p2Dice = document.querySelector('.img2')

const DICE_IMAGE_PATH = './images/dice'
const DICE_FILE_TYPE = '.png'

p1Dice.setAttribute( 'src', DICE_IMAGE_PATH + randomNumber1 + DICE_FILE_TYPE )
p2Dice.setAttribute( 'src', DICE_IMAGE_PATH + randomNumber2 + DICE_FILE_TYPE )

// Get Winner
const winnerElement = document.querySelector('h1')

const PLAYER_1_WINS = 'Player 1 Wins!'
const PLAYER_2_WINS = 'Player 2 Wins!'
const DRAW_MESSAGE = 'Draw!'

if ( randomNumber1 > randomNumber2 ) {
    winnerElement.innerText = PLAYER_1_WINS
} else if ( randomNumber2 > randomNumber1 ) {
    winnerElement.innerText = PLAYER_2_WINS
} else {
    winnerElement.innerText = DRAW_MESSAGE
}