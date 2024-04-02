import { useContext } from "react";
import { KeypointContext } from "../context/KeypointContext";

export const useKeypoints = () => {
	const context = useContext(KeypointContext);

	if (context === undefined) {
		throw new Error("useKeypoints must be used within a KeypointProvider");
	}

	return context;
};
