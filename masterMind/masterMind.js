/**
 * 
 * Todo List
 * 
 * Générer la combinaison secrete (4 couleurs)
 * Pouvoir proposer des combinaisons
 * Gérer début et fin de partie
 * 
 * 
 */

import { Utils } from "../lib/Utils/utils.js";

const colors = ["red", "blue", "yellow", "pink"];

console.log(colors[Utils.getRandomInt(4)]);