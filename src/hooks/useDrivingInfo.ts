import { useContext } from "react";
import { DrivingInfoContext } from "../context/DrivingInfoContext";

export default function useDrivingInfo() {
	const context = useContext(DrivingInfoContext);

	if (!context) {
		throw new Error("useDrivingInfo must be used within a DrivingInfoProvider");
	}

	return context;
}
