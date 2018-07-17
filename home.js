/*  blackjack Application */
let suits=[
    "Hearts",
    "Clubs",
    "Diamonds",
    "Spades"
];
let values=[
    "Ace","King","Queen","Jack",
    "Ten","Nice","Eight","Seven","Six",
    "Five","Four","Three","Two"
];
let gameStated=false,
    gameOver=false,
    playerWon=false;
let gameStatus="Welcome to Dash Center";
let Dealer={
        dealerCards: [],
        dealerName: "Batman(Bot)",
        dealerScore: 0,
    };
let Player={
        playerCards:[],
        playerName :"Dash",
        playerScore:0,
    };
let decks=[];
// DOM elements
let textArea=document.getElementById("text-area");
let newGamebutton=document.getElementById("new-game-button");
let hitButton=document.getElementById("hit-button");
let stayButton=document.getElementById("stay-button");
let dealerTitle=document.getElementById("dealer-title");
let dealerScore=document.getElementById("dealer-score");
let dealerListcard=document.getElementById("dealer-listcard");
// player
let playerTitle=document.getElementById("player-title1");
let playerScore=document.getElementById("player-score1");
let playerListcard=document.getElementById("player-listcard1");
//
// 

//
function createDeck(){
    let deck=[];
    for( let suitIdx = 0 ; suitIdx < suits.length ;suitIdx++){
        for( let valueIdx = 0 ; valueIdx < values.length ; valueIdx ++){
            let card ={
                suit : suits[suitIdx],
                value : values[valueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

//--
function getNextCard(){
    return decks.shift();
}
function getCardString(card){
    return card.value + "of" + card.suit;
}
function cardShuffle(deck){
    for(let i = 0 ; i < deck.length ; i++){
        let indexSwap= Math.trunc(Math.random()*deck.length);
        let temp=deck[indexSwap];
        deck[indexSwap]=deck[i];
        deck[i]=temp;
    }
}
//

function checkSystem(){
    if( gameStated){ // gameStatus = true
        gameStatus="Game Started...!";
    }
    else { // gameStatus = false
        gameStatus="Welcome to Dash Center";
    }
    Dealer.dealerScore=calculateScore(Dealer.dealerCards);
    Player.playerScore=calculateScore(Player.playerCards);
    if(Dealer.dealerScore >= 21){
        gameOver =true ;
        gameStated =false;
    }
    else if(  Player.playerScore >= 21){
        gameOver =true ;
        playerWon =true ;
        gameStated =false;
    }
}
function getMsgshowCard(listcard){
    let msg="List Card:\n";
    for(let i = 0 ; i < listcard.length ; i++ ){
        msg += getCardString(listcard[i]);
        msg +="\n";
    }
    //console.log(msg);
    return msg;
}
function  valueChange(card){
    switch(card.value){
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nice":
            return 9;
        default:
            return 10;
    }
}
function calculateScore(liscard){
    let score =0;
    for(let i = 0 ; i < liscard.length ; i++){
        score += valueChange(liscard[i]);
    }
    return score;
}
function gameDisplay(){
        textArea.innerText=gameStatus;
        if(gameOver ){
            newGamebutton.style.display="block";
            hitButton.style.display="none";
            stayButton.style.display="none";
        }
        // Dealer
        dealerTitle.innerText=Dealer.dealerName;
        dealerScore.innerText="Score:"+Dealer.dealerScore;
        dealerListcard.innerText=getMsgshowCard(Dealer.dealerCards);
        // Update player
        playerTitle.innerText=Player.playerName;
        playerScore.innerText="Score:"+Player.playerScore;
        playerListcard.innerText=getMsgshowCard(Player.playerCards);
        console.log(gameStated);
}
//
function updateGame(){
    checkSystem();
    gameDisplay();
    //console.log(Player.playerCards);
    console.log(typeof(Dealer.dealerCards),typeof(getNextCard()));
}

//
function stat_game(){
    if(gameStated == true){
        decks=createDeck();
        cardShuffle(decks);
        Dealer.dealerCards=[getNextCard()  ];
        Player.playerCards=[getNextCard()  ];
        
    }
}
function initGame(){
    Dealer.dealerCards = [];
    Dealer.dealerScore = 0;
    Player.playerCards =[];
    Player.playerScore =0;
    gameOver =false ;
    playerWon =false;
}
function Home(){
    // init status
    hitButton.style.display='none';
    stayButton.style.display='none';
    dealerTitle.innerText=Dealer.dealerName;
    playerTitle.innerText=Player.playerName;
    // init values and flags
    /* waiting for the event */
    newGamebutton.addEventListener("click",function(){
        gameStated=true;
        initGame();
        stat_game();
        newGamebutton.style.display='none';
        hitButton.style.display='inline';
        stayButton.style.display='inline';
        updateGame();
    });

}



function inGame(){
    stayButton.addEventListener("click",function(){
    });
    hitButton.addEventListener("click",function(){
        if(! gameOver && decks.length > 0 ){
            Dealer.dealerCards.push(getNextCard());
            Player.playerCards.push(getNextCard());
            updateGame();
        }
    });
}
Home();
inGame();


