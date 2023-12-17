type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WinCondition = {
	'👊🏻': '✌🏽';
	'✌🏽': '🖐🏾';
	'🖐🏾': '👊🏻';
}

type WhoWins<P1 extends RockPaperScissors, P2 extends RockPaperScissors> = P1 extends P2 
	? 'draw'
	: WinCondition[P1] extends P2 
		? 'lose'
		: 'win';
