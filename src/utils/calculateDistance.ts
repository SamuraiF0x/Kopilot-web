interface Point {
	x: number;
	y: number;
}

export default function calculateDistance(point1: Point, point2: Point) {
	let distance = 0;
	distance = Math.hypot(Math.abs(point1?.x - point2?.x), Math.abs(point1?.y - point2?.y));

	return distance;
}
