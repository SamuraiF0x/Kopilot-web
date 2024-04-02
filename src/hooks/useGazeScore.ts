import { useKeypoints } from "./useKeypoints";
import calculateDistance from "../utils/calculateDistance";
import calculateEyeCenter from "../utils/calculateEyeCenter";
import { keypointIndex } from "../utils/constants";

/**
 * Estimate the gaze score of the driver.
 *
 * @returns *string* [0, 1]
 *
 * **Note:** lower is better = looking straight
 * - lowest score ~ 4
 * - highest score ~ 50 (at certain angles)
 */
export default function useGazeScore() {
	const { keypoints } = useKeypoints();

	// For left eye
	const leftEyeKeypoints = [];
	for (let i = 0; i < keypointIndex.leftEyeContour.length; i++) {
		leftEyeKeypoints.push(keypoints[keypointIndex.leftEyeContour[i]]);
	}

	const leftEyeCorners = {
		inner: keypoints[keypointIndex.leftEyeCorners.inner],
		outer: keypoints[keypointIndex.leftEyeCorners.outer],
	};

	const leftEyeCenter = calculateEyeCenter(leftEyeKeypoints);
	const leftPupil = keypoints[keypointIndex.leftIrisCenter];
	const leftEyeWidth = calculateDistance(leftEyeCorners.inner, leftEyeCorners.outer) / 2;
	const leftGazeScore = (calculateDistance(leftEyeCenter, leftPupil) / leftEyeWidth) * 1.5;

	// For right eye
	const rightEyeKeypoints = [];
	for (let i = 0; i < keypointIndex.rightEyeContour.length; i++) {
		rightEyeKeypoints.push(keypoints[keypointIndex.rightEyeContour[i]]);
	}

	const rightEyeCorners = {
		inner: keypoints[keypointIndex.rightEyeCorners.inner],
		outer: keypoints[keypointIndex.rightEyeCorners.outer],
	};

	const rightEyeCenter = calculateEyeCenter(rightEyeKeypoints);
	const rightPupil = keypoints[keypointIndex.rightIrisCenter];
	const rightEyeWidth = calculateDistance(rightEyeCorners.inner, rightEyeCorners.outer) / 2;
	const rightGazeScore = (calculateDistance(rightEyeCenter, rightPupil) / rightEyeWidth) * 1.5;

	const gazeScore = 1 - (leftGazeScore + rightGazeScore) / 2;

	return gazeScore.toFixed(2);
}
