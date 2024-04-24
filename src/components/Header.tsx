import { H3, View, XStack } from "tamagui";
import { useCamera } from "../hooks/useCamera";
import useDriverInfo from "../hooks/useDriverInfo";
import { useSettings } from "../hooks/useSettings";
import getDriverStateColor from "../utils/getDriverStateColor";
import MenuSheet from "./sheet/MenuSheet";

export default function Header() {
	const { loaded } = useCamera();
	const { menuOpen, setMenuOpen } = useSettings();
	const { driverState } = useDriverInfo();

	const getColor = () => {
		if (!loaded) {
			return "$primary";
		}
		return getDriverStateColor(driverState);
	};

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
					boc={getColor()}
					br="$4"
					animation="smooth">
					<H3 col={getColor()}>{loaded ? driverState : "Initialising"}</H3>
				</View>
			</XStack>

			<MenuSheet menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
		</XStack>
	);
}
