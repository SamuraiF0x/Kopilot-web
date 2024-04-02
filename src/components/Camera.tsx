import { useRef } from "react";
import Webcam from "react-webcam";
import { tokens } from "../../tamagui.config";
import { useKeypoints } from "../hooks/useKeypoints";
import useMask from "../hooks/useMask";
import { inputResolution, videoConstraints } from "../utils/constants";
import runDetector from "../utils/runDetector";

interface CameraProps {
	setLoaded: (loaded: boolean) => void;
}

export default function Camera({ setLoaded }: CameraProps) {
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

	return (
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
	);
}
