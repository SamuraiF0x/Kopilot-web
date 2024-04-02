import { useRef, useState } from "react";
// import "@tensorflow/tfjs";
// Register WebGL backend.
// import "@tensorflow/tfjs-backend-webgl";
// import "@tensorflow-models/facemesh";
// import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import config, { tokens } from "../tamagui.config.ts";
import { Paragraph, Stack, TamaguiProvider, Theme, YStack } from "tamagui";
import useAxis from "./hooks/useAxis.ts";
import DrivingInfo from "./components/DrivingInfo.tsx";
import { inputResolution, videoConstraints } from "./utils/constants.ts";
import runDetector from "./utils/runDetector.ts";

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
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const videoRef = useRef<(EventTarget & HTMLVideoElement) | null>(null);
	const [loaded, setLoaded] = useState(false);
	// const [tension, setTension] = useState(1);
	const [keypoints, setKeypoints] = useState<Keypoint[]>([]);

	const handleVideoLoad = (videoNode: React.SyntheticEvent<HTMLVideoElement, Event>) => {
		const video = videoNode.currentTarget;
		if (video.readyState !== 4) return;
		videoRef.current = video;
		if (canvasRef.current !== null) {
			runDetector(videoRef.current, canvasRef.current, 1, setKeypoints);
		}
		setLoaded(true);
	};

	const handleHeadPoseChange = useAxis(canvasRef.current, keypoints);

	return (
		<TamaguiProvider config={config}>
			<Theme name="dark">
				<YStack fullscreen jc="flex-end" bg="$backgroundTransparent">
					<YStack
						fullscreen
						// mt="$8"
						mb="$10.5"
						bg="$background"
						br="$8"
						bw="$1"
						boc="$red"
						style={{ overflow: "hidden" }}>
						<Stack ai="center" jc="center" w="100%" h="100%">
							{loaded ? <></> : <Paragraph>Loading...</Paragraph>}

							<Webcam
								width={inputResolution.width}
								height={inputResolution.height}
								style={{
									objectFit: "cover",
									visibility: "hidden",
									width: "100%",
									height: "100%",
									borderTopLeftRadius: tokens.radius[8].val,
									borderTopRightRadius: tokens.radius[8].val,
									transform: "rotateY(180deg)",
								}}
								videoConstraints={videoConstraints}
								onLoadedData={handleVideoLoad}
							/>
						</Stack>

						<canvas
							ref={canvasRef}
							width={inputResolution.width - 850}
							height={inputResolution.height + 850}
							style={{
								position: "absolute",
								zIndex: 1000,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								transform: "scale(2.5) rotateY(180deg)",
							}}
						/>
					</YStack>

					<DrivingInfo
						keypoints={keypoints}
						onHeadPoseChange={handleHeadPoseChange}
						canvas={canvasRef.current}
					/>
				</YStack>
			</Theme>
		</TamaguiProvider>
	);
}

export default App;
