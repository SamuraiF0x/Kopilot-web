import { createContext } from "react";
import { Keypoint } from "@tensorflow-models/face-landmarks-detection";

export const KeypointContext = createContext<{
	keypoints: Keypoint[];
	setKeypoints: React.Dispatch<React.SetStateAction<Keypoint[]>>;
}>({
	keypoints: [],
	setKeypoints: () => {},
});
