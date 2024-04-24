import { Settings } from "@tamagui/lucide-icons";
import { H5, Sheet, View, XStack } from "tamagui";
import CloseMenuButton from "./CloseMenuButton";
import MenuButton from "./MenuButton";
import SettingsList from "./SettingsList";

interface MenuProps {
	menuOpen: boolean;
	setMenuOpen: (open: boolean) => void;
}

const MenuHeader = ({ setMenuOpen }: { setMenuOpen: (open: boolean) => void }) => (
	<XStack ai="center" jc="space-between" py="$4" px="$5.5" bg="$backgroundTransparent" bblr="$8" bbrr="$8">
		<XStack ai="center" gap="$4">
			<Settings size="$5" />
			<H5>Settings</H5>
		</XStack>
		<CloseMenuButton setMenuOpen={setMenuOpen} />
	</XStack>
);

export default function MenuSheet({ menuOpen, setMenuOpen }: MenuProps) {
	return (
		<View onPress={(e) => e.stopPropagation()}>
			<MenuButton setMenuOpen={setMenuOpen} />

			<Sheet
				zIndex={200000}
				open={menuOpen}
				modal
				snapPoints={[100]}
				animation="smooth"
				dismissOnSnapToBottom
				dismissOnOverlayPress>
				<Sheet.Overlay animation="smooth" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

				<Sheet.Frame
					jc="flex-start"
					br="$2"
					onPress={(e) => {
						e.stopPropagation();
						setMenuOpen(false);
					}}>
					<MenuHeader setMenuOpen={setMenuOpen} />
					<SettingsList />
				</Sheet.Frame>
			</Sheet>
		</View>
	);
}
