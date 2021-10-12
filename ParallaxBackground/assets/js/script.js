const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const BORDER_WIDTH = 0
const MAX_HEIGHT = 700
const MAX_WIDTH = 800

window.addEventListener( 'resize', resizeCanvas )
window.addEventListener( 'orientationchange', resizeCanvas )
resizeCanvas()

function resizeCanvas() {
    canvas.width = canvas.offsetWidth - ( 2 * BORDER_WIDTH )
    canvas.height = canvas.offsetHeight - ( 2 * BORDER_WIDTH )
}

let gameSpeed = 5
// let gameFrame = 0

const backgroundLayer1 = new Image()
backgroundLayer1.src = './assets/images/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = './assets/images/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = './assets/images/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = './assets/images/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = './assets/images/layer-5.png'
const layerWidth = 800
const layerHeight = 700
const fractionWidth = layerWidth / MAX_WIDTH
const fractionHeight = layerHeight / MAX_HEIGHT

window.addEventListener( 'load', () => {
    const slider = document.getElementById('slider')
    slider.value = gameSpeed
    const showGameSpeed = document.getElementById('showGameSpeed')
    showGameSpeed.textContent = gameSpeed
    slider.addEventListener( 'change', function (e) {
        gameSpeed = e.target.value
        showGameSpeed.textContent = gameSpeed
    })

    class Layer {
        constructor(image, speedModifier) { 
            this.x = 0,
            this.y = 0,
            this.width = 2400,
            this.height = 700,
            this.image = image, 
            this.speedModifier = speedModifier,
            this.speed= gameSpeed * this.speedModifier
        } 
        update() {
            // console.log(this.x)
            // console.log(-this.x - this.width)
            this.speed = gameSpeed * this.speedModifier
            if ( this.x <= -this.width ) {
                this.x = 0
            }
            this.x = this.x - this.speed
            // this.x = gameFrame * this.speed % this.width
        }
        draw() {
            ctx.drawImage( this.image, -this.x, 0, layerWidth, layerHeight, 0, 0, canvas.width * fractionWidth, canvas.height * fractionHeight )
            ctx.drawImage( this.image, -this.x - this.width, 0, layerWidth, layerHeight, 0, 0, canvas.width * fractionWidth, canvas.height * fractionHeight )
        }
    }

    const layer1 = new Layer(backgroundLayer1, 0.2)
    const layer2 = new Layer(backgroundLayer2, 0.4)
    const layer3 = new Layer(backgroundLayer3, 0.6)
    const layer4 = new Layer(backgroundLayer4, 0.8)
    const layer5 = new Layer(backgroundLayer5, 1)

    const gameLayers = [layer1, layer2, layer3, layer4, layer5]

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameLayers.forEach( layer => {
            layer.update()
            layer.draw()
        })
        // gameFrame--
        requestAnimationFrame( animate )
    }

    animate()
})