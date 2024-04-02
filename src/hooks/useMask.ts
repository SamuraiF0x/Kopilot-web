import { useContext } from "react";
import { MaskContext } from "../context/MaskContext";

export default function useMask() {
	const context = useContext(MaskContext);

	if (!context) {
		throw new Error("useMask must be used within a MaskProvider");
	}

	return context;
}
