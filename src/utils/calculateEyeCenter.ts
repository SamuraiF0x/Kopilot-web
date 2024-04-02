import { Keypoint } from "@tensorflow-models/face-landmarks-detection";

interface Point {
	x: number;
	y: number;
}

export default function calculateEyeCenter(keypoints: Keypoint[]): Point {
	let sumX = 0;
	let sumY = 0;
	const count = keypoints?.length;

	let eyeCenter = { x: 0, y: 0 };

	if (keypoints.length > 0) {
		for (let i = 0; i < count; i++) {
			sumX += keypoints[i]?.x;
			sumY += keypoints[i]?.y;
		}
	}

	eyeCenter = {
		x: sumX / count,
		y: sumY / count,
	};

	return eyeCenter;
}
