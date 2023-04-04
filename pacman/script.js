/*
* OK Créer le plateau de jeu (de façon dynamique)
* OK Créer le pacman
* OK Gérer les déplacements sans contrainte
* OK Contrainte de déplacement (pas dans les murs)
* Pièces à manger
* Générer les fantomes
*/

const gameDiv = document.getElementById("game");
const sizeCaseWidth = 28;

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

document.addEventListener("keyup", (event) => {
    deplacerPacman(event.key);
});

function creerPlateau() {
    let cptCase = 0;

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
            caseDestination = getCaseByIndex(parseInt(pacmanCase) - sizeCaseWidth);            
            break;
        case "ArrowRight":
            // Déplacer la case contenant pacman de 1 vers la droite
            caseDestination = getCaseByIndex(parseInt(pacmanCase) + 1);
            break;
        case "ArrowLeft":
             // Déplacer la case contenant pacman de 1 vers la gauche
            caseDestination = getCaseByIndex(parseInt(pacmanCase) - 1);
            break;
        case "ArrowDown":
            caseDestination = getCaseByIndex(parseInt(pacmanCase) + sizeCaseWidth);
            break;
        default:
            break;
    };

    if (caseDestination != null) {
        if (checkDirection(caseDestination)) {
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman");
        };
    };
}

// return faux si je ne peux pas aller où je veux
// return vrai si je peux
function checkDirection(caseDestination) {
    if (caseDestination.classList.contains("mur")) {
        return false;
    } else {
        return true;
    }
}