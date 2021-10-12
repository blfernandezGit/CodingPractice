/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const BORDER_WIDTH = 3
const MAX_HEIGHT = 800
const MAX_WIDTH = 400
const numberOfEnemies = 10
const enemiesArray = []

window.addEventListener( 'resize', resizeCanvas )
window.addEventListener( 'orientationchange', resizeCanvas )
resizeCanvas()

function resizeCanvas() {
    canvas.width = canvas.offsetWidth - ( 2 * BORDER_WIDTH )
    canvas.height = canvas.offsetHeight - ( 2 * BORDER_WIDTH )
}

const enemySize = 80
const fractionSize = enemySize / MAX_HEIGHT

let gameFrame = 0

class Enemy {
    constructor() {
        this.image = new Image()
        this.spriteWidth = 293
        this.spriteHeight = 155
        this.width = this.spriteWidth / canvas.width * 100
        this.height = this.spriteHeight / canvas.width * 100
        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)
        this.frame = 0
    }
    update() {
        this.x += Math.random() * 5 - 2.5
        this.y += Math.random() * 5 - 2.5
        // animate sprites
        if ( gameFrame % this.flapSpeed === 0 ) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
    draw() {
        ctx.drawImage( this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height )
    }
}

class Enemy1 extends Enemy {
    constructor() {
        super()
        this.image.src = './assets/images/enemy1.png'
        this.spriteWidth = 293
        this.spriteHeight = 155
        this.flapSpeed = Math.floor( Math.random() * 3 + 1 )
    }
}

class Enemy2 extends Enemy {
    constructor() {
        super()
        this.image.src = './assets/images/enemy2.png'
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.flapSpeed = Math.floor( Math.random() * 3 + 1 )
    }
}

class Enemy3 extends Enemy {
    constructor() {
        super()
        this.image.src = './assets/images/enemy3.png'
        this.spriteWidth = 218
        this.spriteHeight = 177
        this.flapSpeed = Math.floor( Math.random() * 3 + 1 )
    }
}

class Enemy4 extends Enemy {
    constructor() {
        super()
        this.image.src = './assets/images/enemy4.png'
        this.spriteWidth = 213
        this.spriteHeight = 212
        this.flapSpeed = Math.floor( Math.random() * 3 + 1 )
    }
}

for ( let i = 0; i < numberOfEnemies; i++ ) {
    enemiesArray.push( new Enemy1() )
    enemiesArray.push( new Enemy2() )
    enemiesArray.push( new Enemy3() )
    enemiesArray.push( new Enemy4() )
}

function animate() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height)
    enemiesArray.forEach( enemy => {
        enemy.update()
        enemy.draw()
    })
    gameFrame++
    requestAnimationFrame(animate)
}

animate()