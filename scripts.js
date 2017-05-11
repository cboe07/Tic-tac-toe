// 1. Set up Board
// 2. User should be able to click ona. box and mark the square (with users mark)
// -- put on onclick directly on the square
// -- addEventListener
// 3. If its X turn, put X in, if 0's turn, then put 0
//4.Now that we know whos turn it is, when markSqaure gets called 
// put their symbol in AND change whos turn it is
//5. We need to check to see if someone won




//Initialize whosTurn at player 1 / x
var whosTurn = 1;

var squares = document.getElementsByClassName('square');
for(let i = 0; i < squares.length; i++){
	// consile.log(sqaures[i]);
	squares[i].addEventListener("click", function(){
		console.log("User clicked ona square!");
		markSquare(this)
	});
}

// document.getElementsById("A1");
// A1.addEventListener('click', function(){
// 	marksqaure
// })
// - Create a marksqaure function


// - Create a markSqaure function
function markSquare(currentSquare){
	var squareResult = ""
	if((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log("This square is taken")
		
		squareResult = "Sorry, this square is taken."
	}else if(whosTurn == 1){
		currentSquare.innerHTML = "X"
		whosTurn = 2;
	}else{
		currentSquare.innerHTML = "O"
		whosTurn = 1;

	};
	var messageElement = document.getElementById('message');
	messageElement.innerHTML = squareResult;
	
}



