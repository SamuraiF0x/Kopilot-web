import { DriverState } from "./constants";

export default function getDriverStateColor(driverState: DriverState): string {
	let color;
	switch (driverState) {
		case DriverState.Focused:
			color = "$success";
			break;
		case DriverState.Tired:
		case DriverState.LookingAway:
			color = "$warning";
			break;
		case DriverState.Asleep:
		case DriverState.Distracted:
			color = "$red";
			break;
		default:
			color = "$primary";
	}
	return color;
}
