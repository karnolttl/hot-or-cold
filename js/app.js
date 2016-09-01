
$(document).ready(function(){

		var guessCounter = (function() {
			var privateCounter = 0;
			function changeBy(val) {
				privateCounter += val;
			}
			return {
				increment: function() {
					changeBy(1);
				},
				reset: function() {
					privateCounter = 0;
				},
				value: function() {
					return privateCounter;
				}
			};
		})();

		var gameOver = (function() {
			var g = false;
			return {
				reset: function() {
					g = false;
				},
				yes: function() {
					g = true;
				},
				value: function() {
					return g;
				}
			};
		})();

		var randNum = (function() {
			var num = getRandomIntInclusive(1,100);
			return {
				reset: function() {
					num = getRandomIntInclusive(1,100);
				},
				value: function() {
					return num;
				}
			};
		})();

	$('.new').on('click', newGame);
	$('#guessButton').on('click', function() {
		console.log('gameOver: ', gameOver.value());
		if (!gameOver.value()) {
			var val = validateGuess($('#userGuess').val());
			if (val) {
				$('span#count').text(guessCounter.increment());
				var result = evalGuess(randNum, val);
				//console.log('result.f :', result.f);
				//console.log('result.g :', result.g);

				$('h2#feedback').text('love');
				if (result.g) {
					gameOver.yes();
				}
			}
		}
	});

	function newGame() {
		resetUI();

		guessCounter.reset();
		gameOver.reset();
		randNum.reset();

		//console.log('guessCounter: ', guessCounter.value());
		//console.log('randNum: ', randNum.value());
		//console.log('gameOver: ', gameOver.value());
	}

	function resetUI() {
		$('h2#feedback').text('Make your Guess!');
		$('span#count').text('0');
		$('ul#guessList').children().remove();
	}

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function evalGuess(randNum, guessNum){
		var diffNum = Math.abs(guessNum - randNum);
		var feedback = '';
		var gameWon = false;
		if (diffNum == 0){
			feedback = 'You Won!';
			gameWon = true;
		} else if (diffNum < 10) {
			feedback = 'Burning Up!';
		} else if (diffNum < 20) {
			feedback = 'Warm';
		} else if (diffNum < 50) {
			feedback = 'Cold';
		} else {
			feedback = 'Icy';
		}
		return {f : feedback, g : gameWon};
	}

	function validateGuess(guessNum){
		if(/^[1-9][0-9]?$|^100$/.test(guessNum)) {
			return Number(guessNum);
		}
		return NaN;
	}

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});
