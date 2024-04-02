import { createContext } from "react";

// Define the shape of your context
interface DrivingInfoContextProps {
	EAR: string;
	isAwake: boolean;
	isTired: boolean;
	gazeScore: string;
	isFocused: boolean;
	isDistracted: boolean;
	headPose: { roll: string; tilt: string; yaw: string; projectedPoints: number[] };
	isHeadRollFocused: boolean;
	isHeadTiltFocused: boolean;
	isHeadYawFocused: boolean;
	isHeadFocused: boolean;
	isHeadRollDistracted: boolean;
	isHeadTiltDistracted: boolean;
	isHeadYawDistracted: boolean;
	isHeadDistracted: boolean;
}

export const DrivingInfoContext = createContext<DrivingInfoContextProps | undefined>(undefined);
