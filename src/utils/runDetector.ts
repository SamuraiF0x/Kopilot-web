import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";

export default async function runDetector(
	video: (EventTarget & HTMLVideoElement) | null,
	canvas: HTMLCanvasElement,
	tension: number,
	callback: (keypoints: faceLandmarksDetection.Keypoint[]) => void,
) {
	const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

	const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig = {
		runtime: "mediapipe",
		maxFaces: 1,
		refineLandmarks: true,
		solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
	};

	const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

	let faces: faceLandmarksDetection.Face[] = [];

	const detect = async (net: faceLandmarksDetection.FaceLandmarksDetector) => {
		const estimationConfig = { flipHorizontal: false };

		if (video === null) return;
		faces = await net.estimateFaces(video, estimationConfig);
		const face = faces[0];

		const ctx = canvas.getContext("2d");

		if (ctx !== null) {
			requestAnimationFrame(() => drawMesh(face, ctx, tension));
		}

		if (faces.length > 0) {
			callback(face.keypoints);
		}

		requestAnimationFrame(() => detect(detector));
	};

	requestAnimationFrame(() => detect(detector));
}
