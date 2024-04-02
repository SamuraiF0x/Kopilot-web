import { Paragraph, XStack, YStack } from "tamagui";
import useDrivingInfo from "../hooks/useDrivingInfo";

export default function DriverState() {
	// TODO add toast for warning msgs

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
	} = useDrivingInfo();

	return (
		<XStack jc="space-between" m="$4">
			<YStack ai="center" gap="$3">
				<Paragraph>Eyes opened</Paragraph>

				<Paragraph col={!isAwake && isTired ? "$red" : isTired ? "$yellow" : "$green"}>
					{!isAwake && isTired ? "Asleep" : isTired ? "Take a pause" : "Awake"}
				</Paragraph>
			</YStack>

			<YStack ai="center" gap="$3">
				<Paragraph>Gaze score</Paragraph>

				<Paragraph col={!isFocused && isDistracted ? "$red" : isDistracted ? "$yellow" : "$green"}>
					{!isFocused && isDistracted ? "Eyes on the road" : isDistracted ? "Distracted" : "Focused"}
				</Paragraph>
			</YStack>

			<YStack ai="center" gap="$3">
				<Paragraph>Head pose</Paragraph>
				<Paragraph
					col={!isHeadFocused && isHeadDistracted ? "$red" : isHeadDistracted ? "$yellow" : "$green"}>
					{!isHeadFocused && isHeadDistracted
						? "Eyes on the road"
						: isHeadDistracted
							? "Distracted"
							: "Focused"}
				</Paragraph>
			</YStack>
		</XStack>
	);
}
