
//Card Game App

//Model
const cardTypes = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const cardValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const deckOfCards = [];
let cardsOnHand = [];
let cardsOnTable = [];
let winLoseMessageDiv = document.getElementById('winLoseDiv');




//View
updateView();
hideHTMLElements('shuffleDeckButton');
hideHTMLElements('DrawCardsToHandButton');
hideHTMLElements('cardsOnHandContainer');
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
    <div id="rulesDiv2"><h2>The goal is to end up with only one card on the table:</h2>
    <h3>The rules are simple:</h3>
    You can stack the same type on top of each other, or the same value.
    Example: hearts on top of hearts, and 7s on top of 7s. You can place a card from your hand at the 
    first index on the left in the table.</div>
            <div id="cardGameContainerDiv">
              <!-- <div id="testingStuffDiv">${deckOfCards}</div> -->
               <br>
               <div>The Table:
               <div id="cardsOnTableContainer">${cardsOnTable}</div>
               </div>
               <br>
               <div id="buttonDiv">
               <button class="buttonStyle1" id="createDeckButton" onclick="createDeck()">Create Deck</button>
               <button class="buttonStyle1" id="shuffleDeckButton" onclick="shuffleDeck()">Shuffle Deck</button>
               <button class="buttonStyle1" id="DrawCardsToHandButton" onclick="drawCardsToHand()">Draw cards to hand</button>
               <div>${deckOfCards.length} drawable left in deck!</div>
           </div>
               <div>Your Hand:
                   <div id="cardsOnHandContainer">${cardsOnHand}
                   <div id="winLoseDiv"></div>
                   </div>
               </div>
           </div>
          `;
    addCardToTableView();
    updateCardsOnHandView();
}

// Funksjon for å enkelt gjemme knapper, kan modifiserers for å kunne gjemme andre elementer.
function hideHTMLElements(buttonId) {
    setTimeout(() => {
        const hideHTMLElement = document.getElementById(buttonId);
        if (hideHTMLElement) {
            hideHTMLElement.style.display = 'none';
        };
    }, 1);
}
//Funksjon for å vise kort på hånda.
function updateCardsOnHandView() {
    setTimeout(() => {
        const cardsOnHandDiv = document.getElementById('cardsOnHandContainer');
        if (cardsOnHandDiv) {

            // Lager kort objekt for hvert kort på hånda
            const cardObjects = cardsOnHand.map(cardString => {
                const [value, type] = cardString.split(' of ');
                return { value, type };
            });
            // Viser kort objekter (card)
            cardsOnHandDiv.innerHTML = cardObjects.map(cardObject => {
                let cardHtml = `<div class="singleCardDivs" onclick="addToTable(this)">${cardObject.value}<br> of <br>${cardObject.type}`;
                if (cardObject.type === 'Hearts') {
                    cardHtml += `<br><img src="img/hearts.png" class="typeImage" alt="Heart">`;
                }
                if (cardObject.type === 'Clubs') {
                    cardHtml += `<br><img src="img/clubs.png" class="typeImage" alt="Clubs">`;
                }
                if (cardObject.type === 'Diamonds') {
                    cardHtml += `<br><img src="img/diamonds.png" class="typeImage" alt="Diamonds">`;
                }
                if (cardObject.type === 'Spades') {
                    cardHtml += `<br><img src="img/spades.png" class="typeImage" alt="Spades">`;
                }
                cardHtml += `</div>`;
                return cardHtml;
            }).join('');
        }
    }, 1);
}

// Funksjon for å vise (visuelt) hvilke kort som ligger på bordet.

function addCardToTableView() {
    const cardsOnTableDiv = document.getElementById('cardsOnTableContainer');
    setTimeout(() => {
        if (cardsOnTableDiv) {

            // Lager kort objekt for hvert kort på bordet
            const cardObjects = cardsOnTable.map(cardString => {
                const [value, type] = cardString.split(' of ');
                return { value, type };
            });
            cardsOnTableDiv.innerHTML = cardObjects.map(cardObject => {
                let cardHtml = `<div class="singleCardDivs" onclick="">${cardObject.value}<br> of <br>${cardObject.type}`;
                if (cardObject.type === 'Hearts') {
                    cardHtml += `<br><img src="img/hearts.png" class="typeImage" alt="Heart">`;
                }
                if (cardObject.type === 'Clubs') {
                    cardHtml += `<br><img src="img/clubs.png" class="typeImage" alt="Clubs">`;
                }
                if (cardObject.type === 'Diamonds') {
                    cardHtml += `<br><img src="img/diamonds.png" class="typeImage" alt="Diamonds">`;
                }
                if (cardObject.type === 'Spades') {
                    cardHtml += `<br><img src="img/spades.png" class="typeImage" alt="Spades">`;
                }
                cardHtml += `</div>`;
                return cardHtml;
            }).join('');
        }
    }, 1);

}


//Controller

function createDeck() {
    if (deckOfCards.length === 0) {
        for (cardType of cardTypes) {
            for (cardValue of cardValues) {
                deckOfCards.push(`${cardValue} of ${cardType}`);
            };
        };
        hideHTMLElements('cardsOnHandContainer');
        hideHTMLElements('createDeckButton');
        hideHTMLElements('DrawCardsToHandButton');
        updateView();
    }
    return deckOfCards;
}

function shuffleDeck() {
    for (let index = deckOfCards.length - 1; index > 0; index--) {
        const shuffledIndex = Math.floor(Math.random() * (index + 1));
        [deckOfCards[index], deckOfCards[shuffledIndex]] = [deckOfCards[shuffledIndex], deckOfCards[index]];
    };
    hideHTMLElements('cardsOnHandContainer')
    hideHTMLElements('createDeckButton');
    hideHTMLElements('shuffleDeckButton');
    updateView();
    return deckOfCards;
}

function drawCardsToHand() {
    hideHTMLElements('DrawCardsToHandButton');

    if (deckOfCards.length === 0 || deckOfCards.length < 0) {
        hideHTMLElements('createDeckButton');
        hideHTMLElements('shuffleDeckButton');
        updateView();
        return;
    };
    const maxDraw = Math.min(5, 5 - cardsOnHand.length);  // Beregner maks mengde kort på hånda.

    if (maxDraw > 0) {
        for (let index = 0; index < maxDraw; index++) {
            const drawCard = deckOfCards.pop();         // Fjerner de siste kortene i decket.
            cardsOnHand.push(drawCard);                 // Legger til kortene til hånda.
        }
        hideHTMLElements('createDeckButton');
        hideHTMLElements('shuffleDeckButton');
        updateView();
    } else {
        alert('You have reched the maximum hand size');
    }
    

}

//Legge til kort på bordet.

function addToTable(clickedCard) {
    const cardDiv = clickedCard;
    const cardValue = cardDiv.textContent.trim();

    // Sjekker om kortet kan plasserers på index 0.
    if (cardsOnTable.length === 0 || cardsOnTable[0].includes(cardValue.split(' of ')[0]) || cardsOnTable[0].includes(cardValue.split(' of ')[1])) {
        cardsOnHand = cardsOnHand.filter(card => card !== cardValue); // Fjerner kort fra hånda
        if (cardsOnTable.length === 0) {
            cardsOnTable.unshift(cardValue); // Hvis bordet er tomt, putt kortet på index 0
        } else {
            cardsOnTable[0] = cardValue; // Erstatter kort på index 0.
        }
    } 

    // Hvis ikke de andre her er mulig, så vil jeg kunne adde kort til bordet på index 0: 
    else if (cardsOnTable.length !== 0 || cardsOnTable[0].includes(cardValue.split(' of ')[0]) || cardsOnTable[0].includes(cardValue.split(' of ')[1])) {
        // Fjerner kort fra hånden.
        cardsOnHand = cardsOnHand.filter(card => card !== cardValue);

        // Legger til kort på index 0.
        cardsOnTable.unshift(cardValue);
    }
    if (cardsOnHand.length < 5){
        drawCardsToHand();
    }

    hideHTMLElements('createDeckButton');
    hideHTMLElements('shuffleDeckButton');
    winOrLoseTheGame();
    updateView();
    
}
function winOrLoseTheGame() {
    setTimeout(() => {
        if(cardsOnHand.length <= 0 && cardsOnTable.length !== 0){
            if(cardsOnTable.length === 1){
                alert('You did it, you won!');
            } else {
                alert('You lost the game, try again.');
            }
        }
    },500);
    updateView();
}

// Skal ha med en del funksjoner til her:

// 1.
// Funksjon som kan legge kort og erstatte kortet som ligger på index 2 på bordet fra hånda, samme som
// addToTable gjør nå, men for kort på index 2, hvis ikke det går skal den bare adde på index 0.

// 2.
// Skal lage funksjon for kortene på bordet, slik at hvis de deler samme type eller value så kan man legge
// kortet fra venstre oppå(erstatte) det kortet som ligger nærmest til høyre, altså kortet med index+1 ihht det kortet
// som blir trykket på. 

// 3.
// Skal lage funksjon for kortene på bordet, slik at hvis de deler samme type eller value så kan man legge
// kortet fra venstre oppå(erstatte )det kortet som ligger +2 indexer høyere enn kortet som ble trykket på.
// Altså ligger kortet på index 2, så skal man kunne flytte det til index 4 og erstatte kortet som lå der.


// Skal fler regler inn også, men starter med de over her først tenker jeg.



