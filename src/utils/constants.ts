export const inputResolution = {
	width: 1920,
	height: 1080,
};

export const videoConstraints = {
	width: inputResolution.width,
	height: inputResolution.height,
	facingMode: "user",
};

const leftEyeContour = [466, 249, 388, 390, 387, 373, 386, 374, 385, 380, 384, 381, 398, 382, 362, 263];
const leftEyeCorners = { inner: 362, outer: 263 };

const rightEyeContour = [246, 7, 161, 163, 160, 144, 159, 145, 158, 153, 157, 154, 173, 155, 33, 133];
const rightEyeCorners = { inner: 33, outer: 133 };

export const keypointIndex = {
	leftIrisCenter: 473,
	rightIrisCenter: 468,
	leftEyeContour,
	rightEyeContour,
	leftEyeCorners,
	rightEyeCorners,
	noseTip: 1,
	leftLipOuterCorner: 291,
	rightLipOuterCorner: 61,
	chin: 199,
};

export enum DriverState {
	Focused = "Focused",
	Tired = "Tired",
	Asleep = "Asleep",
	LookingAway = "Looking away",
	Distracted = "Distracted",
}

export enum EyesOpenedMessages {
	Asleep = "Asleep",
	TakeAPause = "Take a pause",
	Awake = "Awake",
}

export enum GazeScoreMessages {
	EyesOnTheRoad = "Eyes on the road!",
	Distracted = "Distracted",
	Focused = "Focused",
}

export enum HeadPoseMessages {
	EyesOnTheRoad = "Eyes on the road!",
	Distracted = "Distracted",
	Focused = "Focused",
}
