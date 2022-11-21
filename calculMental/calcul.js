/*
Todolist

x Lancer un minuteur de x minutes
x Générer un calcul (deux chiffres aléatoires, un opérateur en aléatoire)
x Laisser utilisateur faire des propositions

V2
Paramétrer ma partie
le temps compte à rebours
les opérateurs de la partie
*/

const reboursDiv = document.getElementById("minuteur");
const calculDiv = document.getElementById("calcul");
const propalInput = document.getElementById("resultPropal");
const tempsMinuteurBase = 5;
let compteurInterval = null;
let tempsRestant = 0;
let calculEnCours = null;

document.getElementById('validPropal').addEventListener("click", () => {
    if (propalInput.value == calculEnCours.result) {
        alert("Bravo");
    } else {
        alert("Erreur");
    }
})

function launchGame() {
    lancerMinuteur(tempsMinuteurBase);
}

function generateCalcul() {
    calculEnCours = new Calcul(500);
    calculDiv.innerText = calculEnCours.showcalcul;
}

function lancerMinuteur(tempsMinuteurBase) {
    tempsRestant = tempsMinuteurBase;
    // Affiche le compteur dans la page html
    reboursDiv.innerText = tempsRestant;
    compteurInterval = setInterval(() => {
        // Le code ici va s'exécuter toute les secondes
        tempsRestant--;
        // Affiche le compteur dans la page html
        reboursDiv.innerText = tempsRestant;
        if (tempsRestant == 0) {
            clearInterval(compteurInterval);
            alert('fini');
        }
    }, 1000);
}


class Calcul {
    #operators = ['*', '-', '+'];
    nombre1;
    nombre2;
    operator;
    constructor(maximum) {
        this.nombre1 = this.#getRandomInt(maximum);
        this.nombre2 = this.#getRandomInt(maximum);
        // Operator = opérateur aléatoires dans operators
        this.operator = this.#operators[this.#getRandomInt(3)];
    }

    get result() {
        return eval(this.nombre1 + this.operator + this.nombre2);
    }

    get showcalcul() {
        return `${this.nombre1} ${this.operator} ${this.nombre2}`;
    }

    #getRandomInt(max) {
    return Math.floor(Math.random() * max);
    }
}