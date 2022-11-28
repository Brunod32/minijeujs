/**
 * 
 * Todo List
 * 
 * o Générer la combinaison secrete (4 couleurs)
 * x Pouvoir proposer des combinaisons
 * x Gérer début et fin de partie
 * 
 * 
 */

import { Utils } from "../lib/Utils/utils.js";

const colors = ["red", "blue", "yellow", "pink"];
let colorTabToFind = null;
const nbColorToFind = 4;

document.getElementById("startGame").addEventListener("click", () => {
    launchGames();
})

function launchGames() {
    setAleaColorTab();
    document.getElementById("allSelect").innerHTML = "";
    for (let index = 0; index < nbColorToFind; index++) {
        generateSelect("allSelect");
    }
}

function generateSelect(idCible) {
    let mySelect = document.createElement("select");
    colors.forEach(color => {
        let colorOption = document.createElement("option");
        colorOption.innerHTML = color;
        colorOption.value = color;
        colorOption.style.backgroundColor = color;
        mySelect.appendChild(colorOption);
    });

    document.getElementById(idCible).appendChild(mySelect);
}


function setAleaColorTab(size = 4) {
    colorTabToFind = [];
    for (let index = 0; index < size; index++) {
        colorTabToFind.push(getAleaColor());
        
    }
}

function getAleaColor() {
    let aleaIndex = Utils.getRandomInt(colors.length);
    let aleaColor = colors[aleaIndex];
    return aleaColor;
}