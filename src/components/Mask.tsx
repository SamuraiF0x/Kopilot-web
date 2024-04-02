import useAxis from "../hooks/useAxis";
import useDrivingInfo from "../hooks/useDrivingInfo";
import { useKeypoints } from "../hooks/useKeypoints";
import useMask from "../hooks/useMask";
import { inputResolution } from "../utils/constants";

export default function Mask() {
	const canvasRef = useMask();
	const { headPose } = useDrivingInfo();
	const { keypoints } = useKeypoints();
	useAxis(canvasRef.current, keypoints, headPose.projectedPoints);

	return (
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
	);
}
