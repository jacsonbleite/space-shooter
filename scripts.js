const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['images/monster-1.png','images/monster-2.png','images/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');

function flyShip(event){

	if(event.key === 'ArrowUp'){
		event.preventDefault();	
		moveUp();
	}else if(event.key === 'ArrowDown'){
		event.preventDefault();
		moveDown();
	} else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }

}


//subir nave
function moveUp(){

	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	
	if(topPosition === "0px"){		
		return;
	}else{
		let position = parseInt(topPosition);
		position -= 30;
		yourShip.style.top = `${position}px`
	}

}

//descer nave
function moveDown() {

	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

	if(topPosition > "510px"){
		return;
	}else{
		let position = parseInt(topPosition);
		position += 50;
		yourShip.style.top = `${position}px`;
	}
	
}

//atirar
function fireLaser(){

	let laser = createLaserElement();	
	playArea.appendChild(laser);	
	moveLaser(laser);

}

//criar laser do tiro
function createLaserElement(){

	let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    
    newLaser.src = './images/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;   

    return newLaser;

}

function moveLaser(laser){

	let laserInterval = setInterval(() => {	
		
		let xPosition = parseInt(laser.style.left);
		let aliens = document.querySelectorAll('.alien');

		aliens.forEach((alien) => {
            
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'images/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }

        })

		if(xPosition === 340){
			laser.remove();
		}else{
			laser.style.left = `${xPosition + 8}px`;			
		}

	}, 10);

}

//imagens, de alines, aleatórias
function createAlines(){
   
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
   
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    
    playArea.appendChild(newAlien);    
    moveAlien(newAlien);

}

//mover inimigos
function moveAlien(alien) {

	let moveAlienInterval = setInterval(() => {

        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        
        if(xPosition <= 50) {        
            if(Array.from(alien.classList).includes('dead-alien')) {        
                alien.remove();        
            } else {        
                gameOver();        
            }
        } else {        
            alien.style.left = `${xPosition - 4}px`;        
        }

    }, 30);
	
}


//colisão
function checkLaserCollision(laser, alien) {
    
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {    
        if(laserTop <= alienTop && laserTop >= alienBottom) {    
            return true;   
       }else{   
            return false;   
       }   
    }else{   
        return false;   
    }

}

//inicar jogo
startButton.addEventListener('click', (event) => {
    playGame();
})


//func iniciar jogo
function playGame() {

    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    
    alienInterval = setInterval(() => {
        createAlines();
    }, 2000);

}


//func fim de jogo
function gameOver() {
    
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });

}



window.addEventListener('keydown',flyShip);
