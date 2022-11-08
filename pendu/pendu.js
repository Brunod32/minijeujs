/*
Todo:
x Générer mot aléatoire
X afficher le mot en masqué
x pouvoir proposer des lettres
x afficher lettres trouvées
o Gérer la
o gérer un nombre erreurs max
*/
import { Confetti } from "../lib/confetti.js";

const buttonPlay = document.getElementById("beginGame");
const allWords = ['ministre', 'montagne', 'constitution', 'corruption', 'economie', 'petrole'];
let wordToFind;
let wordToFindArray;
const wordToFindDiv = document.getElementById("wordToFindDiv");
const keyBoardDiv = document.getElementById("keyBoard");
const cptErrorDiv = document.getElementById("cptErreur");
let cptErreur = 0;
let cptFindedLetter = 0;

buttonPlay.addEventListener("click", function() {
    initGame();    
});

function initGame() {
    Confetti.stopAnimationConfeti();
    cptErreur = 0;
    cptFindedLetter = 0;
    wordToFindDiv.innerHTML = '';
    wordToFind = generateWord();

    // Transmormer le mot en tableau
    wordToFindArray = Array.from(wordToFind);
    
    let table = document.createElement("table");
    let line = document.createElement("tr");
    line.id = "lineOfWord";
    wordToFindArray.forEach(letter => {
        // Créer un td par lettres
        let td = document.createElement("td");
        td.dataset.letter = letter;
        td.innerHTML = "_";
        line.appendChild(td);
    });

    table.appendChild(line);
    wordToFindDiv.appendChild(table);

    generateKeyBoard();
};

function generateKeyBoard() {
    keyBoardDiv.innerHTML = '';
    let alphabet = generateAlphabet();
    alphabet.forEach(letter => {
        let letterDiv = document.createElement("div");
        letterDiv.innerHTML = letter;
        letterDiv.classList.add("letterKeyBoard");
        keyBoardDiv.appendChild(letterDiv);

        letterDiv.addEventListener("click", () => {
            if (checkLetterInWord(letter)) {
               //Affiche la lettre dans le mot masqué
                let lineOfWord = document.getElementById("lineOfWord");
                let allTdOfWord = lineOfWord.children;
                Array.from(allTdOfWord).forEach(td => {
                    if (td.dataset.letter == letter) {
                        td.innerHTML = letter;
                        cptFindedLetter++;
                    }
                });

                if (cptFindedLetter == wordToFindArray.length) {
                    keyBoardDiv.innerHTML = '';
                    cptErrorDiv.innerHTML = "Gagné, avec " + cptErreur + " erreurs";
                    Confetti.launchAnimationConfeti();
                    setTimeout(() => {
                        Confetti.stopAnimationConfeti();
                    }, 5000);
                }
            } else {
                cptErreur++;
                cptErrorDiv.innerHTML = cptErreur;
                if (cptErreur >= 5) {
                    cptErrorDiv.innerHTML = "Perdu avec 5 erreurs."
                    let allTdOfWord = lineOfWord.children;
                    Array.from(allTdOfWord).forEach(td => {
                        td.innerHTML = td.dataset.letter;
                    })
                }
            }

            letterDiv.style.visibility = "hidden";
        })
    })
};

function generateAlphabet(capital = false) {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
}

function generateWord() {
    let indexWord = getRandomInt(allWords.length);
    return allWords[indexWord];
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

// retourne true si lettre est présente dans le mot si absente retourne false
function checkLetterInWord(letter) {
    let findLetter = false;
    wordToFindArray.forEach(letterOfWord => {
        if (letter == letterOfWord) {
            findLetter = true;
        }
    });
    return findLetter;
}