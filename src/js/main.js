$(document).ready(function() {
	var boxObj = {
		color: null,
		firstIndex: null,
		secondIndex: null,
		flag: 0,
		level: 1,
		gameOver: false,
		win: false,
		hidden: 0
	};
	var boxesLength = $('.box-wrapper').length;

	function message(text) {
	    new Noty({
		    text: text,
		    layout: "topRight",
        	theme: "mint",
			closeWith: ["click", "button"],
        	animation: {
	            open: "noty_effects_open",
	            close: "noty_effects_close"
        	},
        	timeout: 4000,
		}).show();
	}

	function reset() {
		boxObj.flag = 0;
		boxObj.firstIndex = null;
		boxObj.secondIndex = null;
		boxObj.color = null;
	}

	$('input[type=checkbox]').on('change', function() {
		$('.box-wrapper').toggleClass('hint');
	});

	$('.start').on('click', function() {
		reset();
		boxObj.level = 1;
		boxObj.gameOver = false;
		$('.game-level').text('Level '+boxObj.level);
		$('.box-wrapper').removeClass('active rotated hidden');
		if (boxObj.gameOver == false){
			$('.modal-wrapper').removeClass('active');
		}
	});


	$('.box-wrapper').on('click', function() {
		var $$ = $(this);
		$$.addClass('rotated');
		var index = $$.data('index');
		var color = $$.data('color');

		if (boxObj.flag == 0) {
			// if first click
			boxObj.color = color;
			boxObj.firstIndex = index;
			boxObj.flag = 1;
			$$.addClass('active');
		} else if (boxObj.flag == 1) {
			// if second click
			if (index == boxObj.firstIndex) {

				message('Не клікайте по відкритому квадраті!');

			} else if (index != boxObj.firstIndex && color != boxObj.color) {

				boxObj.flag = 2;
				boxObj.secondIndex = index;
				message('Вам не пощастило! Але у Вас є ще ОДИН шанс!');
				$$.addClass('active');

			} else if (index != boxObj.firstIndex && color == boxObj.color) {

				message('Ви перейшли до наступного рівня!');
				boxObj.level = boxObj.level + 1;
				$('.game-level').text('Level '+boxObj.level);
				$('.box-wrapper.'+boxObj.color).addClass('hidden');
				reset();
				boxObj.hidden = boxObj.hidden + 2;
				
			}
		} else if (boxObj.flag == 2) {
			// if third click
			if (index == boxObj.firstIndex || index == boxObj.secondIndex) {

				message('Не клікайте по відкритому квадраті!');

			} else if (index != boxObj.firstIndex && index != boxObj.secondIndex && color != boxObj.color) {

				boxObj.gameOver = true;

			} else if (index != boxObj.firstIndex && index != boxObj.secondIndex && color == boxObj.color) {

				message('Ви перейшли до наступного рівня!');
				boxObj.level = boxObj.level + 1;
				$('.game-level').text('Level '+boxObj.level);
				$('.box-wrapper.' + boxObj.color).addClass('hidden');
				$('.box-wrapper').removeClass('active rotated');
				reset();
				boxObj.hidden = boxObj.hidden + 2;
				
			}
		}

		if (boxObj.hidden == boxesLength) {
			$('.modal-wrapper').addClass('active');
			$('.modal-wrapper').find('p').text('WINNER');
			$('.game-level').text('');
		}

		if (boxObj.gameOver == true) {
			$('.modal-wrapper').addClass('active');
		} 
	});
});