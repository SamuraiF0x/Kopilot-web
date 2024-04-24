import { Paragraph, Stack, View, YStack } from "tamagui";
import { useCamera } from "../hooks/useCamera";
import { useSettings } from "../hooks/useSettings";
import Camera from "./Camera";
import Mask from "./Mask";

export default function Driver() {
	const { loaded } = useCamera();

	const { showStats, menuOpen } = useSettings();

	return (
		<YStack
			fullscreen
			mt="$8"
			mb={showStats ? "$8" : "$0"}
			bg="$background"
			br="$8"
			bw="$1"
			boc="$red"
			style={{ overflow: "hidden" }}
			animation="lazy"
			enterStyle={{ o: 0, scale: 0 }}>
			<Stack ai="center" jc="center" w="100%" h="100%">
				{!loaded && (
					<View pos="absolute" als="center">
						<Paragraph>Loading...</Paragraph>
					</View>
				)}

				{!menuOpen && <Camera />}
			</Stack>

			<Mask />
		</YStack>
	);
}
