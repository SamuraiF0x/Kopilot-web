import { useEffect, useState } from "react";
import { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import calculateHeadPose from "../utils/calculateHeadPose";

export interface HeadPose {
	roll: string;
	tilt: string;
	yaw: string;
	projectedPoints: number[];
}

export default function useHeadPose(keypoints: Keypoint[], canvas: HTMLCanvasElement | null) {
	const initialHeadPose = { roll: "0", tilt: "0", yaw: "0", projectedPoints: [] };
	const [headPose, setHeadPose] = useState<HeadPose>(initialHeadPose);

	const numberOfKeys = Object.keys(keypoints).length;

	useEffect(() => {
		const calculatedHeadPose =
			numberOfKeys > 0 && canvas !== null ? calculateHeadPose(keypoints, canvas) : initialHeadPose;

		setHeadPose(calculatedHeadPose);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keypoints]);

	return headPose;
}
