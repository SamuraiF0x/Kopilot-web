import { createContext } from "react";
import { DriverState } from "../utils/constants";

// Define the shape of your context
interface DriverInfoContextProps {
	EAR: number;
	isEARFocused: boolean;
	isEARDistracted: boolean;
	gazeScore: number;
	isGazeScoreFocused: boolean;
	isGazeScoreDistracted: boolean;
	headPose: { roll: number; tilt: number; yaw: number; projectedPoints: number[] };
	isHeadRollFocused: boolean;
	isHeadTiltFocused: boolean;
	isHeadYawFocused: boolean;
	isHeadFocused: boolean;
	isHeadRollDistracted: boolean;
	isHeadTiltDistracted: boolean;
	isHeadYawDistracted: boolean;
	isHeadDistracted: boolean;
	driverState: DriverState;
	driverSubStates: { title: string; isFocused: boolean; isDistracted: boolean; messages: string[] }[];
}

export const DriverInfoContext = createContext<DriverInfoContextProps | undefined>(undefined);
