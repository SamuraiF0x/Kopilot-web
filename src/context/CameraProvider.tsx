import { useState } from "react";
import { CameraContext } from "./CameraContext";

interface CameraProviderProps {
	children: React.ReactNode;
}

export default function CameraProvider({ children }: CameraProviderProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<CameraContext.Provider
			value={{
				loaded,
				setLoaded,
			}}>
			{children}
		</CameraContext.Provider>
	);
}
