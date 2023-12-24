type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";
type Coordinates = [number, number];

type ReplaceInArr<Arr extends any[], Index extends number, With> = {
  [Key in keyof Arr]: Key extends `${Index}` ? With : Arr[Key];
};

type ReplaceInMatrix<M extends MazeMatrix, Coords extends [number, number], With> = {
  [Key in keyof M]: Key extends `${Coords[0]}` ? ReplaceInArr<M[Key], Coords[1], With> : M[Key];
};

type FindIndexOf<Arr extends any[], Item, $acc extends any[] = []> = Arr extends [
  infer First,
  ...infer Rest,
]
  ? First extends Item
    ? $acc["length"]
    : FindIndexOf<Rest, Item, [any, ...$acc]>
  : undefined;

type FindSantaCoords<M extends MazeMatrix, $acc extends any[] = []> = M extends [
  infer Line extends any[],
  ...infer Rest extends any[][],
]
  ? FindIndexOf<Line, "🎅"> extends number
    ? [$acc["length"], FindIndexOf<Line, "🎅">]
    : FindSantaCoords<Rest, [any, ...$acc]>
  : [0, 0];

type PlusOne<I extends number, $acc extends any[] = []> = $acc["length"] extends I
  ? [any, ...$acc]["length"]
  : PlusOne<I, [any, ...$acc]>;

type MinusOne<I extends number, $acc extends any[] = []> = I extends 1
  ? 0
  : I extends 0
    ? 0
    : [any, ...$acc]["length"] extends I
      ? $acc["length"]
      : MinusOne<I, [any, ...$acc]>;

type NewCoords<D extends Directions, C extends Coordinates, M extends MazeMatrix> = D extends "up"
  ? C[0] extends 0
    ? ["OOB", C[1]]
    : [MinusOne<C[0]>, C[1]]
  : D extends "down"
    ? PlusOne<C[0]> extends M["length"]
      ? ["OOB", C[1]]
      : [PlusOne<C[0]>, C[1]]
    : D extends "left"
      ? C[1] extends 0
        ? [C[0], "OOB"]
        : [C[0], MinusOne<C[1]>]
      : D extends "right"
        ? PlusOne<C[1]> extends M[0]["length"]
          ? [C[0], "OOB"]
          : [C[0], PlusOne<C[1]>]
        : C;

type TurnMazeIntoCookies<M extends MazeMatrix> = {
  [Key in keyof M]: TurnLineIntoCookies<M[Key]>;
};
type TurnLineIntoCookies<Arr extends any[]> = {
  [Key in keyof Arr]: "🍪";
};

type Move<M extends MazeMatrix, D extends Directions> = NewCoords<
  D,
  FindSantaCoords<M>,
  M
> extends [infer X extends number, infer Y extends number]
  ? M[X][Y] extends "  "
    ? ReplaceInMatrix<ReplaceInMatrix<M, FindSantaCoords<M>, "  ">, [X, Y], "🎅">
    : M
  : TurnMazeIntoCookies<M>;
