import { Label, Switch, XStack } from "tamagui";

interface SwitchWithLabelProps {
	label: string;
	icon: JSX.Element;
	defaultChecked?: boolean;
	enabled: boolean;
	onSwitch: (value: boolean) => void;
}

export default function SwitchWithLabel(props: SwitchWithLabelProps) {
	const id = `switch-${props.label.replace(/ /g, "-")}-${props.defaultChecked ?? ""}}`;

	return (
		<XStack ai="center" jc="space-between">
			<XStack ai="center" gap="$4">
				{props.icon}

				<Label jc="flex-end" pr="$0" size="$3" htmlFor={id} pressStyle={{ col: "$accent" }}>
					{props.label}
				</Label>
			</XStack>

			<Switch
				id={id}
				size="$6"
				bg="$backgroundTransparent"
				boc={props.enabled ? "$accent" : "$backgroundPress"}
				defaultChecked={props.defaultChecked}
				checked={props.enabled}
				onCheckedChange={(val) => props.onSwitch(val)}>
				<Switch.Thumb
					scale={0.85}
					b={1}
					animation="bouncy"
					bg={props.enabled ? "$accent" : "$backgroundPress"}
				/>
			</Switch>
		</XStack>
	);
}
