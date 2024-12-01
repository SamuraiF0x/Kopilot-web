import { useContext } from "react";
import { DriverInfoContext } from "../context/DriverInfoContext";

export default function useDriverInfo() {
	const context = useContext(DriverInfoContext);

	if (!context) {
		throw new Error("useDriverInfo must be used within a DrivingInfoProvider");
	}

	return context;
}
