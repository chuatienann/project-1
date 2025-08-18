const cards = document.querySelectorAll(".card");
const time = document.querySelector(".time b");
const flipsTag = document.querySelector(".flips b");
const refresh = document.querySelector(".info button");
const messageEl = document.querySelector('#message');

let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() { //initialise time
    if(timeLeft == 0) {
        messageEl.textContent = "You did not complete, better luck next time"; //when time ends
        return clearInterval(timer);

    }
    timeLeft--;
    time.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) { //prevent user from clicking the same card twice
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-side img").src,
        cardTwoImg = cardTwo.querySelector(".back-side img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) { //comment: dont use src to match image
        matchedCard++;
        if(matchedCard === 8 && timeLeft > 0) { //comment: not to hard code, use .length
            messageEl.textContent = 'You matched all cards!';            
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 300);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip"); //removing shake and flip from both cards
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 300);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    time.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;
    messageEl.textContent = "Click on any two cards to begin. Match all the cards within 30 seconds to win. Click restart to begin a new round."
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //array of 16 cards 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => { //remove flip class from all cards and assigning random image
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-side img");
        setTimeout(() => {
            imgTag.src = `src/img-${arr[index]}.png`;
        }, 400);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refresh.addEventListener("click", shuffleCard); //for refresh button

cards.forEach(card => { //adding click event to all cards
    card.addEventListener("click", flipCard);
});