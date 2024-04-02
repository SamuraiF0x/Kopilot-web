import { useRef } from "react";
import { MaskContext } from "./MaskContext";

interface MaskProviderProps {
	children: React.ReactNode;
}

export default function MaskProvider({ children }: MaskProviderProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	return <MaskContext.Provider value={canvasRef}>{children}</MaskContext.Provider>;
}
