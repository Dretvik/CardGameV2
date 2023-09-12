
//Card Game App

//Model
const cardTypes = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const cardValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const deckOfCards = [];
let cardsOnHand = [];
let cardsOnTable = [];



//View
updateView();
hideHTMLElements('shuffleDeckButton');
hideHTMLElements('DrawCardsToHandButton');
hideHTMLElements('cardsOnHandContainer');
function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
           <div id="cardGameContainerDiv">
              <!-- <div id="testingStuffDiv">${deckOfCards}</div> -->
               <br>
               <div>The Table:
               <div id="cardsOnTableContainer">${cardsOnTable}</div>
               </div>
               <br>
               <div>Your Hand:
                   <div id="cardsOnHandContainer">${cardsOnHand}</div>
               </div>
               <br>
               <div id="buttonDiv">
               <button class="buttonStyle1" id="createDeckButton" onclick="createDeck()">Create Deck</button>
               <button class="buttonStyle1" id="shuffleDeckButton" onclick="shuffleDeck()">Shuffle Deck</button>
               <button class="buttonStyle1" id="DrawCardsToHandButton" onclick="drawCardsToHand()">Draw cards to hand</button>
               </div>
               <br>
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
                return `<div class="singleCardDivs" onclick="addToTable(this)">${cardObject.value}<br> of <br>${cardObject.type}</div>`;
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
                return `<div class="singleCardDivs" onclick="">${cardObject.value}<br> of <br>${cardObject.type}</div>`;
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
        hideHTMLElements('cardsOnHandContainer')
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
    if (deckOfCards.length === 0 || deckOfCards.length < 0) {
        alert('Not enought cards left in the deck');
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
    const cardValue = cardDiv.textContent.trim();  //Husk å lese mer over .trim() funksjon fant bare ut at den virket i farta.
    const cardIndex = cardsOnHand.findIndex(card => card === cardValue);

    if (cardIndex !== -1) {
        cardsOnHand.splice(cardIndex, 1);
        cardsOnTable.push(cardValue);

        //console.log(cardsOnTable);

        hideHTMLElements('createDeckButton');
        hideHTMLElements('shuffleDeckButton');
        updateView();
    }
}