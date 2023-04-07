/*
* OK Créer le plateau de jeu (de façon dynamique)
* OK Créer le pacman
* OK Gérer les déplacements sans contrainte
* OK Contrainte de déplacement (pas dans les murs)
* OK Pièces à manger
* OK Générer les fantomes
* Déplacer les fantome mloyen en aleatoire
* Gérer collision entre Pacman et fantome
* Gérer les powet-pellet
* Gérer une cerise
*/

const gameDiv = document.getElementById("game");
const sizeCaseWidth = 28;
const scroreHtml = document.getElementById("score");
let score = 0;
let fantomesSpeed = 500;

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

// 0 - pac-dots (points à manger)
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet (points de puissance)
  // 4 - empty

creerPlateau();

document.addEventListener("keydown", (event) => {
    deplacerPacman(event.key);
});

function creerPlateau() {
    let cptCase = 0;
    scroreHtml.innerHTML = score;

    layout.forEach(caseLayout => {
        let casePlateau = document.createElement("div");
        // Donne un data attribut qui affecte à chaque case un numéro
        casePlateau.dataset.numerocase = cptCase;
        switch (caseLayout) {
            // Dessine les murs du plateau
            case 0:
                casePlateau.classList.add("point");
                break;
            case 1:
                casePlateau.classList.add("mur");
                break;
            case 2:
                casePlateau.classList.add("fantome-area");
                break;
            case 3:
                casePlateau.classList.add("point-puissance");
                break;
            case 4:

                break;
        
            default:
                break;
        }
        gameDiv.appendChild(casePlateau);
        cptCase++;
    });

    getCaseByIndex(489).classList.add("pacman");
    generateFantome();

    // Déplacement aléatoire des fantomes
    setInterval(deplacerFantomes, fantomesSpeed);
    
}

// Permet de retourner une case selon son index
function getCaseByIndex(index) {
    // Permet de placer Pacman sur le plateau
    let caseGame = document.querySelector("[data-numerocase='" + index + "']");
    return caseGame;
}

function deplacerPacman(direction) {
    let pacmanDiv = document.querySelector(".pacman");
    let pacmanCase = pacmanDiv.dataset.numerocase;
    let caseDestination = null;
    switch (direction) {
        case "ArrowUp":    
            caseDestination= getNumeroCaseDestination(pacmanCase, directions.Haut)
            break;
        case "ArrowRight":
            // Déplacer la case contenant pacman de 1 vers la droite
            caseDestination= getNumeroCaseDestination(pacmanCase, directions.Droite)
            break;
        case "ArrowLeft":
             // Déplacer la case contenant pacman de 1 vers la gauche
            caseDestination= getNumeroCaseDestination(pacmanCase, directions.Gauche)
            break;
        case "ArrowDown":
            caseDestination= getNumeroCaseDestination(pacmanCase, directions.Bas)
            break;
        default:
            break;
    };

    if (caseDestination != null) {
        if (checkDirectionWall(caseDestination)) {
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman");
            if (!checkPacmanEatedByGhost(caseDestination)) {
                checkPointEating(caseDestination);
            }
        };
    };
}

// return faux si je ne peux pas aller où je veux
// return vrai si je peux
function checkDirectionWall(caseDestination) {
    if (caseDestination.classList.contains("mur")) {
        return false;
    } else {
        return true;
    }
}

function checkPacmanEatedByGhost(caseToCheck) {
    let containsPacman = caseToCheck.classList.contains("pacman");
    let containsGhost = caseToCheck.classList.contains("fantome");

    if (containsPacman && containsGhost) {
        alert("perdu");
    }
}

//return true si collision avec 1 fantome
function checkFantomeCollision(caseDestination) {
    if (caseDestination.classList.contains("fantome")) {
        return true;
    } else {
        return false;
    }
}

function checkPointEating(caseDestination) {
    if (caseDestination.classList.contains("point")) {
        incrementScore();
        caseDestination.classList.remove("point");
    }
}

function incrementScore() {
    score++;
    scroreHtml.innerHTML = score;
    let allPoints = layout.filter(points => points == 0);
    if (score == allPoints.length) {
        alert("C'est gagné");
    }
}

