import { useState } from "react";
import { SettingsContext } from "./SettingsContext";

interface SettingsProviderProps {
	children: React.ReactNode;
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
	const [showCameraFeed, setShowCameraFeed] = useState(false);
	const [stickMask, setStickMask] = useState(false);
	const [showStats, setShowStats] = useState(true);
	const [showStates, setShowStates] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<SettingsContext.Provider
			value={{
				showCameraFeed,
				setShowCameraFeed,
				stickMask,
				setStickMask,
				showStats,
				setShowStats,
				showStates,
				setShowStates,
				menuOpen,
				setMenuOpen,
			}}>
			{children}
		</SettingsContext.Provider>
	);
}
