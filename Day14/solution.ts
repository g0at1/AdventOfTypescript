type DecipherNaughtyList<T extends string> = T extends `${infer Names}/${infer Rest}`
	? Names | DecipherNaughtyList<Rest>
	: T;
