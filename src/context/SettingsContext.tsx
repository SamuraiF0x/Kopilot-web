import { createContext } from "react";

export const SettingsContext = createContext<{
	showCameraFeed: boolean;
	setShowCameraFeed: React.Dispatch<React.SetStateAction<boolean>>;
	stickMask: boolean;
	setStickMask: React.Dispatch<React.SetStateAction<boolean>>;
	showStats: boolean;
	setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
	showStates: boolean;
	setShowStates: React.Dispatch<React.SetStateAction<boolean>>;
	menuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
	showCameraFeed: false,
	setShowCameraFeed: () => {},
	stickMask: false,
	setStickMask: () => {},
	showStats: false,
	setShowStats: () => {},
	showStates: true,
	setShowStates: () => {},
	menuOpen: false,
	setMenuOpen: () => {},
});
