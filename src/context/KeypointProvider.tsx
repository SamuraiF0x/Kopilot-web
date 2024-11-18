import { useState } from "react";
import type { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import { KeypointContext } from "./KeypointContext";

interface KeypointProviderProps {
	children: React.ReactNode;
}

export default function KeypointProvider({ children }: KeypointProviderProps) {
	const [keypoints, setKeypoints] = useState<Keypoint[]>([]);

	return <KeypointContext.Provider value={{ keypoints, setKeypoints }}>{children}</KeypointContext.Provider>;
}
