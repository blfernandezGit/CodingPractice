let playerState = 'idle'
// const dropdown = document.getElementById('animations')
// dropdown.addEventListener( 'change', ( e ) => {
//     playerState = e.target.value
// })

window.addEventListener('keydown', ( e ) => {
    console.log(e)
    switch ( e.key ) {
        case ' ':
            playerState = 'jump'
            break
        case 'd':
            playerState = 'run'
            break
        default:
            playerState = 'idle'
    }
})

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const BORDER_WIDTH = 0
const MAX_SIZE = 600;

window.addEventListener( 'resize', resizeCanvas )
window.addEventListener( 'orientationchange', resizeCanvas )
resizeCanvas()

function resizeCanvas() {
    canvas.width = canvas.offsetWidth - ( 2 * BORDER_WIDTH )
    canvas.height = canvas.offsetHeight - ( 2 * BORDER_WIDTH )
}

const playerImage = new Image()
playerImage.src = './assets/images/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523
const fractionWidth = spriteWidth / MAX_SIZE
const fractionHeight = spriteHeight / MAX_SIZE

let gameFrame = 0
const staggerFrames = 5 // slows down animation
const spriteAnimations = []
const animationStates = [
    action( 'idle', 7 ),
    action( 'jump', 7 ),
    action( 'fall', 7 ),
    action( 'run', 9 ),
    action( 'dizzy', 11 ),
    action( 'sit', 5 ),
    action( 'roll', 7 ),
    action( 'bite', 7 ),
    action( 'ko', 12 ),
    action( 'getHit', 4 )
]

function action ( name, frames ) {
    const newObject = { name, frames }
    return newObject
}

animationStates.forEach(( state, index ) => {
    let frames = {
        loc: []
    }
    for ( let i = 0; i < state.frames; i++ ) {
        let positionX = i * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({ 
            x: positionX,
            y: positionY
        })
    }
    spriteAnimations[ state.name ] = frames
})

function animate() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height )
    let position = Math.floor( gameFrame / staggerFrames ) % spriteAnimations[ playerState ].loc.length
    let frameX = spriteWidth * position
    let frameY = spriteAnimations[ playerState ].loc[ position ].y
    ctx.drawImage( playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, canvas.width * fractionWidth, canvas.height * fractionHeight )

    gameFrame++
    requestAnimationFrame( animate ) 
}

animate()