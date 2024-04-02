import useEAR from "../hooks/useEAR";
import useGazeScore from "../hooks/useGazeScore";
import useHeadPose from "../hooks/useHeadPose";
import useScoreOverTime from "../hooks/useScoreOverTime";
import useTresholdCountdown from "../hooks/useTresholdCountdown";
import { DrivingInfoContext } from "./DrivingInfoContext";

interface DrivingInfoProviderProps {
	children: React.ReactNode;
}

export default function DrivingInfoProvider({ children }: DrivingInfoProviderProps) {
	const EAR = useEAR();
	const isAwake = useTresholdCountdown(EAR, 0.4);
	const isTired = useScoreOverTime(EAR, 0.45);

	const gazeScore = useGazeScore();
	const isFocused = useTresholdCountdown(gazeScore, 0.35);
	const isDistracted = useScoreOverTime(gazeScore, 0.35);

	const headPose = useHeadPose();
	const isHeadRollFocused = useTresholdCountdown(headPose.roll, 30, true);
	const isHeadTiltFocused = useTresholdCountdown(headPose.tilt, 20, true);
	const isHeadYawFocused = useTresholdCountdown(headPose.yaw, 25, true);
	const isHeadFocused = isHeadRollFocused && isHeadTiltFocused && isHeadYawFocused;
	const isHeadRollDistracted = useScoreOverTime(headPose.roll, 30, true);
	const isHeadTiltDistracted = useScoreOverTime(headPose.tilt, 20, true);
	const isHeadYawDistracted = useScoreOverTime(headPose.yaw, 25, true);
	const isHeadDistracted = isHeadRollDistracted || isHeadTiltDistracted || isHeadYawDistracted;

	return (
		<DrivingInfoContext.Provider
			value={{
				EAR,
				isAwake,
				isTired,
				gazeScore,
				isFocused,
				isDistracted,
				headPose,
				isHeadRollFocused,
				isHeadTiltFocused,
				isHeadYawFocused,
				isHeadFocused,
				isHeadRollDistracted,
				isHeadTiltDistracted,
				isHeadYawDistracted,
				isHeadDistracted,
			}}>
			{children}
		</DrivingInfoContext.Provider>
	);
}
