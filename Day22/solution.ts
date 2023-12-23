/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type Validate<Board extends Reindeer[][][]> = And<
  [ValidateRows<Board>, ValidateColumns<Board>, ValidateRegions<Board>]
>;

type And<Predicates extends boolean[]> = Predicates extends [
  infer Head,
  ...infer Tail extends boolean[]
]
  ? Head extends true
    ? And<Tail>
    : false
  : true;

type ValidateRows<Board extends Reindeer[][][]> = And<
  [
    NoRepeats<GetRow<Board, 0>>,
    NoRepeats<GetRow<Board, 1>>,
    NoRepeats<GetRow<Board, 2>>,
    NoRepeats<GetRow<Board, 3>>,
    NoRepeats<GetRow<Board, 4>>,
    NoRepeats<GetRow<Board, 5>>,
    NoRepeats<GetRow<Board, 6>>,
    NoRepeats<GetRow<Board, 7>>,
    NoRepeats<GetRow<Board, 8>>
  ]
>;

type ValidateColumns<Board extends Reindeer[][][]> = And<
  [
    NoRepeats<GetColumn<Board, 0, 0>>,
    NoRepeats<GetColumn<Board, 0, 1>>,
    NoRepeats<GetColumn<Board, 0, 2>>,
    NoRepeats<GetColumn<Board, 1, 0>>,
    NoRepeats<GetColumn<Board, 1, 1>>,
    NoRepeats<GetColumn<Board, 1, 2>>,
    NoRepeats<GetColumn<Board, 2, 0>>,
    NoRepeats<GetColumn<Board, 2, 1>>,
    NoRepeats<GetColumn<Board, 2, 2>>
  ]
>;

type ValidateRegions<Board extends Reindeer[][][]> = And<
  [
    NoRepeats<[...Board[0][0], ...Board[1][0], ...Board[2][0]]>,
    NoRepeats<[...Board[0][1], ...Board[1][1], ...Board[2][1]]>,
    NoRepeats<[...Board[0][2], ...Board[1][2], ...Board[2][2]]>,
    NoRepeats<[...Board[3][0], ...Board[4][0], ...Board[5][0]]>,
    NoRepeats<[...Board[3][1], ...Board[4][1], ...Board[5][1]]>,
    NoRepeats<[...Board[3][2], ...Board[4][2], ...Board[5][2]]>,
    NoRepeats<[...Board[6][0], ...Board[7][0], ...Board[8][0]]>,
    NoRepeats<[...Board[6][1], ...Board[7][1], ...Board[8][1]]>,
    NoRepeats<[...Board[6][2], ...Board[7][2], ...Board[8][2]]>
  ]
>;

type NoRepeats<List extends Reindeer[]> = And<
  [
    NoRepeatItem<List, Dasher>,
    NoRepeatItem<List, Dancer>,
    NoRepeatItem<List, Prancer>,
    NoRepeatItem<List, Vixen>,
    NoRepeatItem<List, Comet>,
    NoRepeatItem<List, Cupid>,
    NoRepeatItem<List, Donner>,
    NoRepeatItem<List, Blitzen>,
    NoRepeatItem<List, Rudolph>
  ]
>;

type NoRepeatItem<List extends Reindeer[], Item extends Reindeer> = Filter<
  List,
  Item
>["length"] extends 8
  ? true
  : false;

type Filter<List, Item> = List extends [infer Head, ...infer Tail]
  ? Head extends Item
    ? Filter<Tail, Item>
    : [Head, ...Filter<Tail, Item>]
  : [];

type GetRow<Board extends Reindeer[][][], RowIndex extends number> = [
  ...Board[RowIndex][0],
  ...Board[RowIndex][1],
  ...Board[RowIndex][2]
];

type GetColumn<
  Board extends Reindeer[][][],
  GroupIndex extends number,
  ColumnIndex extends number
> = [
  Board[0][GroupIndex][ColumnIndex],
  Board[1][GroupIndex][ColumnIndex],
  Board[2][GroupIndex][ColumnIndex],
  Board[3][GroupIndex][ColumnIndex],
  Board[4][GroupIndex][ColumnIndex],
  Board[5][GroupIndex][ColumnIndex],
  Board[6][GroupIndex][ColumnIndex],
  Board[7][GroupIndex][ColumnIndex],
  Board[8][GroupIndex][ColumnIndex]
];
