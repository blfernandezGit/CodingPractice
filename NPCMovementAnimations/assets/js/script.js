/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const BORDER_WIDTH = 3
const MAX_HEIGHT = 800
const MAX_WIDTH = 400
const numberOfEnemies = 2
const enemiesArray = []

window.addEventListener( 'resize', resizeCanvas )
window.addEventListener( 'orientationchange', resizeCanvas )
resizeCanvas()

function resizeCanvas() {
    canvas.width = canvas.offsetWidth - ( 2 * BORDER_WIDTH )
    canvas.height = canvas.offsetHeight - ( 2 * BORDER_WIDTH )
}

const enemy1 = enemyBase( 'enemy1', './assets/images/enemy1.png', 293, 155 )
const enemy2 = enemyBase( 'enemy2', './assets/images/enemy2.png', 266, 188 )
const enemy3 = enemyBase( 'enemy3', './assets/images/enemy3.png', 218, 177 )
const enemy4 = enemyBase( 'enemy4', './assets/images/enemy4.png', 213, 212 )

function enemyBase ( type, src, spriteWidth, spriteHeight ) {
    return {
        type,
        src,
        spriteWidth,
        spriteHeight
    }
}

let gameFrame = 0

function baseEnemyCreator({ type, src, spriteWidth, spriteHeight, speed, angle, angleSpeed, curve, interval }) {
    const image = new Image()
    image.src = src
    const width = spriteWidth / (canvas.width > canvas.height ? canvas.width : canvas.height) * 200
    const height = spriteHeight / (canvas.width > canvas.height ? canvas.width : canvas.height) * 200
    let x = Math.random() * (canvas.width - width)
    let y = Math.random() * (canvas.height - height)
    let newX = Math.random() * (canvas.width - width)
    let newY = Math.random() * (canvas.height - height)
    let frame = 0
    let animationSpeed = Math.floor( Math.random() * 3 + 1 )
    return {
        update: () => {
            switch( type ) {
                case 'enemy1':
                    x += Math.random() * 5 - 2.5
                    y += Math.random() * 5 - 2.5
                    break
                case 'enemy2':
                    x += -speed
                    y += curve * Math.sin( angle )
                    angle += angleSpeed
                    break
                case 'enemy3':
                    x = curve * Math.sin( angle * Math.PI / 90) + ( canvas.width / 2 - width / 2 )
                    y = curve * Math.cos( angle * Math.PI / 180) + ( canvas.height / 2 - height / 2 )
                    angle += angleSpeed
                    break
                case 'enemy4':
                    if( gameFrame % interval === 0 ) {
                        newX = Math.random() * (canvas.width - width)
                        newY = Math.random() * (canvas.height - height)
                    }
                    let dx = x - newX
                    let dy = y - newY
                    x -= dx / 20
                    y -= dy / 20
                    break
            }
            if ( x + width < 0 ) x = canvas.width
            // animate sprites
            if ( gameFrame % animationSpeed === 0 ) {
                frame > 4 ? frame = 0 : frame++
            }
        },
        draw: () => {
            ctx.drawImage( image, frame * spriteWidth, 0, spriteWidth, spriteHeight, x, y, width, height )
        }
    }
}

function enemy1Creator() {
    const enemy = {
        ...enemy1
    }

    return {
        ...baseEnemyCreator(enemy)
    }
}

function enemy2Creator() {
    const enemy = {
        ...enemy2,
        speed: Math.random() * 4 + 1,
        angle: Math.random() * 2,
        angleSpeed: Math.random() * 0.2,
        curve: Math.random() * 7
    }

    return {
        ...baseEnemyCreator(enemy)
    }
}

function enemy3Creator() {
    const enemy = {
        ...enemy3,
        speed: Math.random() * 4 + 1,
        angle: Math.random() * 2,
        angleSpeed: Math.random() * 2 + 0.5,
        curve: Math.random() * 200 + 50
    }

    return {
        ...baseEnemyCreator(enemy)
    }
}

function enemy4Creator() {
    const enemy = {
        ...enemy4,
        speed: Math.random() * 4 + 1,
        interval: Math.floor( Math.random() * 200 + 50 )
    }

    return {
        ...baseEnemyCreator(enemy)
    }
}

for ( let i = 0; i < numberOfEnemies; i++ ) {
    enemiesArray.push( enemy1Creator() )
    enemiesArray.push( enemy2Creator() )
    enemiesArray.push( enemy3Creator() )
    enemiesArray.push( enemy4Creator() )
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