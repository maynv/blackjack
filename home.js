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
        state : false,
        idIngame  :"",
        playerCards:[],
        playerName :"Dash",
        playerScore:0,
        betAmount:0,
        budget :0
    };
let Players = [];
let thisPlayer=Player;
let decks=[];
let varinGame ={
    betAmount : 0,
    numOfplayer : 0,
    currency :"$",
};
/*get HTML DOM elements*/
// HTML container
    // Input container
        let inputcontainer=document.getElementById("inputcontainer");
// get button
    // newgame button
        let newGamebutton=document.getElementById("new-game-button");
    // hit button
        let hitButton=document.getElementById("hit-button");
    // stay button
        let stayButton=document.getElementById("stay-button");
    // input button
        let inputButton=document.getElementById("input-submit");
    // all button
        let allButton=document.getElementById("all");
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
    // dealer numofplayer
        let numofplayer=document.getElementById("numofplayer");
    // dealer totalbet
        let totalbet=document.getElementById("totalbet");
// player
    // player name
        let playerTitle1=document.getElementById("player-title1");
    // player avater
        let player_avatar1=document.getElementById("player-avatar1");
    // player id
        let player_id1=document.getElementById("player-id1");
    // player budget
        let player_budget1=document.getElementById("player-budget1");
    // player scores ingame
        let playerScore1=document.getElementById("player-score1");
    // player liscard ingame 
        let playerListcard1=document.getElementById("player-listcard1");
    // player betted amount
        let playerBettedamount1=document.getElementById("betted1");
//input
    // input bet
    let inputBet=document.getElementById("input-bet");
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
function getResult(){
    if(gameOver){
        if(playerWon){
            thisPlayer.budget+=thisPlayer.betAmount;
            Dealer.budget-=varinGame.betAmount;
            alert("player won");
            allButton.style.display='none';
            inputButton.style.display='none';
        }
        else{
            thisPlayer.budget-=thisPlayer.betAmount;
            Dealer.budget+=varinGame.betAmount;
            alert("Dealer won");
            allButton.style.display='none';
            inputButton.style.display='none';
        }
    }
}
function checkSystem(){
    varinGame.numOfplayer = Players.length;
    totalbet.innerText=varinGame.betAmount;
    if( gameStated){ // gameStatus = true
        gameStatus="Game Started...!";
    }
    else { // gameStatus = false
        gameStatus="Welcome to Dash Center";
    }
    Dealer.dealerScore=calculateScore(Dealer.dealerCards);
    thisPlayer.playerScore=calculateScore(thisPlayer.playerCards);
    /* */
    if(Dealer.dealerScore >= 21){
        gameOver =true ;
        gameStated =false;
    }
    else if(  thisPlayer.playerScore >= 21){
        gameOver =true ;
        playerWon =true ;
        gameStated =false;
    }
    getResult();
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
        dealerListcard.innerText = getMsgshowCard(Dealer.dealerCards);
        numofplayer.innerText = varinGame.numOfplayer;
        dealer_budget.innerText=Dealer.budget+" "+varinGame.currency;
        totalbet.innerText = varinGame.betAmount + varinGame.currency;
        // Update player
        player_budget1.innerText=thisPlayer.budget+" "+varinGame.currency;
        playerTitle1.innerText=thisPlayer.playerName;
        playerScore1.innerText="Score:"+thisPlayer.playerScore;
        playerListcard1.innerText=getMsgshowCard(thisPlayer.playerCards);
        // console.log(gameStated);
}
//
function updateGame(){
    checkSystem();
    gameDisplay();
    //console.log(Player.playerCards);
    // console.log(typeof(Dealer.dealerCards),typeof(getNextCard()));
}
//

//
function start_game(){
    if(gameStated == true){
        decks=createDeck();
        cardShuffle(decks);
        //Dealer.dealerCards=[getNextCard()  ];
        //thisPlayer.playerCards=[getNextCard()  ];
    }
}
function playerUpdateinformation(){
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
            player_id1.innerText="ID:"+thisPlayer.idIngame;
            player_budget1.innerText=thisPlayer.budget+" "+varinGame.currency;
            playerTitle1.innerText=thisPlayer.playerName;
}
function initNewgame(){
    // init flags
    gameOver =false ;
    playerWon =false;
    // init variables
    thisPlayer.playerCards =[];
    thisPlayer.playerScore =0;
    Dealer.dealerCards = [];
    Dealer.dealerScore = 0;
    varinGame.betAmount=0;
    thisPlayer.betAmount=0;
    // init button
    inputButton.style.display="block";
    allButton.style.display='block';
    // init show

    totalbet.innerText="0";
    playerBettedamount1.innerText="0";
    inputBet.value="0";
    playerUpdateinformation();
}
function initGame(){
    // init player
    // init dealer
    
    // data will take from server
    Dealer.idIngame="BJ120-1259-2134";
    Dealer.budget=2000000;
    // init player
    thisPlayer.budget=1000000; 
    thisPlayer.idIngame="BJ111-1259-1544";
    Players.push(thisPlayer);
    initNewgame();
    playerUpdateinformation();
}

function getBet(){
    let betFlag = false;
    let betLog = 0;
    inputButton.addEventListener("click",function(){
        thisPlayer.betAmount = Number(inputBet.value);
        if(thisPlayer.betAmount <= thisPlayer.budget){
            playerBettedamount1.innerText = thisPlayer.betAmount+varinGame.currency; 
            betLog = thisPlayer.betAmount;
            varinGame.betAmount += thisPlayer.betAmount;
            updateGame();
            // inputBet.value = "0";
            inputButton.style.display = 'none';
            betFlag = true;
            console.log("betted :"+inputBet.value);
            console.log("gameBet:"+varinGame.betAmount);
        }
        else{
             alert("not enough Money !!");
            // inputBet.value="0";
        }
    });
    allButton.addEventListener("click",function(){
        thisPlayer.betAmount=thisPlayer.budget;
        playerBettedamount1.innerText=thisPlayer.betAmount+varinGame.currency;
        if(betFlag==true){
            varinGame.betAmount += thisPlayer.betAmount;
            varinGame.betAmount-=betLog;
        }
        else{
            varinGame.betAmount += thisPlayer.betAmount;
        }
        updateGame();
        inputBet.value="0";
        inputButton.style.display='none';
        allButton.style.display='none';
    });
}

function Home(){
    // init status
    hitButton.style.display='none';
    stayButton.style.display='none';
    initGame();
    // inputcontainer.style.display="none";
    // player-input
    // init values and flags
    /* waiting for the event */
    newGamebutton.addEventListener("click",function(){
        gameStated=true;
        initNewgame();
        getBet();
        start_game();
        //  inputcontainer.style.display="inline";
        newGamebutton.style.display='none';
        hitButton.style.display='inline';
        stayButton.style.display='inline';
        // all.style.display="none";
        updateGame();
    });

}



function inGame(){
    stayButton.addEventListener("click",function(){
       // inputButton.style.display='block';
    });
    hitButton.addEventListener("click",function(){
        if(! gameOver && decks.length > 0 ){
            Dealer.dealerCards.push(getNextCard());
            thisPlayer.playerCards.push(getNextCard());
            updateGame();
        }
    });
}
Home();
inGame();


