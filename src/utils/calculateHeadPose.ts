import cv, { type MatExpr } from "@techstark/opencv-js";
import type { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import { inputResolution, keypointIndex } from "./constants";

// https://codepen.io/Susanne-Thierfelder/pen/KKegjvm
// https://medium.com/@susanne.thierfelder/head-pose-estimation-with-mediapipe-and-opencv-in-javascript-c87980df3acb

// Convert the rotation vector to Euler angles (roll, pitch, yaw)
function rotationMatrixToEulerAngles(rotationMatrixData: MatExpr): number[] {
	const sy = Math.sqrt(
		rotationMatrixData.data64F[0] * rotationMatrixData.data64F[0] +
			rotationMatrixData.data64F[3] * rotationMatrixData.data64F[3],
	);
	const singular = sy < 1e-6;

	let x = 0;
	let y = 0;
	let z = 0;

	if (!singular) {
		x = Math.atan2(rotationMatrixData.data64F[7], rotationMatrixData.data64F[8]);
		y = Math.atan2(-rotationMatrixData.data64F[6], sy);
		z = Math.atan2(rotationMatrixData.data64F[3], rotationMatrixData.data64F[0]);
	} else {
		x = Math.atan2(-rotationMatrixData.data64F[5], rotationMatrixData.data64F[4]);
		y = Math.atan2(-rotationMatrixData.data64F[6], sy);
		z = 0;
	}

	return [x, y, z];
}

export default function calculateHeadPose(keypoints: Keypoint[], canvas: HTMLCanvasElement) {
	let roll = 0;
	let tilt = 0;
	let yaw = 0;

	let projectedPoints: number[] = [];

	const noseTip = keypoints[keypointIndex.noseTip];
	const leftEye = keypoints[keypointIndex.leftEyeCorners.outer];
	const rightEye = keypoints[keypointIndex.rightEyeCorners.outer];
	const leftLip = keypoints[keypointIndex.leftLipOuterCorner];
	const rightLip = keypoints[keypointIndex.rightLipOuterCorner];
	const chin = keypoints[keypointIndex.chin];

	// 2D image points
	const imagePoints = cv.matFromArray(6, 2, cv.CV_64FC1, [
		noseTip.x,
		noseTip.y,
		leftEye.x,
		leftEye.y,
		rightEye.x,
		rightEye.y,
		leftLip.x,
		leftLip.y,
		rightLip.x,
		rightLip.y,
		chin.x,
		chin.y,
	]);

	// 3D model points
	// const points = [
	// 	0,
	// 	0,
	// 	0, // Nose tip 1
	// 	225,
	// 	170,
	// 	-135, // Left eye corner 263
	// 	-225,
	// 	170,
	// 	-135, // Right eye corner 33
	// 	150,
	// 	-150,
	// 	-125, // Left lip corner 291
	// 	-150,
	// 	-150,
	// 	-125, // Right lip corner 61
	// 	0,
	// 	-330,
	// 	-65, // Chin 199
	// ];

	const points = [
		0,
		-1.126865,
		7.475604, // Nose tip 1
		-4.445859,
		2.663991,
		3.173422, // Left eye corner 263
		4.445859,
		2.663991,
		3.173422, // Right eye corner 133
		-2.456206,
		-4.342621,
		4.283884, // Left lip corner 291
		2.456206,
		-4.342621,
		4.283884, // Right lip corner 61
		0,
		-9.403378,
		4.264492, // Chin 199
	];

	const modelPoints = cv.matFromArray(6, 3, cv.CV_64FC1, points);

	// Camera internals
	const normalizedFocaleY = 1.28;
	const focalLength = inputResolution.height * normalizedFocaleY;
	const cx = canvas.width / 2;
	const cy = canvas.height / 2;
	const cameraMatrix = cv.matFromArray(3, 3, cv.CV_64FC1, [focalLength, 0, cx, 0, focalLength, cy, 0, 0, 1]);

	const distCoeffs = cv.matFromArray(4, 1, cv.CV_64FC1, [0, 0, 0, 0]); // Assuming no lens distortion

	const rotationVector = new cv.Mat();
	const translationVector = new cv.Mat();

	const success = cv.solvePnP(
		modelPoints,
		imagePoints,
		cameraMatrix,
		distCoeffs,
		rotationVector,
		translationVector,
		false,
		cv.SOLVEPNP_ITERATIVE,
	);

	if (success) {
		// const rotationMatrix = new cv.Mat();
		const rotationMatrix = cv.Mat.zeros(3, 3, cv.CV_64FC1);

		// Jacobian matrix
		const jaco = new cv.Mat();

		cv.Rodrigues(rotationVector, rotationMatrix, jaco);

		const [x, y, z] = rotationMatrixToEulerAngles(rotationMatrix);
		tilt = 180 * (x / Math.PI);
		yaw = 180 * (y / Math.PI);
		roll = 180 * (z / Math.PI);

		const modelPointsObj = cv.matFromArray(6, 3, cv.CV_64FC1, points);

		// object points that never change
		const worldPoints = cv.matFromArray(9, 3, cv.CV_64FC1, [
			modelPointsObj.data64F[0] + 3,
			modelPointsObj.data64F[1],
			modelPointsObj.data64F[2], // x axis
			modelPointsObj.data64F[0],
			modelPointsObj.data64F[1] + 3,
			modelPointsObj.data64F[2], // y axis
			modelPointsObj.data64F[0],
			modelPointsObj.data64F[1],
			modelPointsObj.data64F[2] - 3, // z axis
			modelPointsObj.data64F[0],
			modelPointsObj.data64F[1],
			modelPointsObj.data64F[2], //
			modelPointsObj.data64F[3],
			modelPointsObj.data64F[4],
			modelPointsObj.data64F[5], //
			modelPointsObj.data64F[6],
			modelPointsObj.data64F[7],
			modelPointsObj.data64F[8], //
			modelPointsObj.data64F[9],
			modelPointsObj.data64F[10],
			modelPointsObj.data64F[11], //
			modelPointsObj.data64F[12],
			modelPointsObj.data64F[13],
			modelPointsObj.data64F[14], //
			modelPointsObj.data64F[15],
			modelPointsObj.data64F[16],
			modelPointsObj.data64F[17], //
		]);

		const imagePointsProjected = new cv.Mat({ width: 9, height: 2 }, cv.CV_64FC1);
		cv.projectPoints(
			worldPoints,
			rotationVector,
			translationVector,
			cameraMatrix,
			distCoeffs,
			imagePointsProjected,
			jaco,
		);

		projectedPoints = Array.from(imagePointsProjected.data64F);
	}

	return {
		roll: Number(roll.toFixed(2)),
		tilt: Number(tilt.toFixed(2)),
		yaw: Number(yaw.toFixed(2)),
		projectedPoints,
	};
}