function generateFantome() {
    // Générer fantome * 4
    for (let i = 0; i < 4; i++) {
        // cible une div qui a class fantome-area mais pas class fantome
        let casePotentialFantome = document.querySelectorAll(".fantome-area:not(.fantome)");
        let caseForFantome = casePotentialFantome[getRandomNumber(casePotentialFantome.length)];
        caseForFantome.classList.add("fantome");
    }
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max)
}

function deplacerFantomes() {
   // Récupérer les fantomes
    let allFantome = document.querySelectorAll(".fantome");
    allFantome.forEach(fantome => {
        let goodDriectionfinded = false;
        let fantomeCaseId = fantome.dataset.numerocase;

        let allDirectionspossibles = [
            directions.Haut,
            directions.Bas,
            directions.Gauche,
            directions.Droite,
        ];

        let allGoodsDirections = [];

        allDirectionspossibles.forEach(direction => {
            let isPossible = true;
            let casePossible = getNumeroCaseDestination(fantomeCaseId, direction);
            if (!checkDirectionWall(casePossible)) {
                isPossible = false;
            }
            if (checkFantomeCollision(casePossible)) {
                isPossible = false;
            }

            if (isPossible) {
                allGoodsDirections.push(direction);
            }
        });

        if (allGoodsDirections.length > 1) {
            // Plusoeurs positions possibles, j'élmine celle qui ne va pas avec previous direction
            let previousDirection = fantome.dataset.previousDirection;

            allGoodsDirections.forEach(goodDirection => {
                if (!checkNotGoBack(parseInt(previousDirection), goodDirection)) {
                    const index = allGoodsDirections.indexOf(goodDirection);
                    if (index > -1) {//Only splice array when item is found
                        allGoodsDirections.splice(index, 1); // 2nd param means remove one
                    }
                }
            });
        }

        //j'ai un tableau allGoodDirection, qui contient toutes les bonnes directions possibles
        // Il en faut une au hasard
        let elementOfTable = getRandomNumber(allGoodsDirections.length);
        let direction = allGoodsDirections[elementOfTable];
        caseDestination = getNumeroCaseDestination(fantomeCaseId, direction);
        fantome.classList.remove("fantome");
        fantome.removeAttribute("data-previous-direction");
        caseDestination.classList.add("fantome");
        caseDestination.dataset.previousDirection = direction;
        checkPacmanEatedByGhost(caseDestination);
        goodDriectionfinded = true;
    });
}

function checkNotGoBack(previousDirection, direction) {
    let canMove = false;

    //Si previousDirection est 0, direction ne peut pas être 1
    //Si previousDirection est 1, direction ne peut pas être 0
    //Si previousDirection est 2, direction ne peut pas être 3
    //Si previousDirection est 3, direction ne peut pas être 2
    switch (previousDirection) {
        case directions.Haut: 
            direction == directions.Bas ? canMove = false : canMove = true;
            break;
        case directions.Bas:
            direction == directions.Haut ? canMove = false : canMove = true;
            break;
        case directions.Gauche:
            direction == directions.Droite ? canMove = false : canMove = true;
            break;
        case  directions.Droite:
            direction == directions.Gauche ? canMove = false : canMove = true;
            break;
            break;
        default:
            canMove = true;
            break;
    }
    return canMove;
}

function getNumeroCaseDestination(caseActuelle, direction) {
    let caseDestination = null;
    let directionInt = parseInt(direction);
    let caseActuelleInt = parseInt(caseActuelle);
    switch (directionInt) {
        case directions.Haut:
            caseDestination = getCaseByIndex(caseActuelleInt - sizeCaseWidth);            
            break;
        case directions.Droite:
            // Déplacer la case contenant pacman de 1 vers la droite
            caseDestination = getCaseByIndex(caseActuelleInt + 1);
            break;
        case directions.Gauche:
             // Déplacer la case contenant pacman de 1 vers la gauche
            caseDestination = getCaseByIndex(caseActuelleInt - 1);
            break;
        case directions.Bas:
            caseDestination = getCaseByIndex(caseActuelleInt + sizeCaseWidth);
            break;
        default:
            break;
    };
    return caseDestination;
}

const directions = {
    Haut: 0,
    Bas: 1,
    Droite: 2,
    Gauche: 3
}