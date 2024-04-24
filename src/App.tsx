import { YStack } from "tamagui";
import ProviderContainer from "./components/ProviderContainer.tsx";
import Driver from "./components/Driver.tsx";
import DriverStates from "./components/DriverStates.tsx";
import DriverStats from "./components/DriverStats.tsx";
import Header from "./components/Header.tsx";

// TODO Settings:
// TODO - contour styles: line, spline, both...
// TODO - change tresholds and time for countdown (use context) -> BETTER NOT!
// TODO Head Pose
// TODO - calibrate && set head pose angle (when over treshold, driver is distracted -> that also means looking at the phone)
// TODO Other
// TODO - store && display scores per driving session

function App() {
	return (
		<ProviderContainer>
			<YStack fullscreen jc="space-between" bg="$backgroundTransparent">
				<Header />

				<Driver />

				<DriverStates />

				<DriverStats />
			</YStack>
		</ProviderContainer>
	);
}

export default App;
