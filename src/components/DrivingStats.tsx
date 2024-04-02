import { ArrowDownUp, ArrowRightLeft, EyeOff, RotateCw, ScanEye } from "@tamagui/lucide-icons";
import { Paragraph, View, XStack, YStack } from "tamagui";
import useDrivingInfo from "../hooks/useDrivingInfo";

export default function DrivingStats() {
	const { EAR, gazeScore, headPose } = useDrivingInfo();

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
		</YStack>
	);
}
