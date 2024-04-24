import { ArrowDownUp, ArrowRightLeft, EyeOff, RotateCw, ScanEye } from "@tamagui/lucide-icons";
import { AnimatePresence, Paragraph, View, XStack, YStack } from "tamagui";
import useDriverInfo from "../hooks/useDriverInfo";
import { useSettings } from "../hooks/useSettings";

export default function DriverStats() {
	// TODO change icons based on state (if head too much FlipLeftRight, show arrow to the right...)
	// TODO also change col & animate (ArrowRight -> animate left to right)

	const { EAR, gazeScore, headPose } = useDriverInfo();

	const { showStats } = useSettings();

	return (
		<AnimatePresence>
			{showStats && (
				<YStack
					key="driverStats"
					gap="$4"
					m="$4"
					animation="smooth"
					enterStyle={{ y: 10 }}
					exitStyle={{ y: 10 }}>
					<XStack jc="space-between">
						<YStack ai="center" gap="$2">
							<EyeOff size="$4" col="$primary" />
							<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
								<Paragraph ta="center" miw="$6">
									{EAR}
								</Paragraph>
							</View>
						</YStack>
						<YStack ai="center" gap="$2">
							<ScanEye size="$4" col="$primary" />
							<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
								<Paragraph ta="center" miw="$6">
									{gazeScore}
								</Paragraph>
							</View>
						</YStack>
						<YStack ai="center" gap="$2">
							<RotateCw size="$4" col="$primary" />
							<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
								<Paragraph ta="center" miw="$6">
									{headPose.roll}
								</Paragraph>
							</View>
						</YStack>

						<YStack ai="center" gap="$2">
							<ArrowDownUp size="$4" col="$primary" />
							<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
								<Paragraph ta="center" miw="$6">
									{headPose.tilt}
								</Paragraph>
							</View>
						</YStack>

						<YStack ai="center" gap="$2">
							<ArrowRightLeft size="$4" col="$primary" />
							<View ai="center" jc="center" px="$2" py="$2" bg="$fusion" br="$1">
								<Paragraph ta="center" miw="$6">
									{headPose.yaw}
								</Paragraph>
							</View>
						</YStack>
					</XStack>
				</YStack>
			)}
		</AnimatePresence>
	);
}
