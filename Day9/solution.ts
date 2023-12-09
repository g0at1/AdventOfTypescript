type Reverse<Str extends string> = Str extends `${infer FirstChar}${infer Rest}` ? `${Reverse<Rest>}${FirstChar}` : Str;
