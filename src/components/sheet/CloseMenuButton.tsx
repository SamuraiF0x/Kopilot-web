import { X } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

export default function CloseMenuButton({ setMenuOpen }: { setMenuOpen: (menuOpen: boolean) => void }) {
	return (
		<Button
			als="flex-end"
			w="$6"
			p="$3"
			enterStyle={{ o: 0, y: -10 }}
			exitStyle={{ o: 0, y: -10 }}
			aria-label="Close menu"
			iconAfter={X}
			scaleIcon={2}
			key="themeMenu"
			animation="smoothBounce"
			onPress={(e) => {
				e.stopPropagation();
				setMenuOpen(false);
			}}
		/>
	);
}
