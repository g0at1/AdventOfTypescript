type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";
type Board = Connect4Cell[][];
type Game = {
  board: Connect4Cell[][];
  state: Connect4State;
};

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
];

type AddToEnd<
  Arr extends any[],
  Chip extends Connect4Chips,
  $acc extends any[] = [],
> = Arr[0] extends Connect4Chips
  ? Arr
  : Arr extends [infer Curr, infer Next, ...infer Tail]
    ? Next extends Connect4Chips
      ? [...$acc, Chip, Next, ...Tail]
      : AddToEnd<[Next, ...Tail], Chip, ["  ", ...$acc]>
    : [...$acc, Chip];

type ReplaceAtWith<
  From extends any[],
  With extends any,
  Index extends number,
  $acc extends any[] = [],
> = From extends [infer A, ...infer Rest]
  ? $acc["length"] extends Index
    ? [...$acc, With, ...Rest]
    : ReplaceAtWith<Rest, With, Index, [...$acc, A]>
  : From;

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

type ToDiagonals<Board extends Connect4Cell[][]> = [
  [Board[0][0], Board[1][1], Board[2][2], Board[3][3], Board[4][4], Board[5][5]],
  [Board[0][1], Board[1][2], Board[2][3], Board[3][4], Board[4][5], Board[5][6]],
  [Board[0][2], Board[1][3], Board[2][4], Board[3][5], Board[4][6]],
  [Board[0][3], Board[1][4], Board[2][5], Board[3][6]],
  [Board[0][3], Board[1][2], Board[2][1], Board[3][0]],
  [Board[0][4], Board[1][3], Board[2][2], Board[3][1], Board[4][0]],
  [Board[0][5], Board[1][4], Board[2][3], Board[3][2], Board[4][1], Board[5][0]],
  [Board[0][6], Board[1][5], Board[2][4], Board[3][3], Board[4][2], Board[5][1]],
];

type FlipToColumns<Board extends Connect4Cell[][]> = [
  [Board[0][0], Board[1][0], Board[2][0], Board[3][0], Board[4][0], Board[5][0]],
  [Board[0][1], Board[1][1], Board[2][1], Board[3][1], Board[4][1], Board[5][1]],
  [Board[0][2], Board[1][2], Board[2][2], Board[3][2], Board[4][2], Board[5][2]],
  [Board[0][3], Board[1][3], Board[2][3], Board[3][3], Board[4][3], Board[5][3]],
  [Board[0][4], Board[1][4], Board[2][4], Board[3][4], Board[4][4], Board[5][4]],
  [Board[0][5], Board[1][5], Board[2][5], Board[3][5], Board[4][5], Board[5][5]],
  [Board[0][6], Board[1][6], Board[2][6], Board[3][6], Board[4][6], Board[5][6]],
];

type FlipToRows<Board extends Connect4Cell[][]> = [
  [Board[0][0], Board[1][0], Board[2][0], Board[3][0], Board[4][0], Board[5][0], Board[6][0]],
  [Board[0][1], Board[1][1], Board[2][1], Board[3][1], Board[4][1], Board[5][1], Board[6][1]],
  [Board[0][2], Board[1][2], Board[2][2], Board[3][2], Board[4][2], Board[5][2], Board[6][2]],
  [Board[0][3], Board[1][3], Board[2][3], Board[3][3], Board[4][3], Board[5][3], Board[6][3]],
  [Board[0][4], Board[1][4], Board[2][4], Board[3][4], Board[4][4], Board[5][4], Board[6][4]],
  [Board[0][5], Board[1][5], Board[2][5], Board[3][5], Board[4][5], Board[5][5], Board[6][5]],
];

type WinCondition<Lines extends any[], Chip extends Connect4Chips> = Lines extends [
  infer Line extends any[],
  ...infer Rest,
]
  ? Contains4Successive<Line, Chip> extends true
    ? true
    : WinCondition<Rest, Chip>
  : false;

type Contains4Successive<Line extends any[], Chip extends Connect4Chips> = Line extends [
  infer A extends Connect4Cell,
  infer B extends Connect4Cell,
  infer C extends Connect4Cell,
  infer D extends Connect4Cell,
  ...infer Tail,
]
  ? [A, B, C, D] extends [Chip, Chip, Chip, Chip]
    ? true
    : Contains4Successive<[B, C, D, ...Tail], Chip>
  : false;

type FullBoard<B extends Connect4Cell[][]> = B[number][number] extends Connect4Chips ? true : false;

type DeriveGameState<G> = G extends {
  state: infer State;
  board: infer CurrentBoard extends Connect4Cell[][];
}
  ? State extends Connect4Chips
    ? WinCondition<CurrentBoard, State> extends true
      ? {
          state: `${State} Won`;
          board: CurrentBoard;
        }
      : WinCondition<FlipToColumns<CurrentBoard>, State> extends true
        ? {
            state: `${State} Won`;
            board: CurrentBoard;
          }
        : WinCondition<ToDiagonals<CurrentBoard>, State> extends true
          ? {
              state: `${State} Won`;
              board: CurrentBoard;
            }
          : FullBoard<CurrentBoard> extends true
            ? {
                state: `Draw`;
                board: CurrentBoard;
              }
            : {
                state: Exclude<Connect4Chips, State>;
                board: CurrentBoard;
              }
    : G
  : G;

type Connect4<G extends Game, Col extends number> = G["state"] extends Connect4Chips
  ? DeriveGameState<{
      board: [
        ...FlipToRows<
          ReplaceAtWith<
            FlipToColumns<G["board"]>,
            AddToEnd<FlipToColumns<G["board"]>[Col], G["state"]>,
            Col
          >
        >,
      ];
      state: G["state"];
    }>
  : G;
