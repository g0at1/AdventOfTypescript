type FindSanta<T, Index extends number[] = []> = T extends [infer First, ...infer Rest]
  ? First extends '🎅🏼'
    ? Index['length']
    : FindSanta<Rest, [...Index, 0]>
  : never;
