//Busca a carta
const cards = document.querySelectorAll('.card')
let failBoard = null;
let attemptboard = null;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let failedAttempts = 0;
let totalAttempts = 0;

function onload(){
    failBoard = document.getElementById('failboard');
    attemptboard = document.getElementById('attemptboard');
}

function flipCard(){

    if(lockBoard) return;
    if(this === firstCard) return

    //toggle - carta pode virar e desvirar
    //add - carta só vira uma vez
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}


function checkForMath(){
    //dataset.card -> data-card
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards()
        return;
    }

    unflipCards()
}


//Busca por cada Carta
cards.forEach((card) => {
    //Adicionar evento a partir do click
    card.addEventListener('click',flipCard)

});

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    addAttempt()
    resetBoard()
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        failedAttempts++;
        failBoard.innerHTML = "Failed Attempts <p>"+failedAttempts+"</p>"
        addAttempt()
        resetBoard()
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false]
    [firstCard,secondCard] = [null, null]
}

function resetCounters(){
    failedAttempts = 0;
    failBoard.innerHTML = "Failed Attempts <p>0</p>"
}

function addAttempt(){
    totalAttempts++;
    attemptboard.innerHTML = "Total Attempts <p>"+totalAttempts+"</p>";
}

//imediately invoked function -> (function funcName(){}();
(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition
    });
})();