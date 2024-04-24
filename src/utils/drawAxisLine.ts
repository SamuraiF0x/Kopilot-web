export default function drawLine(
	ctx: CanvasRenderingContext2D,
	color: string,
	startPoint: number[],
	endPoint: number[],
) {
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(startPoint[0], startPoint[1]);
	ctx.lineTo(endPoint[0], endPoint[1]);
	ctx.closePath();
	ctx.stroke();
}
