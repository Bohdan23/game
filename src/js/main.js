$(document).ready(function() {
	var boxObj = {
		color: null,
		firstIndex: null,
		secondIndex: null,
		thirdIndex: null,
		flag: 0,
		level: 1
	}

	$('input[type=checkbox]').on('change', function() {
		$('.box-wrapper').toggleClass('hint');
	});

	$('.game-level').text('Рівень №'+boxObj.level);

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
				$('.game-status').text('Не клікайте будь ласка по одному і тому ж квадраті!!!');
			} else if (index != boxObj.firstIndex && color != boxObj.color) {
				boxObj.flag = 2;
				boxObj.secondIndex = index;
				$('.game-status').text('Вам не пощастило! Але у Вас є ще ОДИН шанс!)');
				$$.addClass('active');
			} else if (index != boxObj.firstIndex && color == boxObj.color) {
				$('.game-status').text('Ви перейшли до наступного рівня!');
				boxObj.level = boxObj.level + 1;
				$('.game-level').text('Рівень №'+boxObj.level);
				$('.box-wrapper.'+boxObj.color).addClass('hidden');
				boxObj.flag = 0;
				boxObj.firstIndex = null;
				boxObj.secondIndex = null;
				boxObj.color = null;
			}
		} else if (boxObj.flag == 2) {
			// if third click
			if (index == boxObj.firstIndex || index == boxObj.secondIndex) {
				$('.game-status').text('Не клікайте будь ласка по одному і тому ж квадраті!!!');
			} else if (index != boxObj.firstIndex && index != boxObj.secondIndex && color != boxObj.color) {
				boxObj.flag = 0;
				boxObj.firstIndex = null;
				boxObj.secondIndex = null;
				boxObj.color = null;
				$('.game-status').text('Ви програли!)');
				$('.box-wrapper').removeClass('active rotated clicked hidden');
			} else if (index != boxObj.firstIndex && index != boxObj.secondIndex && color == boxObj.color) {
				$('.game-status').text('Ви перейшли до наступного рівня!');
				boxObj.level = boxObj.level + 1;
				$('.game-level').text('Рівень №'+boxObj.level);
				$('.box-wrapper.' + boxObj.color).addClass('hidden');
				$('.box-wrapper').removeClass('active rotated clicked');
				boxObj.flag = 0;
				boxObj.firstIndex = null;
				boxObj.secondIndex = null;
				boxObj.color = null;
			}
		}

		if (boxObj.level == 5) {
			$('.game-status').text('СОЛЬЧИК ВИГРАВ!!!!!)))');
		}
	});
});