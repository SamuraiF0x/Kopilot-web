import { AnimatePresence, Paragraph, YStack } from "tamagui";
import useDriverInfo from "../hooks/useDriverInfo";
import { useKeypoints } from "../hooks/useKeypoints";
import { useSettings } from "../hooks/useSettings";
import { keypointIndex } from "../utils/constants";

export default function DriverStates() {
	// TODO add this to headPose state
	// ? const isSleepy = isHeadTiltFocused || isHeadTiltDistracted;

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

	// state table to follow head position:
	// const { keypoints } = useKeypoints();
	// const startPoint = keypoints.length > 0 && {
	// 	x: keypoints[keypointIndex.leftIrisCenter].x,
	// 	y: keypoints[keypointIndex.leftIrisCenter].y,
	// };

	const { showStates } = useSettings();

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
					<YStack ai="center" gap="$3">
						<Paragraph>Eyes opened</Paragraph>

						<Paragraph col={!isAwake && isTired ? "$red" : isTired ? "$yellow" : "$green"}>
							{!isAwake && isTired ? "Asleep" : isTired ? "Take a pause" : "Awake"}
						</Paragraph>
					</YStack>

					<YStack ai="center" gap="$3">
						<Paragraph>Gaze score</Paragraph>

						<Paragraph col={!isFocused && isDistracted ? "$red" : isDistracted ? "$yellow" : "$green"}>
							{!isFocused && isDistracted
								? "Eyes on the road"
								: isDistracted
									? "Distracted"
									: "Focused"}
						</Paragraph>
					</YStack>

					<YStack ai="center" gap="$3">
						<Paragraph>Head pose</Paragraph>
						<Paragraph
							col={
								!isHeadFocused && isHeadDistracted
									? "$red"
									: isHeadDistracted
										? "$yellow"
										: "$green"
							}>
							{!isHeadFocused && isHeadDistracted
								? "Eyes on the road"
								: isHeadDistracted
									? "Distracted"
									: "Focused"}
						</Paragraph>
					</YStack>
				</YStack>
			)}
		</AnimatePresence>
	);
}
