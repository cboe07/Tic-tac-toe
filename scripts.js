// 1. Set up Board
// 2. User should be able to click ona. box and mark the square (with users mark)
// -- put on onclick directly on the square
// -- addEventListener
// 3. If its X turn, put X in, if 0's turn, then put 0
// 4.Now that we know whos turn it is, when markSqaure gets called 
// put their symbol in AND change whos turn it is
// 5. We need to check to see if someone won




//Initialize whosTurn at player 1 / x

// squareOptions = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];   //<<<<-----------NEW
// randomSquare = Math.floor(Math.random() * 8);




var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var completedSquares = [];
var winningCombos = [
	["A1", "B1", "C1"], //Row 1
	["A2", "B2", "C2"], //Row 2
	["A3", "B3", "C3"], //Row 3
	["A1", "A2", "A3"], //Column 1
	["B1", "B2", "B3"], //Coulmn 2
	["C1", "C2", "C3"], //Column 3
	["A1", "B2", "C3"], //Diag 1
	["A3", "B2", "C1"] //Diag 2
];

var gameOverBool = false;
var onePlayerGame = true;


var player1Wins = 0;
var player2Wins = 0;

var numberOfPlayersMessageElement = document.getElementById("numberOfPlayers");

function vsComputer(){
	onePlayerGame = true;
	numberOfPlayersMessageElement.innerHTML = "Player 1 vs Computer";
	console.log("One player");
}

function twoPlayer(){
	onePlayerGame = false;
	numberOfPlayersMessageElement.innerHTML = "Player 1 vs Player 2";
	console.log("Two players");
}





var squares = document.getElementsByClassName("square");
for(let i = 0; i < squares.length; i++){
	console.log(squares[i].className);
	// consile.log(sqaures[i]);
	squares[i].addEventListener("click", function(event){
		// console.log("User clicked on a square!");
		if(!gameOverBool){
			markSquare(this);
		}
	});
}


// - Create a markSqaure function
function markSquare(currentSquare){
	// console.log(currentSquare.id);
	var squareResult = ""
	var messageElement = document.getElementById("message");
	messageElement.innerHTML = squareResult;
	// console.log(currentSquare.innerHTML)
	if((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log("This square is taken")
		squareResult = "Sorry, this square is taken.";
	}else if(gameOverBool){
		squareResult = "Someone has won the game!";
	}else if(whosTurn == 1){
		currentSquare.innerHTML = "X"
		whosTurn = 2;
		player1Squares.push(currentSquare.id)
		completedSquares.push(currentSquare.id);
		checkWin(player1Squares, 1);
		if(onePlayerGame){
			computerMove(currentSquare);
		}
	}else{
		currentSquare.innerHTML = "O"
		whosTurn = 1;
		player2Squares.push(currentSquare.id)
		checkWin(player2Squares, 2);

	}
	


	// var messageElement = document.getElementById('message');
	// messageElement.innerHTML = squareResult;
	
}


function computerMove(currentSquare){
	// find a randon square
	// see if that sqaure is empty
	// if it is, send it to sqaure
	// if its not, keep looking
	var squareFound = false;
	while(!squareFound){
		var randomSquare = Math.floor(Math.random() * 8);
		if((squares[randomSquare].innerHTML != "X") && (squares[randomSquare].innerHTML != "O")){
			squareFound = true;
			markSquare(squares[randomSquare]);
			player2Squares.push(squares[randomSquare]);
			completedSquares.push(currentSquare.id);
			// console.log(compMoves);             //<<<<<<<-----------_NEW
		}else if (completedSquares.length == squares.length){
			break;
		}
	

	}
}

function checkWin(currentPlayersSquares, whoJustWent){
	// Outer Loop (winning combos)
	for(let i = 0; i < winningCombos.length; i++){
		// Inner Loop (Square inside a inning Combo)
		var squareCount = 0;
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			// Does the payer have this square?
			if(currentPlayersSquares.indexOf(winningSquare) > -1){
				// The index is greater than -1, whoch means the player has this square.
				// We don't care when it happened, we just care that it happened.
				squareCount++;
			}
		}
		// if squareCount is 3, the the user had all 3 j's in this i. Winning.
		if(squareCount == 3){
			console.log("Player " + whoJustWent + " won the game!");
			// Stop checking i's, the game is over....
			gameOver(whoJustWent,winningCombos[i]);
			// break;
		}
	}
}

function gameOver(whoJustWon,winningCombo){
	var messageElement = document.getElementById('message');
	var message = "Congratulations to player " + whoJustWon + ". You won with " + winningCombo;
	messageElement.innerHTML = message;
	for(let i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	gameOverBool = true;
}

function startNewGame(){
    location.reload(true);
}





