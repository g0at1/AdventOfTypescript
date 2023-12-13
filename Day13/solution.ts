type DayCounter<
	Start extends number, End extends number> = 
	| Exclude<Enumerate<End>, Enumerate<Start>>
	| End;

type Enumerate<
	Count extends number, Counter extends readonly number[] = []
	> = Counter['length'] extends Count
	? Counter[number]
	: Enumerate<Count, [...Counter, Counter['length']]>;
