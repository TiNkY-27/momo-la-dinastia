const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const audioMomo = document.getElementById('audioMomo');
const audioFinal = document.getElementById('audioFinal');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fps = 20

let img = new Image();
img.src = 'imagenes/momo-benavidesjpg.webp';  // Coloca aquí la ruta de la imagen
img.style.width = '20px'
img.style.height = '20px'

let x = canvas.width / 2;
let y = canvas.height / 2;
// D = velocidad
let dx = 5;
let dy = 5;
let size = 100;
let gameStarted = false;
let gameRunning = false;

const maxSpeed = 100

// fps 0
function start() {
    console.log('fps', 0)
    // logica de render
    gameStarted = true;
    gameRunning = true;

    // empeza el juego
    step()

    // while(gameRunning){
    //     setTimeout(() => {
    //         console.log('fps')
    //     }, 100);
    //     console.log('sas')
    // }
}

// fps 1, 2, 3 ...
function step() {
    console.log({dx,dy,gameRunning})

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, size, size);

    // movs
    x += dx;
    y += dy;


    // if (dx >= maxSpeed || dy >= maxSpeed) {
    //     gameRunning = false
    // }


    // cols
    if (x + size > canvas.width || x < 0) {
        dx = -dx;
        playSound();
        // size += size * 0.1
    }
    if (y + size > canvas.height || y < 0) {
        dy = -dy;
        playSound();
        // size += size * 0.1
    }
    //   end game
    if (size >= canvas.width && size >= canvas.height) {
        endGame();
        return;
    }

    if(gameRunning == true){
        setTimeout(step, fps);
    }else{
        endGame()
    }
}

function playSound() {
    audioMomo.currentTime = 0;
    audioMomo.play();
}

function endGame() {

    gameRunning = false;
    audioMomo.pause();
    audioFinal.play();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '48px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('¡Bien!', canvas.width / 2, canvas.height / 2);
}

canvas.addEventListener('click', () => {
    // if (!gameStarted) {

        start();
    // }
});
