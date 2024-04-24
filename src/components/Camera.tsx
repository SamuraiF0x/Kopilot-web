import { useRef } from "react";
import Webcam from "react-webcam";
import { tokens } from "../../tamagui.config";
import { useCamera } from "../hooks/useCamera";
import { useKeypoints } from "../hooks/useKeypoints";
import useMask from "../hooks/useMask";
import { useSettings } from "../hooks/useSettings";
import { inputResolution, videoConstraints } from "../utils/constants";
import runDetector from "../utils/runDetector";

export default function Camera() {
	const { setLoaded } = useCamera();

	const { setKeypoints } = useKeypoints();

	const videoRef = useRef<(EventTarget & HTMLVideoElement) | null>(null);
	// const [tension, setTension] = useState(1);

	const canvasRef = useMask();

	const handleVideoLoad = (videoNode: React.SyntheticEvent<HTMLVideoElement, Event>) => {
		const video = videoNode.currentTarget;
		if (video.readyState !== 4) return;
		videoRef.current = video;
		if (canvasRef.current !== null) {
			runDetector(videoRef.current, canvasRef.current, 1, setKeypoints);
		}
		setLoaded(true);
	};

	const { showCameraFeed } = useSettings();

	return (
		<Webcam
			width={inputResolution.width}
			height={inputResolution.height}
			style={{
				objectFit: "cover",
				opacity: showCameraFeed ? 1 : 0,
				width: "100%",
				height: "100%",
				borderTopLeftRadius: tokens.radius[8].val,
				borderTopRightRadius: tokens.radius[8].val,
				transform: "rotateY(180deg)",
			}}
			videoConstraints={videoConstraints}
			onLoadedData={handleVideoLoad}
		/>
	);
}
