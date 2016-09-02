
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

	$('li > .new').on('click', newGame);
	$('form').on('submit', function(evt) {
		//console.log('gameOver: ', gameOver.value());
		evt.preventDefault();
		if (!gameOver.value()) {
			var val = validateGuess($('#userGuess').val());
			if (val) {
				guessCounter.increment();
				$('span#count').text(guessCounter.value());
				var prevGuess = Number($('#guessList li:last').text());
				var result = evalGuess(randNum.value(), val, prevGuess);
				// console.log('guessCounter: ', guessCounter.value());
				console.log('randNum: ', randNum.value());
				// console.log('gameOver: ', gameOver.value());
				// console.log('result.f :', result.f);
				// console.log('result.g :', result.g);

				$('h2#feedback').text(result.f);
				if (result.g) {
					gameOver.yes();
				}
				$('#guessList').append('<li>' + val + '</li>');
				$('input#userGuess').val('');
			}
		}
		// prevent submit page reload
		return false;
	});

	function newGame() {
		resetUI();
		guessCounter.reset();
		gameOver.reset();
		randNum.reset();
	}

	function resetUI() {
		$('h2#feedback').text('Make your Guess!');
		$('span#count').text('0');
		$('ul#guessList').children().remove();
		$('input#userGuess').val('');
	}

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function evalGuess(randNum, curGuess, prevGuess){
		var curDiff = Math.abs(curGuess - randNum);
		var prevDiff = 0;
		if (prevGuess != 0){
			prevDiff = Math.abs(prevGuess - randNum);
		}
		var feedback = '';
		var gameWon = false;
		if (curDiff == 0){
			feedback = 'You Won!';
			gameWon = true;
		} else if (curDiff < 10) {
				feedback = (curDiff > prevDiff || prevDiff > 10) ? 'Hot' : 'Hotter';
		} else if (curDiff < 20) {
				feedback = (curDiff > prevDiff || prevDiff > 20) ? 'Warm' : 'Warmer';
		} else if (curDiff < 50 || prevDiff > 50) {
				feedback = (curDiff < prevDiff) ? 'Cold' : 'Colder';
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
