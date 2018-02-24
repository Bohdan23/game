var dataBase = 1,
	flag = 0, // click was or not
	gamelevel = 1;

function gameStatus(text) {
	$('.game-status').text(text);
}
function gameLevel(text) {
	$('.game-level').text('Рівень №' + text);
}

$('.box-wrapper').on('click', function() {
	var $$ = $(this);
	var index = $$.data('index');
	$$.addClass('rotated');

	if (flag == 0) {
		flag = 1;
		dataBase = index;
		gameStatus(' ');
	} else if (flag == 1 && dataBase == index) {
		$('.box-wrapper[data-index='+dataBase+']').toggle();
		gameStatus('Рівень пройдено');
		gamelevel = gamelevel + 1;
		flag = 0;
		gameLevel(gamelevel);
		if (gamelevel == 5) {
			gameStatus('ВИ ПЕРЕМОЖЕЦЬ!) ЗАБЕРІТЬ ВАШІ ПРИЗОВІ НА МАРКА ВОВЧКА 16!!!!!');
			gameLevel('');
		}
	} else if (flag == 1 && dataBase != index) {
		$('.box-wrapper.rotated').removeClass('rotated');
		gameStatus('Ви програли! Все починайте заново!');
		flag = 0;
		location.reload();
	}

});