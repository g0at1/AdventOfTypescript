type Items = [
	'🛹', '🚲', '🛴', '🏄',
	'🛹', '🚲', '🛴', '🏄',
	'🛹', '🚲', '🛴', '🏄',
	'🛹', '🚲', '🛴', '🏄',
	'🛹', '🚲', '🛴', '🏄',
	'🛹', '🚲', '🛴', '🏄'
]

type CountToItem<
		Count,
		Item extends unknown,
		$acc extends Item[] = []> =
	Count extends $acc['length']
		? $acc 
		: CountToItem<Count, Item, [Item, ...$acc]>

type Rebuild<
		ToyCounts extends any[],
		$acc extends any[] = [],
		$next extends any[] = Items> =
	ToyCounts extends [infer Head, ...infer Tail]
		? $next extends [infer Next, ...infer Remain]
			? Rebuild<Tail, [...$acc, ...CountToItem<Head, Next>], Remain>
			: never 
		: $acc;
