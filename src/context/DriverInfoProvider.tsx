import useEAR from "../hooks/useEAR";
import useGazeScore from "../hooks/useGazeScore";
import useHeadPose from "../hooks/useHeadPose";
import useScoreOverTime from "../hooks/useScoreOverTime";
import useTresholdCountdown from "../hooks/useTresholdCountdown";
import { DriverInfoContext } from "./DriverInfoContext";
import { DriverState, EyesOpenedMessages, GazeScoreMessages, HeadPoseMessages } from "../utils/constants";

interface DriverInfoProviderProps {
	children: React.ReactNode;
}

export default function DriverInfoProvider({ children }: DriverInfoProviderProps) {
	const EAR = useEAR();
	const isEARFocused = useTresholdCountdown(EAR, 0.4);
	const isEARDistracted = useScoreOverTime(EAR, 0.45);

	const gazeScore = useGazeScore();
	const isGazeScoreFocused = useTresholdCountdown(gazeScore, 0.55);
	const isGazeScoreDistracted = useScoreOverTime(gazeScore, 0.55);

	const headPose = useHeadPose();
	const isHeadRollFocused = useTresholdCountdown(headPose.roll, 30, true);
	const isHeadTiltFocused = useTresholdCountdown(headPose.tilt, 20, true);
	const isHeadYawFocused = useTresholdCountdown(headPose.yaw, 25, true);
	const isHeadFocused = isHeadRollFocused && isHeadTiltFocused && isHeadYawFocused;
	const isHeadRollDistracted = useScoreOverTime(headPose.roll, 30, true);
	const isHeadTiltDistracted = useScoreOverTime(headPose.tilt, 20, true);
	const isHeadYawDistracted = useScoreOverTime(headPose.yaw, 25, true);
	const isHeadDistracted = isHeadRollDistracted || isHeadTiltDistracted || isHeadYawDistracted;

	const driverState: DriverState = (() => {
		if (
			isEARFocused &&
			!isEARDistracted &&
			isGazeScoreFocused &&
			!isGazeScoreDistracted &&
			isHeadFocused &&
			!isHeadDistracted
		) {
			return DriverState.Focused;
		}

		if (isEARDistracted || isHeadDistracted) {
			return DriverState.Tired;
		}

		if (!isEARFocused) {
			return DriverState.Asleep;
		}

		if (!isGazeScoreFocused || isGazeScoreDistracted) {
			return DriverState.LookingAway;
		}

		return DriverState.Distracted;
	})();

	const driverSubStates = [
		{
			title: "Eyes opened",
			isFocused: isEARFocused,
			isDistracted: isEARDistracted,
			messages: Object.values(EyesOpenedMessages),
		},
		{
			title: "Gaze score",
			isFocused: isGazeScoreFocused,
			isDistracted: isGazeScoreDistracted,
			messages: Object.values(GazeScoreMessages),
		},
		{
			title: "Head pose",
			isFocused: isHeadFocused,
			isDistracted: isHeadDistracted,
			messages: Object.values(HeadPoseMessages),
		},
	];

	return (
		<DriverInfoContext.Provider
			value={{
				EAR,
				isEARFocused,
				isEARDistracted,
				gazeScore,
				isGazeScoreFocused,
				isGazeScoreDistracted,
				headPose,
				isHeadRollFocused,
				isHeadTiltFocused,
				isHeadYawFocused,
				isHeadFocused,
				isHeadRollDistracted,
				isHeadTiltDistracted,
				isHeadYawDistracted,
				isHeadDistracted,
				driverState,
				driverSubStates,
			}}>
			{children}
		</DriverInfoContext.Provider>
	);
}
