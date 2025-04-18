// TODO
// Changer le sens de pacman

// 0 - pac-dots (points à manger)
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet (points de puissance)
// 4 - empty

const gameDiv = document.getElementById("game");
const sizeCaseWidth = 28;
const scroreHtml = document.getElementById("score");
let score = 0;
let fantomesSpeed = 500;
let PacmanCanEatGhost = false;
let intervalFantome = null;
let directionMaintenue = null;
let intervalDeplacementPacman = null;

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
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
    1,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

document.getElementById("play").addEventListener("click", () => {
    stopPartie();
    creerPlateau();
})

function creerPlateau() {
    gameDiv.innerHTML = "";
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
            case 5:
                casePlateau.classList.add("cerise");
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
    intervalFantome = setInterval(deplacerFantomes, fantomesSpeed);

    document.addEventListener("keydown", onKeydownAction);
    document.addEventListener("keyup", onKeyupStopAction);
}

function onKeydownAction(event) {
    const direction = event.key;
    const pacmanDiv = document.querySelector(".pacman");

    // Supprimer les classes de rotation précédentes
    pacmanDiv.classList.remove("rotate-left", "rotate-up", "rotate-down", "rotate-right");

    if (direction === "ArrowUp") {
        directionMaintenue = direction;
        pacmanDiv.classList.add("rotate-up");
        if (!intervalDeplacementPacman) {
            intervalDeplacementPacman = setInterval(deplacerPacmanContinu, 100);
        }
    } else if (direction === "ArrowDown") {
        directionMaintenue = direction;
        pacmanDiv.classList.add("rotate-down");
        if (!intervalDeplacementPacman) {
            intervalDeplacementPacman = setInterval(deplacerPacmanContinu, 100);
        }
    } else if (direction === "ArrowLeft") {
        directionMaintenue = direction;
        pacmanDiv.classList.add("rotate-left");
        if (!intervalDeplacementPacman) {
            intervalDeplacementPacman = setInterval(deplacerPacmanContinu, 100);
        }
    } else if (direction === "ArrowRight") {
        directionMaintenue = direction;
        pacmanDiv.classList.add("rotate-right");
        if (!intervalDeplacementPacman) {
            intervalDeplacementPacman = setInterval(deplacerPacmanContinu, 100);
        }
    }
}

function deplacerPacmanContinu() {
    if (directionMaintenue) {
        deplacerPacman(directionMaintenue);
    }
}

function onKeyupStopAction(event) {
    const direction = event.key;
    if (direction === "ArrowUp" || direction === "ArrowDown" || direction === "ArrowLeft" || direction === "ArrowRight") {
        directionMaintenue = null;
        clearInterval(intervalDeplacementPacman);
        intervalDeplacementPacman = null;
    }
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
            if (caseDestination.classList.contains("point-puissance")) {
                // Pacman peut manger fantome
                caseDestination.classList.remove("point-puissance");
                PacmanCanEatGhost = true;
                gameDiv.classList.add("pacmanCanEatGhost");
                // au bout de 5s, pacman ne peut plus manger de fantome
                setTimeout(()=> {
                    PacmanCanEatGhost = false;
                    gameDiv.classList.remove("pacmanCanEatGhost");
                }, 5000)
            }
            if (caseDestination.classList.contains("cerise")) {
                // Pacman mange une cerise
                incrementScore(50);
                caseDestination.classList.remove("cerise");
            }
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
        if (PacmanCanEatGhost) {
            caseToCheck.classList.remove("fantome");
        } else {
            stopPartie();
            alert("Perdu");
        }
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

function incrementScore(point = 1) {
    score += point;
    scroreHtml.innerHTML = score;
    // Vérifier le nombre de points restants dans le DOM
    const pointsRestants = document.querySelectorAll(".point").length-1;
    console.log(pointsRestants)

    if (pointsRestants === 0) {
        stopPartie();
        alert("C'est gagné !");
    }
}

function generateFantome() {
    // Générer fantome * 4
    for (let i = 0; i < 0; i++) {
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
            // Plusieurs positions possibles, j'élmine celle qui ne va pas avec previous direction
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

function stopPartie() {
    score = 0;
    // clear intervalFantome
    if (intervalFantome != null) {
        clearInterval(intervalFantome);
    }

    // // Supprimer ecouteurs d'événements pour arrêter Pacman
    // document.removeEventListener("keyup", onKeyupAction);
    clearInterval(intervalDeplacementPacman); // Arrêter l'intervalle de Pacman
    intervalDeplacementPacman = null;
    document.removeEventListener("keydown", onKeydownAction); // Modifier l'écouteur supprimé
    document.removeEventListener("keyup", onKeyupStopAction); // Supprimer le nouvel écouteur keyup

}