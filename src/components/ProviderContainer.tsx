import config from "../../tamagui.config";
import { TamaguiProvider, Theme } from "tamagui";
import CameraProvider from "../context/CameraProvider";
import DriverInfoProvider from "../context/DriverInfoProvider";
import KeypointProvider from "../context/KeypointProvider";
import MaskProvider from "../context/MaskProvider";
import SettingsProvider from "../context/SettingsProvider";

export default function ProviderContainer({ children }: { children: React.ReactNode }) {
	return (
		<TamaguiProvider config={config}>
			<Theme name="dark">
				<MaskProvider>
					<KeypointProvider>
						<DriverInfoProvider>
							<CameraProvider>
								<SettingsProvider>{children}</SettingsProvider>
							</CameraProvider>
						</DriverInfoProvider>
					</KeypointProvider>
				</MaskProvider>
			</Theme>
		</TamaguiProvider>
	);
}
