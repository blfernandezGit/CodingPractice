const buttons = document.querySelectorAll('.drum')

const SOUND_PATH = './sounds/'
const SOUND_FILE_TYPE = '.mp3'

const CRASH = 'crash'
const KICK = 'kick'
const SNARE = 'snare'
const TOM1 = 'tom1'
const TOM2 = 'tom2'
const TOM3 = 'tom3'
const TOM4 = 'tom4'

buttons.forEach( button => 
    button.addEventListener( 'click', function( e ) {
        handleSound( e.target.textContent )
        handleStyle( e.target.textContent )
    } ) 
)

document.addEventListener( 'keydown', function( e ) {
    handleSound( e.key )
    handleStyle( e.key )
} )

const handleSound = ( key ) => {
    switch ( key ) {
        case 'w':
            const tom1Sound = new Audio( audioName(TOM1) )
            tom1Sound.play()
            break
        case 'a':
            const tom2Sound = new Audio( audioName(TOM2) )
            tom2Sound.play()
            break
        case 's':
            const tom3Sound = new Audio( audioName(TOM3) )
            tom3Sound.play()
            break
        case 'd':
            const tom4Sound = new Audio( audioName(TOM4) )
            tom4Sound.play()
            break
        case 'j':
            const snareSound = new Audio( audioName(SNARE) )
            snareSound.play()
            break
        case 'k':
            const crashSound = new Audio( audioName(CRASH) )
            crashSound.play()
            break
        case 'l':
            const kickSound = new Audio( audioName(KICK) )            
            kickSound.play()
            break
        default:
            break
    }
}

const handleStyle = ( key ) => {
    const element = document.querySelector(`.${key}`)
    if( element ) {
        element.classList.add('pressed')
        setTimeout(()=> {
            element.classList.remove('pressed')
        }, 100)
    }
}

const audioName = ( fileName ) => {
    return SOUND_PATH + fileName + SOUND_FILE_TYPE
}