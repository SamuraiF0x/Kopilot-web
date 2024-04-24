import { AudioLines, BrainCircuit, VenetianMask, Video } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";
import { useSettings } from "../../hooks/useSettings";
import SwitchWithLabel from "../utilities/SwitchWithLabel";

export default function SettingsList() {
	const {
		showCameraFeed,
		setShowCameraFeed,
		stickMask,
		setStickMask,
		showStats,
		setShowStats,
		showStates,
		setShowStates,
	} = useSettings();

	return (
		<YStack
			h="100%"
			p="$5.5"
			gap="$5.5"
			onPress={(e) => {
				e.stopPropagation();
			}}>
			<SwitchWithLabel
				label="Show camera feed"
				icon={<Video color={showCameraFeed ? "$accent" : "$backgroundPress"} />}
				enabled={showCameraFeed}
				onSwitch={setShowCameraFeed}
			/>

			<SwitchWithLabel
				label="Stick mask to face"
				icon={<VenetianMask color={stickMask ? "$accent" : "$backgroundPress"} />}
				enabled={stickMask}
				onSwitch={setStickMask}
			/>

			<SwitchWithLabel
				label="Show stats"
				icon={<AudioLines color={showStats ? "$accent" : "$backgroundPress"} />}
				enabled={showStats}
				onSwitch={setShowStats}
			/>

			<SwitchWithLabel
				label="Show states"
				icon={<BrainCircuit color={showStates ? "$accent" : "$backgroundPress"} />}
				enabled={showStates}
				onSwitch={setShowStates}
			/>
		</YStack>
	);
}
