import { useState } from "react";
import config from "../tamagui.config.ts";
import { Paragraph, Stack, TamaguiProvider, Theme, YStack } from "tamagui";
import DrivingInfoProvider from "./context/DrivingInfoProvider.tsx";
import KeypointProvider from "./context/KeypointProvider.tsx";
import MaskProvider from "./context/MaskProvider.tsx";
import Camera from "./components/Camera.tsx";
import DriverState from "./components/DriverState.tsx";
import DrivingStats from "./components/DrivingStats.tsx";
import Mask from "./components/Mask.tsx";

// TODO Settings:
// TODO - contour styles: line, spline, both...
// TODO - show video feed || hide
// TODO - size of the mask && stick to the face options
// TODO - show complete scores || if under treshold info || both
// TODO - change tresholds and time for countdown (use context)
// TODO Head Pose
// TODO - calibrate && set head pose angle (when over treshold, driver is distracted -> that also means looking at the phone)
// TODO Other
// TODO - extract msg to constants/enum (loading, focused, isA..)
// TODO - store && display scores per driving session

function App() {
	const [loaded, setLoaded] = useState(false);

	return (
		<TamaguiProvider config={config}>
			<Theme name="dark">
				<MaskProvider>
					<KeypointProvider>
						<DrivingInfoProvider>
							<YStack fullscreen jc="space-between" bg="$backgroundTransparent">
								<DriverState />

								<YStack
									fullscreen
									mt="$8"
									mb="$8"
									bg="$background"
									br="$8"
									bw="$1"
									boc="$red"
									style={{ overflow: "hidden" }}>
									<Stack ai="center" jc="center" w="100%" h="100%">
										{loaded ? <></> : <Paragraph>Loading...</Paragraph>}

										<Camera setLoaded={setLoaded} />
									</Stack>

									<Mask />
								</YStack>

								<DrivingStats />
							</YStack>
						</DrivingInfoProvider>
					</KeypointProvider>
				</MaskProvider>
			</Theme>
		</TamaguiProvider>
	);
}

export default App;
