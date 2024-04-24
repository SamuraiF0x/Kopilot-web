import { H3, View, XStack } from "tamagui";
import { useCamera } from "../hooks/useCamera";
import useDriverInfo from "../hooks/useDriverInfo";
import { useSettings } from "../hooks/useSettings";
import MenuSheet from "./sheet/MenuSheet";

export default function Header() {
	const { loaded } = useCamera();
	const { menuOpen, setMenuOpen } = useSettings();

	const {
		isAwake,
		isTired,
		isFocused,
		isDistracted,
		isHeadRollFocused,
		isHeadTiltFocused,
		isHeadYawFocused,
		isHeadFocused,
		isHeadRollDistracted,
		isHeadTiltDistracted,
		isHeadYawDistracted,
		isHeadDistracted,
	} = useDriverInfo();

	// TODO - extract msg to constants/enum (loading, focused, isA..)
	// TODO - add toast for warning msgs

	const driverState =
		isAwake && !isTired && isFocused && !isDistracted && isHeadFocused && !isHeadDistracted
			? "Focused"
			: "Distracted";

	return (
		<XStack ai="center" jc="space-between" m="$4">
			<XStack ai="center" gap="$4">
				<H3 fow="bold">Kopilot</H3>

				<View
					ai="center"
					jc="center"
					px="$4"
					py="$2.5"
					bw="$1"
					boc={driverState ? "$success" : "$warning"}
					br="$4"
					animation="smooth">
					<H3 col={driverState ? "$success" : "$warning"}>{loaded && driverState} </H3>
				</View>
			</XStack>

			<MenuSheet menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
		</XStack>
	);
}
