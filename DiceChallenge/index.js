let randomNumber1 = Math.floor(Math.random() * 6 + 1)
let randomNumber2 = Math.floor(Math.random() * 6 + 1)

const p1Dice = document.querySelector('.img1')
const p2Dice = document.querySelector('.img2')

const DICE_IMAGE_PATH = './images/dice'
const DICE_FILE_TYPE = '.png'

p1Dice.setAttribute( 'src', DICE_IMAGE_PATH + randomNumber1 + DICE_FILE_TYPE )
p2Dice.setAttribute( 'src', DICE_IMAGE_PATH + randomNumber2 + DICE_FILE_TYPE )