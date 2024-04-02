import { Face } from "@tensorflow-models/face-landmarks-detection";
import { tokens } from "../../tamagui.config";
import { TRIANGULATION } from "./triangulation";

const drawPath = (
	ctx: CanvasRenderingContext2D,
	points: { x: number; y: number }[],
	closePath: boolean,
	tension: number,
) => {
	const region = new Path2D();

	region.moveTo(points[0].x, points[0].y);

	for (let i = 1; i < points.length; i++) {
		if (tension === 0) region.lineTo(points[i].x, points[i].y);
	}

	// if (points.length > 2) {
	// 	const lastIndex = points.length - 1;
	// 	region.bezierCurveTo(
	// 		tension / 2 + points[lastIndex - 2].x,
	// 		tension / 2 + points[lastIndex - 2].y,
	// 		tension + points[lastIndex - 1].x,
	// 		tension + points[lastIndex - 1].y,
	// 		points[lastIndex].x,
	// 		points[lastIndex].y,
	// 	);
	// }

	if (points.length > 1) {
		const lastIndex = points.length - 1;
		region.bezierCurveTo(
			tension / 2 + points[lastIndex - 1].x,
			tension / 2 + points[lastIndex - 1].y,
			tension + points[lastIndex - 1].x,
			tension + points[lastIndex - 1].y,
			points[lastIndex].x,
			points[lastIndex].y,
		);
	}

	if (closePath) region.closePath();

	ctx.strokeStyle = tokens.color.gray.val;
	ctx.lineWidth = 1;
	ctx.stroke(region);
};

function drawAndFillCircle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.strokeStyle = tokens.color.gray.val;
	ctx.lineWidth = size - 1;
	ctx.stroke();
	ctx.fillStyle = color;
	ctx.fill();
}

export const drawMesh = (prediction: Face, ctx: CanvasRenderingContext2D, tension: number) => {
	if (!prediction) return;

	const keyPoints = prediction.keypoints;

	if (!keyPoints) return;

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	for (let i = 0; i < TRIANGULATION.length / 3; i++) {
		const points = [TRIANGULATION[i * 3], TRIANGULATION[i * 3 + 1], TRIANGULATION[i * 3 + 2]].map(
			(index) => keyPoints[index],
		);

		drawPath(ctx, points, true, tension);
	}

	let size = 2.5;
	const leftIrisCenter = 473;
	const rightIrisCenter = 468;

	let index = 0;
	for (const keyPoint of keyPoints) {
		let color;
		if (keyPoint.name === "leftEye" || keyPoint.name === "rightEye") color = tokens.color.yellow.val;
		else if (keyPoint.name === "leftIris" || keyPoint.name === "rightIris") color = tokens.color.blue.val;
		else color = tokens.color.voidBlue.val;

		if (index === leftIrisCenter || index === rightIrisCenter) {
			size = 3.5;
			color = tokens.color.red.val;
		}

		drawAndFillCircle(ctx, keyPoint.x, keyPoint.y, size, color);
		index++;
	}
};
