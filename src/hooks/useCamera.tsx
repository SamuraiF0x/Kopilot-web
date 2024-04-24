import { useContext } from "react";
import { CameraContext } from "../context/CameraContext";

export const useCamera = () => {
	const context = useContext(CameraContext);

	if (context === undefined) {
		throw new Error("useCamera must be used within a CameraProvider");
	}

	return context;
};
