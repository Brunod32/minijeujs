import { Confetti } from "../lib/confetti.js";

let beginGame = document.getElementById('beginGame');
let numberToFind = 0;
let checkPropalUser = document.getElementById('checkPropalUser');
const resultDiv = document.getElementById('resultDiv');
const reboursDiv = document.getElementById('countdown');
const gamePropalDiv = document.getElementById('gamePropalDiv');
let tempsRestant = 0;
let compteurInterval = null;

beginGame.addEventListener('click', function () {
    launchGame();
});

checkPropalUser.addEventListener('click', function () {
    checkPropal();
});

document.getElementById('userPropalInput').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        checkPropal();
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function checkPropal() {
    // on récupère le nombre proposé par l'utilisateur
    let numberPropal = document.getElementById('userPropalInput').value;

    if (numberToFind > numberPropal) {
        // C'est plus
        resultDiv.innerHTML = "C'est plus !";
        let audio = new Audio("audio/plus.mp3");
        audio.play();
    } else if (numberToFind < numberPropal) {
        // c'est moins
        resultDiv.innerHTML = "C'est moins !";
        let audio = new Audio("audio/moins.mp3");
        audio.play();
    } else if (numberToFind == numberPropal){
        // C'est gagné
        // resultDiv.innerHTML = "C'est gagné !";
        // Confetti.launchAnimationConfeti();
        // let audio = new Audio("audio/applause.mp3");
        // audio.play();
        endGame(true);
    }
}

function launchGame() {
    // Lancer la partie
    // récuperer chiffre aléatoire
    Confetti.stopAnimationConfeti();
    numberToFind = getRandomInt(1000);
    console.log(numberToFind);
    tempsRestant = 30;
    gamePropalDiv.style.display = "block";
    // Permet de relancer le compteur
    if (compteurInterval != null) {
        clearInterval(compteurInterval);
    }
    
    compteurInterval = setInterval(() => {
        reboursDiv.innerText = tempsRestant;
        tempsRestant--;
        if (tempsRestant >= 20) {
            reboursDiv.classList.add("cool");
            reboursDiv.classList.remove("warning");
            reboursDiv.classList.remove("danger");
        } else if (tempsRestant > 10) {
            reboursDiv.classList.add("warning");
            reboursDiv.classList.remove("cool");
            reboursDiv.classList.remove("danger");
        } else if (tempsRestant >= 0) {
            reboursDiv.classList.add("danger");
            reboursDiv.classList.remove("cool");
            reboursDiv.classList.remove("warning");
        } else if (tempsRestant < 0) {
            clearInterval(compteurInterval);
            reboursDiv.innerText = "Le temps est écoulé !";
            endGame();
        }
    }, 1000);
}

function endGame(gagne) {
    if (gagne) {
        resultDiv.innerHTML = "C'est gagné !";
        Confetti.launchAnimationConfeti();
        let audio = new Audio("audio/applause.mp3");
        audio.play();
        setTimeout(() => {
            Confetti.stopAnimationConfeti();
        }, 5000);
    } else {
        let audio = new Audio("audio/perdu.mp3");
        audio.play();
    }
    gamePropalDiv.style.display = "none";
    clearInterval(compteurInterval);    
}