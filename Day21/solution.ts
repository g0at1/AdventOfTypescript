type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};
type YPositionToIndex<T extends TicTacToeYPositions> = {
	top: 0;
	middle: 1;
	bottom: 2;
}[T];
type XPositionToIndex<T extends TicTacToeXPositions> = {
	left: 0;
	center: 1;
	right: 2;
}[T];

type BoardIndexes<T extends TicTacToePositions> = T extends `${infer Y extends
	TicTacToeYPositions}-${infer X extends TicTacToeXPositions}`
	? { y: YPositionToIndex<Y>; x: XPositionToIndex<X> }
	: never;

type ReplaceAt<T extends any[], Item, Index extends number, Agg extends any[] = []> = T extends [
	infer Head,
	...infer Tail,
]
	? Agg["length"] extends Index
		? ReplaceAt<Tail, Item, Index, [...Agg, Item]>
		: ReplaceAt<Tail, Item, Index, [...Agg, Head]>
	: Agg;

type EmptyBoard = [
  ["  ", "  ", "  "], 
  ["  ", "  ", "  "], 
  ["  ", "  ", "  "]
];

type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type IsUnion<T, U extends T = T> = T extends unknown ? ([U] extends [T] ? false : true) : false;
type CellIsNotEmpty<Cell extends string> = Cell extends TicTacToeEmptyCell ? false : true;
type IsInvalidMove<T extends TicTactToeBoard, Pos extends TicTacToePositions> = CellIsNotEmpty<
	T[BoardIndexes<Pos>["y"]][BoardIndexes<Pos>["x"]]
>;

type CheckRow<T extends TicTactToeBoard, Index extends number> = IsUnion<
	T[Index][number]
> extends true
	? false
	: CellIsNotEmpty<T[Index][0]>;

type CheckColumn<T extends TicTactToeBoard, Index extends number> = IsUnion<
	T[number][Index]
> extends true
	? false
	: CellIsNotEmpty<T[0][Index]>;

type CheckDiagonal0_2<T extends TicTactToeBoard> = IsUnion<T[0][2] | T[1][1] | T[2][0]> extends true
	? false
	: CellIsNotEmpty<T[0][2]>;
type CheckDiagonal2_0<T extends TicTactToeBoard> = IsUnion<T[2][0] | T[1][1] | T[0][2]> extends true
	? false
	: CellIsNotEmpty<T[0][2]>;
type Indexes = 0 | 1 | 2;

type CheckWin<T extends TicTactToeBoard> = [
	| CheckRow<T, 0>
	| CheckRow<T, 1>
	| CheckRow<T, 2>
	| CheckColumn<T, 0>
	| CheckColumn<T, 1>
	| CheckColumn<T, 2>
	| CheckDiagonal2_0<T>
	| CheckDiagonal0_2<T>,
] extends [false]
	? false
	: true;

type CheckDraw<T extends TicTactToeBoard> = [T[number][number] & TicTacToeEmptyCell] extends [never]
	? true
	: false;

type NextGameState<
	T extends TicTactToeBoard,
	CurrentState extends TicTacToeState,
> = CurrentState extends TicTacToeEndState
	? CurrentState
	: CheckDraw<T> extends true
		? "Draw"
		: CheckWin<T> extends true
			? CurrentState extends "❌"
				? "❌ Won"
				: "⭕ Won"
			: CurrentState extends "❌"
				? "⭕"
				: "❌";

type NextBoardState<T extends TicTacToeGame, Pos extends TicTacToePositions> = ReplaceAt<
	T["board"],
	ReplaceAt<T["board"][BoardIndexes<Pos>["y"]], T["state"], BoardIndexes<Pos>["x"]>,
	BoardIndexes<Pos>["y"]
>;

type TicTacToe<
	T extends TicTacToeGame,
	Pos extends TicTacToePositions,
> = T["state"] extends TicTacToeEndState
	? T
	: IsInvalidMove<T["board"], Pos> extends true
		? T
		: {
				board: NextBoardState<T, Pos>;
				state: NextGameState<NextBoardState<T, Pos>, T["state"]>;
			};
