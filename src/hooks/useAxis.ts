import { useEffect, useState } from "react";
import { Keypoint } from "@tensorflow-models/face-landmarks-detection";
import { tokens } from "../../tamagui.config";
import { keypointIndex } from "../utils/constants";
import drawLine from "../utils/drawAxisLine";

export default function useAxis(canvas: HTMLCanvasElement | null, keypoints: Keypoint[]) {
	const [projectedPoints, setProjectedPoints] = useState<number[]>([]);

	const handleHeadPoseChange = (projectedPoints: number[]) => {
		setProjectedPoints(projectedPoints);
	};

	useEffect(() => {
		if (canvas === null) return;
		const ctx = canvas.getContext("2d");

		if (ctx !== null && keypoints.length > 0) {
			ctx.lineWidth = 5;

			// ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			const animationFrameId = requestAnimationFrame(() => {
				const startPoint = [keypoints[keypointIndex.noseTip].x, keypoints[keypointIndex.noseTip].y];

				drawLine(ctx, tokens.color.red.val, startPoint, [projectedPoints[0], projectedPoints[1]]);
				drawLine(ctx, tokens.color.green.val, startPoint, [projectedPoints[2], projectedPoints[3]]);
				drawLine(ctx, tokens.color.blue.val, startPoint, [projectedPoints[4], projectedPoints[5]]);
			});
			return () => {
				cancelAnimationFrame(animationFrameId);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keypoints]);

	return handleHeadPoseChange;
}
