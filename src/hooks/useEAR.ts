import { useKeypoints } from "./useKeypoints";
import calculateDistance from "../utils/calculateDistance";
import { keypointIndex } from "../utils/constants";

/**
 * Estimate the eye aspect ratio (EAR) of the driver.
 *
 * @returns *string* - [0-1]
 *
 * **Note:** higher ratio = eye opened more widely
 * - lowest ratio ~ 0.2
 */
export default function useEAR() {
	const { keypoints } = useKeypoints();

	let leftEyeRatio = 0;
	let rightEyeRatio = 0;

	// Left eye
	for (let i = 0; i < keypointIndex.leftEyeContour.length - 2; i += 2) {
		if (
			!Object.values(keypointIndex.leftEyeCorners).includes(keypointIndex.leftEyeContour[i]) &&
			!Object.values(keypointIndex.leftEyeCorners).includes(keypointIndex.leftEyeContour[i + 1])
		) {
			leftEyeRatio += calculateDistance(
				keypoints[keypointIndex.leftEyeContour[i]],
				keypoints[keypointIndex.leftEyeContour[i + 1]],
			);
		}
	}

	leftEyeRatio /=
		2 *
		calculateDistance(
			keypoints[keypointIndex.leftEyeCorners.inner],
			keypoints[keypointIndex.leftEyeCorners.outer],
		);

	// Right eye
	for (let i = 0; i < keypointIndex.rightEyeContour.length - 2; i += 2) {
		if (
			!Object.values(keypointIndex.rightEyeCorners).includes(keypointIndex.rightEyeContour[i]) &&
			!Object.values(keypointIndex.rightEyeCorners).includes(keypointIndex.rightEyeContour[i + 1])
		) {
			rightEyeRatio += calculateDistance(
				keypoints[keypointIndex.rightEyeContour[i]],
				keypoints[keypointIndex.rightEyeContour[i + 1]],
			);
		}
	}

	rightEyeRatio /=
		2 *
		calculateDistance(
			keypoints[keypointIndex.rightEyeCorners.inner],
			keypoints[keypointIndex.rightEyeCorners.outer],
		);

	const ear = (leftEyeRatio + rightEyeRatio) / 2;

	return ear.toFixed(2);
}
