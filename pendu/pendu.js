/*
Todo:
x Générer mot aléatoire
X afficher le mot en masqué
o pouvoir proposer des lettres
o afficher lettres trouvées
o gérer un nombre erreurs max
*/

const buttonPlay = document.getElementById("beginGame");
const allWords = ['ministre', 'montagne', 'constitution', 'corruption', 'economie', 'petrole'];
const wordToFindDiv = document.getElementById("wordToFindDiv");
const keyBoardDiv = document.getElementById("keyBoard");

buttonPlay.addEventListener("click", function() {
    beginGame();    
});

function beginGame() {
    wordToFindDiv.innerHTML = '';
    let wordToFind = generateWord();

    // Transmormer le mot en tableau
    let wordToFindArray = Array.from(wordToFind);
    
    let table = document.createElement("table");
    let line = document.createElement("tr");

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