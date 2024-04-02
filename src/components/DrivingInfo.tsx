import { useEffect } from "react";
import { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import { ArrowDownUp, ArrowRightLeft, EyeOff, RotateCw, ScanEye } from "@tamagui/lucide-icons";
import { Paragraph, View, XStack, YStack } from "tamagui";
import useEAR from "../hooks/useEAR";
import useGazeScore from "../hooks/useGazeScore";
import useHeadPose from "../hooks/useHeadPose";
import useScoreOverTime from "../hooks/useScoreOverTime";
import useTresholdCountdown from "../hooks/useTresholdCountdown";

interface DrivingInfoProps {
	keypoints: Keypoint[];
	onHeadPoseChange: (projectedPoints: number[]) => void;
	canvas: HTMLCanvasElement | null;
}

export default function DrivingInfo({ keypoints, onHeadPoseChange, canvas }: DrivingInfoProps) {
	// TODO add these to useDriverState => return [EAR, gazeScore, headPose] values and driver states msgs
	// TODO add toast for warning msgs
	const EAR = useEAR(keypoints);
	const isAwake = useTresholdCountdown(EAR, 0.4);
	const isTired = useScoreOverTime(EAR, 0.45);

	const gazeScore = useGazeScore(keypoints);
	const isFocused = useTresholdCountdown(gazeScore, 0.35);
	const isDistracted = useScoreOverTime(gazeScore, 0.35);

	const headPose = useHeadPose(keypoints, canvas);
	const isHeadRollFocused = useTresholdCountdown(headPose.roll, 30, true);
	const isHeadTiltFocused = useTresholdCountdown(headPose.tilt, 20, true);
	const isHeadYawFocused = useTresholdCountdown(headPose.yaw, 25, true);
	const isHeadFocused = isHeadRollFocused && isHeadTiltFocused && isHeadYawFocused;
	const isHeadRollDistracted = useScoreOverTime(headPose.roll, 30, true);
	const isHeadTiltDistracted = useScoreOverTime(headPose.tilt, 20, true);
	const isHeadYawDistracted = useScoreOverTime(headPose.yaw, 25, true);
	const isHeadDistracted = isHeadRollDistracted || isHeadTiltDistracted || isHeadYawDistracted;

	// TODO add this to headPose state
	// const isSleepy = isHeadTiltFocused || isHeadTiltDistracted;

	useEffect(() => {
		onHeadPoseChange(headPose.projectedPoints);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [headPose.projectedPoints]);

	// TODO change icons based on state (if head too much FlipLeftRight, show arrow to the right...)
	return (
		<YStack gap="$4" m="$4">
			<XStack jc="space-between">
				<YStack ai="center" gap="$2">
					<EyeOff size="$4" col="$accent" />
					<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
						<Paragraph ta="center" miw="$6">
							{EAR}
						</Paragraph>
					</View>
				</YStack>
				<YStack ai="center" gap="$2">
					<ScanEye size="$4" col="$accent" />
					<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
						<Paragraph ta="center" miw="$6">
							{gazeScore}
						</Paragraph>
					</View>
				</YStack>
				<YStack ai="center" gap="$2">
					<RotateCw size="$4" col="$accent" />
					<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
						<Paragraph ta="center" miw="$6">
							{headPose.roll}
						</Paragraph>
					</View>
				</YStack>

				<YStack ai="center" gap="$2">
					<ArrowDownUp size="$4" col="$accent" />
					<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
						<Paragraph ta="center" miw="$6">
							{headPose.tilt}
						</Paragraph>
					</View>
				</YStack>

				<YStack ai="center" gap="$2">
					<ArrowRightLeft size="$4" col="$accent" />
					<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
						<Paragraph ta="center" miw="$6">
							{headPose.yaw}
						</Paragraph>
					</View>
				</YStack>
			</XStack>

			<XStack jc="space-between">
				<Paragraph>Eyes opened:</Paragraph>

				<Paragraph col={!isAwake && isTired ? "$red" : isTired ? "$yellow" : "$green"}>
					{!isAwake && isTired ? "Asleep" : isTired ? "Take a pause" : "Awake"}
				</Paragraph>
			</XStack>

			<XStack jc="space-between">
				<Paragraph>Gaze score:</Paragraph>

				<Paragraph col={!isFocused && isDistracted ? "$red" : isDistracted ? "$yellow" : "$green"}>
					{!isFocused && isDistracted ? "Eyes on the road" : isDistracted ? "Distracted" : "Focused"}
				</Paragraph>
			</XStack>

			<XStack jc="space-between">
				<Paragraph>Head pose:</Paragraph>
				<Paragraph
					col={!isHeadFocused && isHeadDistracted ? "$red" : isHeadDistracted ? "$yellow" : "$green"}>
					{!isHeadFocused && isHeadDistracted
						? "Eyes on the road"
						: isHeadDistracted
							? "Distracted"
							: "Focused"}
				</Paragraph>
			</XStack>
		</YStack>
	);
}
