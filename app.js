// get all cards in the table
const cards = document.querySelectorAll('.card');

// shuffle the cards
shuffleCards();


let disableClicking = false;
let isCardFlipped = false;
let firstCard, secondCard;

function flipCard(){
    // board is locked to clicking while action on 2 cards
    // this will be unlocked when the cards are turn back to normal 
    // and ready for new actions of the user ==> after anableCardsFlipping() function only
    if(disableClicking) return;

    // if same card clicked twice (not allowed)
    if(this === firstCard) return;

    // this.classList.toggle('flip');
    // classList.add(), classList.remove(), classList.replace(), classList.toggle()
    this.classList.add('flip');
    this.setAttribute('title', this.dataset.info);

    // first time card clicked
    if(!isCardFlipped){
        isCardFlipped = true;
        firstCard = this;
    }
    // second time card clicked
    else{
        isCardFlipped = false;
        secondCard = this;
        
        // are cards matching?
        checkForMatching();
    }

}

// check cards matching
function checkForMatching(){
    (firstCard.dataset.info === secondCard.dataset.info) ? 
        // cards are matching
        // disable flipping
        disableCardsFlipping() 
        :
        // cards are NOT matching 
        // anable flipping again
        anableCardsFlipping();
    
}


// disable flipping => remove click event from the cards
function disableCardsFlipping(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    // show empty cell
    setTimeout(() => {
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        
        // reset params to be ready for the next round
        resetParams();
    }, 1500);


}
  
// anable flipping again => remove flip class to reset flipping
function anableCardsFlipping(){
    // disable clicking to prevent bugs while clicking too many cards at once. 
    // only 2 cards are allowed every turn
    disableClicking = true;

    // delay in the excution - to be able to see the cards content
    setTimeout(() => {
        // remove the flip class and reset to the back side
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        // reset title attr 
        firstCard.setAttribute('title', '');
        secondCard.setAttribute('title', '');
        
        // anabling clicking again, disableClicking = false ==> in a reset function
        resetParams();
    }, 1500);
}


function resetParams(){
    [isCardFlipped, disableClicking, firstCard, secondCard] = [false, false, null, null];
}

// shuffle the cards by randomally changing order of the display flex
function shuffleCards(){
    cards.forEach(card => {
        let randPosition = Math.floor(Math.random() * 12);
        card.style.order = randPosition;
    })
}


// add event listeners to each card
cards.forEach(card => card.addEventListener('click', flipCard));

