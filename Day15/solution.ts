type BoxToys<
	TToy extends string, 
	TNumber extends number,
	TAccum extends string[] = [TToy],
> = TNumber extends TAccum['length']
	? TAccum 
	: BoxToys<TToy, TNumber, [...TAccum, TToy]>;
