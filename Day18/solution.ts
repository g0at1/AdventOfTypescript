type Count<Sack extends unknown[], Toy, Acc extends Toy[] = []> =
	Sack extends [infer Head, ...infer Tail]
	? Head extends Toy 
		? Count<Tail, Toy, [...Acc, Toy]>
		: Count<Tail, Toy, Acc> 
	: Acc['length'];
