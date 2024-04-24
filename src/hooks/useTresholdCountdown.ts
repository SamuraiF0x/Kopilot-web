import { useEffect, useRef, useState } from "react";

/**
 * Estimate the score over time.
 *
 * @param score
 * @param treshold - the treshold to compare the score with
 * @returns *boolean* - true if the score is below the treshold
 */
export default function useTresholdCountdown(score: number, treshold: number, bothSides = false) {
	const [isTriggered, setTrigger] = useState(false);
	const timerRef = useRef<number | null>(null);

	useEffect(() => {

		const startTimer = () => {
			timerRef.current = window.setTimeout(() => {
				setTrigger(false);
			}, 5000); // 5 seconds
		};

		const clearTimer = () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
				timerRef.current = null; // Reset timer
			}
		};

		if (bothSides ? score > treshold || score < -treshold : score < treshold) {
			if (timerRef.current === null) startTimer();
		} else {
			setTrigger(true);
			clearTimer();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score]);

	return isTriggered;
}
