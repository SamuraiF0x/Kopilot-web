import { AnimatePresence, Paragraph, YStack } from "tamagui";
import useDriverInfo from "../hooks/useDriverInfo";
import { useSettings } from "../hooks/useSettings";

const getColorAndMessage = (isFocused: boolean, isDistracted: boolean, messages: string[]) => {
	let color = "$green";
	let message = messages[2];

	if (!isFocused && isDistracted) {
		color = "$red";
		message = messages[0];
	} else if (isDistracted) {
		color = "$yellow";
		message = messages[1];
	}

	return { color, message };
};

export default function DriverStates() {
	const { driverSubStates } = useDriverInfo();

	const { showStates } = useSettings();

	// state table to follow head position:
	// const { keypoints } = useKeypoints();
	// const startPoint = keypoints.length > 0 && {
	// 	x: keypoints[keypointIndex.leftIrisCenter].x,
	// 	y: keypoints[keypointIndex.leftIrisCenter].y,
	// };

	return (
		<AnimatePresence>
			{showStates && (
				<YStack
					key="driverStates"
					pos="absolute"
					zi={1000}
					jc="space-between"
					px="$4"
					py="$5"
					t="$8"
					// l={startPoint && -startPoint.x / 10 + 100}
					// t={startPoint && startPoint.y / 10 - 50}
					gap="$3"
					bg="$backgroundTransparent"
					br="$4"
					boc="$fusion"
					bw="$1"
					animation="elastic"
					enterStyle={{ o: 0, scale: 0 }}
					exitStyle={{ o: 0, scale: 0 }}>
					{driverSubStates.map((state, index) => {
						const { color, message } = getColorAndMessage(
							state.isFocused,
							state.isDistracted,
							state.messages,
						);

						return (
							<YStack key={index} ai="center" gap="$3">
								<Paragraph>{state.title}</Paragraph>
								<Paragraph col={color}>{message}</Paragraph>
							</YStack>
						);
					})}
				</YStack>
			)}
		</AnimatePresence>
	);
}
