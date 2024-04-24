import { Settings } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

export default function MenuButton({ setMenuOpen }: { setMenuOpen: (menuOpen: boolean) => void }) {
	return (
		<Button
			w="$6"
			p={0}
			icon={<Settings size="$5" color="$accent" />}
			aria-label="Open menu"
			key="themeMenu"
			animation="smoothBounce"
			onPress={(e) => {
				e.stopPropagation();
				setMenuOpen(true);
			}}
		/>
	);
}
