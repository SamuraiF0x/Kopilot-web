import { createContext } from "react";

export const CameraContext = createContext<{
	loaded: boolean;
	setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}>({
	loaded: false,
	setLoaded: () => {},
});
