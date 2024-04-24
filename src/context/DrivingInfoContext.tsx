import { createContext } from "react";

// Define the shape of your context
interface DriverInfoContextProps {
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

export const DriverInfoContext = createContext<DriverInfoContextProps | undefined>(undefined);
