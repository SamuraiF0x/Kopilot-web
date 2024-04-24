import useAxis from "../hooks/useAxis";
import useDriverInfo from "../hooks/useDriverInfo";
import { useKeypoints } from "../hooks/useKeypoints";
import useMask from "../hooks/useMask";
import { useSettings } from "../hooks/useSettings";
import { inputResolution } from "../utils/constants";

export default function Mask() {
	const canvasRef = useMask();
	const { headPose } = useDriverInfo();
	const { keypoints } = useKeypoints();
	useAxis(canvasRef.current, keypoints, headPose.projectedPoints);

	const { stickMask } = useSettings();

	// ! FIX menu button when canvasRef on mask

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
				transform: `${stickMask ? "scale(1)" : "scale(2.5)"} rotateY(180deg)`,
			}}
		/>
	);
}
