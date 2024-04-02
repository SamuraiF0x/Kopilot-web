import { MutableRefObject, createContext } from "react";

export const MaskContext = createContext<MutableRefObject<HTMLCanvasElement | null> | undefined>(undefined);
