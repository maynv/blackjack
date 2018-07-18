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
        idIngame  :"",
        budget:0,
        dealerCards: [],
        dealerName: "Batman(Bot)",
        dealerScore: 0,
    };
let Player={
        idIngame  :"",
        playerCards:[],
        playerName :"Dash",
        playerScore:0,
        betAmount:0,
        budget :0
    };
let decks=[];
let varinGame ={
    betAmount : 0,
    numOfplayer : 0,
    currency :"$",
};
/*get HTML DOM elements*/
// get button
    // newgame button
        let newGamebutton=document.getElementById("new-game-button");
    // hit button
        let hitButton=document.getElementById("hit-button");
    // stay button
        let stayButton=document.getElementById("stay-button");
// dealer DOM
    // dealer name
        let dealerTitle=document.getElementById("dealer-title");
    // dealer avatar
        let dealer_avatar=document.getElementById("dealer-avatar");
    // dealer 
        let dealer_id=document.getElementById("dealer-id");
    // dealer budget
        let dealer_budget=document.getElementById("dealer-budget");
    // dealer score ingame
        let dealerScore=document.getElementById("dealer-score");
    // dealer listcard ingame
        let dealerListcard=document.getElementById("dealer-listcard");
// player
    // player name
        let playerTitle=document.getElementById("player-title1");
    // player avater
        let player_avatar1=document.getElementById("player-avatar1");
    // player id
        let player_id1=document.getElementById("player-id1");
    // player budget
        let player_budget1=document.getElementById("player-budget1");
    // player scores ingame
        let playerScore=document.getElementById("player-score1");
    // player liscard ingame 
        let playerListcard=document.getElementById("player-listcard1");
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
        // textArea.innerText=gameStatus;
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
function update_playerinformation(){

}
//
function start_game(){
    if(gameStated == true){
        decks=createDeck();
        cardShuffle(decks);
        Dealer.dealerCards=[getNextCard()  ];
        Player.playerCards=[getNextCard()  ];
        update_playerinformation();
    }
}
function initGame(){
    // init player
    // init dealer
    Dealer.dealerCards = [];
    Dealer.dealerScore = 0;
    // data will take from server
    Dealer.idIngame="BJ120-1259-2134";
    Dealer.budget=2000000;
    // init player
    Player.budget=1000000; 
    Player.idIngame="BJ111-1259-1544";
    Player.playerCards =[];
    Player.playerScore =0;
    gameOver =false ;
    playerWon =false;

    //init DOM
    // update dealer 
        // update dealer avatar
            dealer_avatar.setAttribute("src","image/dealer_avatar.png");
        // update information
            dealer_id.innerText="ID:"+Dealer.idIngame;
            dealer_budget.innerText=Dealer.budget+" "+varinGame.currency;
            dealerTitle.innerText=Dealer.dealerName;

    // update players
        // update avatar   
            player_avatar1.setAttribute("src","image/player_avatar.png");
        // update information
            player_id1.innerText="ID:"+Player.idIngame;
            player_budget1.innerText=Player.budget+" "+varinGame.currency;
            playerTitle.innerText=Player.dealerName;
}



function Home(){
    // init status
    hitButton.style.display='none';
    stayButton.style.display='none';
    
    // init values and flags
    /* waiting for the event */
    newGamebutton.addEventListener("click",function(){
        gameStated=true;
        initGame();
        start_game();
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


