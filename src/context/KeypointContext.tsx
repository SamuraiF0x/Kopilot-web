import { createContext } from "react";
import type { Keypoint } from "@tensorflow-models/face-landmarks-detection";

export const KeypointContext = createContext<{
	keypoints: Keypoint[];
	setKeypoints: React.Dispatch<React.SetStateAction<Keypoint[]>>;
}>({
	keypoints: [],
	setKeypoints: () => {},
});
