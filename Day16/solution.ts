type AddOne<Value extends number, Acc extends 0[] = []> =
	Acc['length'] extends Value
		? [...Acc, 0]['length']
		: AddOne<Value, [...Acc, 0]>

type FindSanta<
	Map extends string[][], Row extends number = 0, Col extends number = 0> = 
		Map[Row][Col] extends '🎅🏼' 
			? [Row, Col]
			: Map[Row]['length'] extends Col
				? FindSanta<Map, AddOne<Row>, 0>
				: FindSanta<Map, Row, AddOne<Col>>;
