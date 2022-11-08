import { Confetti } from "../lib/confetti.js";

const allWords = [
    "pokemon", "football", "peche",
    "friends", "dessin", "danse", "metal",
    "puzzle", "chocolat", "amour"
];
const buttonPlay = document.getElementById("beginGame");
const wordToFindDiv = document.getElementById("wordToFindDiv");
const KeyBoardDiv= document.getElementById("KeyBoard");
const cptErrorDiv= document.getElementById("errorCount");
const hangedManImg = document.getElementById("hangedManImg");
let wordToFind;
let wordToFindArray;
let errorCount =0;
let cptLettreTrouvees =0;

buttonPlay.addEventListener("click", function(){
    initGame();
});

function initGame(){
    Confetti.stopAnimationConfeti();
    errorCount = 0;
    hangedManImg.className = '';
    hangedManImg.classList.add("state"+errorCount);   
    cptLettreTrouvees =0;
    wordToFindDiv.innerHTML = '';
    wordToFind = generateWord();
    wordToFindArray = Array.from(wordToFind);
    
    let table = document.createElement("table"); 
    let line = document.createElement("tr");
    line.id="LineOfWord";
    wordToFindArray.forEach(letter => {
        //Créer un TD (case du tableau) par lettre
        let td = document.createElement("td");
        td.dataset.letter = letter;
        td.innerText = "_";
        line.appendChild(td);
    });

    table.appendChild(line);
    wordToFindDiv.appendChild(table);

    generateKeyBoard();
}

function generateKeyBoard(){
    KeyBoardDiv.innerHTML = '';
    let Alphabet = generateAlphabet();
    Alphabet.forEach(letter => {
        let lettreDiv =document.createElement("div");
        lettreDiv.innerHTML = letter;
        lettreDiv.classList.add("letterKeyBoard");
        KeyBoardDiv.appendChild(lettreDiv);

        lettreDiv.addEventListener("click", () => {
            if(checkLetterInWord(letter)){
                //Afficher la lettre dans le mot masqué
                let lineWord = document.getElementById("LineOfWord");
                let allTdOfWord = lineWord.children;
                Array.from(allTdOfWord).forEach(td => {
                    if(td.dataset.letter == letter){
                        td.innerHTML = letter;
                        cptLettreTrouvees ++;
                    }
                });

                if(cptLettreTrouvees == wordToFindArray.length){
                    KeyBoardDiv.innerHTML = '';
                    cptErrorDiv.innerHTML = 'Gagné, avec '+errorCount+' erreur(s)';
                    Confetti.launchAnimationConfeti();
                    setTimeout(() =>{
                        Confetti.stopAnimationConfeti();
                    }, 5000);
                }
            }
            else{
                //Incrémenter le compteur d'erreur
                errorCount++;
                cptErrorDiv.innerHTML = errorCount;
                hangedManImg.className = '';
                hangedManImg.classList.add("state"+errorCount);
                if(errorCount >= 4){
                    //On a perdu
                    cptErrorDiv.innerHTML = "Perdu, vous avez fait plus de 4 erreurs.";
                    let lineWord = document.getElementById("LineOfWord");
                    let allTdOfWord = lineWord.children;
                    Array.from(allTdOfWord).forEach(td => {
                        td.innerHTML = td.dataset.letter;
                    });
                    KeyBoardDiv.innerHTML = '';
                }
            }

            lettreDiv.style.visibility = "hidden";
        })
    });
}

function generateAlphabet(capital = false) {
	return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));

    // Ou
    // let tab = [];
    // let i = 65;
    // if(!capital)
    // {
    //     i += 32;
    // }
    // let finish = i+26;
    // for(i; i<finish; i++){
    //     tab.push(String.fromCharCode(i));
    // }
    // return tab;
}

function generateWord(){
    let indexWord = getRandomInt(allWords.length);
    return allWords[indexWord];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Retourne true si la lettre est présente dans le mot
function checkLetterInWord(letter){
    let findLetter = false;
    wordToFindArray.forEach(letterOfWord => {
        if(letter == letterOfWord){
            findLetter =  true;
        } 
    });
    return findLetter;
}