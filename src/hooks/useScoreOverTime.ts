import { useEffect, useRef, useState } from "react";

/**
 * Estimate the score over percentage of time.
 *
 * @param score
 * @param scoreThreshold - the threshold to compare the score with
 * @param durationTreshold - percentage of the duration to consider the score
 * @param duration - the duration in milliseconds
 * @returns *boolean* - true if the score is below the threshold for a certain percentage of time
 */
export default function useScoreOverTime(
	score: number,
	scoreThreshold: number,
	bothSides = false,
	durationTreshold = 0.2,
	duration = 7500, // TODO change to 60000 (1 minute)
): boolean {
	const [attention, setAttention] = useState(false);
	const timeCount = useRef(0);
	const durationCounter = useRef(0);
	const timerId = useRef<NodeJS.Timeout | null>(null);

	const scoreRef = useRef(score);

	useEffect(() => {
		scoreRef.current = score; // update the ref with the latest value of score
	}, [score]);

	useEffect(() => {
		const countdown = () => {
			if (timeCount.current > 0) {
				timeCount.current--;
				if (
					bothSides
						? scoreRef.current > scoreThreshold || scoreRef.current < -scoreThreshold
						: scoreRef.current < scoreThreshold
				) {
					durationCounter.current++;
				}
			} else {
				if (durationCounter.current >= (duration / 1000) * durationTreshold) setAttention(true);
				else setAttention(false);
				timeCount.current = duration / 1000; // reset the counter
				durationCounter.current = 0;
			}
		};

		timerId.current = setInterval(countdown, 1000); // start the countdown

		return () => {
			if (timerId.current) {
				clearInterval(timerId.current); // clear the interval when the component unmounts
			}
		};
	}, [attention, bothSides, duration, durationTreshold, scoreThreshold]);

	return attention;
}
