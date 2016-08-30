
$(document).ready(function(){

	var randNum = (function() {
		var num = getRandomIntInclusive(1,100);
		return {
			value: fuction() {
				return num;
			}
		};
	})();

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var guessCounter = (function() {
		var privateCounter = 0;
		function changeBy(val) {
			privateCounter += val;
		}
		return {
			increment: function() {
				changeBy(1);
			},
			value: function() {
				return privateCounter;
			}
		};
	})();

	function evalGuess(randNum, guessNum){
		var diffNum = Math.abs(guessNum - randNum);
		var report = '';
		if (diffNum == 0){
			report = 'Got it!';
		} else if (diffNum < 10) {
			report = 'Burning up!';
		} else if (diffNum < 20) {
			report = 'Warm';
		} else if (diffNum < 50) {
			report = 'Cool';
		} else {
			report = 'Icy';
		}
		return report;
	}

	function validateGuess(guessNum){
		if(/^[1-9][0-9]?$|^100$/.test(guessNum)) {
			return Number(guessNum);
		}
		return NaN;
	}

//newGame
//generate RandomNumber save to global
//increment guess count
//add guess to ul
//evaluate guess
//

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});
