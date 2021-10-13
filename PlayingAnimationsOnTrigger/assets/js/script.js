/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const BORDER_WIDTH = 3
const MAX_HEIGHT = 700
const MAX_WIDTH = 500
const explosions = []
let canvasPosition = canvas.getBoundingClientRect()

window.addEventListener( 'resize', resizeCanvas )
window.addEventListener( 'orientationchange', resizeCanvas )
resizeCanvas()

function resizeCanvas() {
    canvas.width = canvas.offsetWidth - ( 2 * BORDER_WIDTH )
    canvas.height = canvas.offsetHeight - ( 2 * BORDER_WIDTH )
}

class Explosion {
    constructor( x, y ) {
        this.image = new Image()
        this.image.src = './assets/images/boom.png'
        this.sound = new Audio()
        this.sound.src = './assets/audio/boom.wav'
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.width = this.spriteWidth * 0.7
        this.height = this.spriteHeight * 0.7
        this.x = x
        this.y = y
        this.frame = 0
        this.timer = 0
        this.angle = Math.random() * 2 * Math.PI
    }
    update() {
        if ( this.frame === 0 ) this.sound.play()
        this.timer++
        if (this.timer % 10 === 0) {
            this.frame++
        }
    }
    draw() {
        ctx.save()
        ctx.translate( this.x, this.y )
        ctx.rotate( this.angle )
        ctx.drawImage( this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height)
        ctx.restore()
    }
}

window.addEventListener('click', function ( e ) {
    createAnimation( e )
})

function createAnimation( e ) {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    explosions.push( new Explosion( positionX, positionY ) )
}

function animate() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height )
    for ( let i = 0; i < explosions.length; i++ ) {
        explosions[ i ].update()
        explosions[ i ].draw()
        if ( explosions[ i ].frame > 5 ) {
            explosions.splice( i, 1 )
            i--
        }
    }

    requestAnimationFrame(animate)
}

animate()