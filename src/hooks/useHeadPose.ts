import { useEffect, useState } from "react";
import { useKeypoints } from "./useKeypoints";
import useMask from "./useMask";
import calculateHeadPose from "../utils/calculateHeadPose";

export interface HeadPose {
	roll: number;
	tilt: number;
	yaw: number;
	projectedPoints: number[];
}

export default function useHeadPose() {
	const canvasRef = useMask();

	const { keypoints } = useKeypoints();

	const initialHeadPose = { roll: 0, tilt: 0, yaw: 0, projectedPoints: [] };
	const [headPose, setHeadPose] = useState<HeadPose>(initialHeadPose);

	const numberOfKeys = Object.keys(keypoints).length;

	useEffect(() => {
		const calculatedHeadPose =
			numberOfKeys > 0 && canvasRef.current !== null
				? calculateHeadPose(keypoints, canvasRef.current)
				: initialHeadPose;

		setHeadPose(calculatedHeadPose);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keypoints]);

	return headPose;
}
