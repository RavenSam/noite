import { useColorMode, IconButton, Tooltip } from "@hope-ui/solid";
import { HiOutlineSun, HiOutlineMoon } from "solid-icons/hi";

export default function ColorModeSwitcher() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Tooltip
			label={colorMode() === "light" ? "Switch to dark" : "Switch to light"}
			placement="right"
		>
			<IconButton
				class="!w-12 !h-12 !text-xl"
				variant="ghost"
				color="$primary"
				_hover={{ bgColor: "transparent" }}
				aria-label={colorMode() === "light" ? "dark" : "light"}
				onClick={toggleColorMode}
				icon={
					colorMode() === "light" ? <HiOutlineMoon /> : <HiOutlineSun />
				}
			/>
		</Tooltip>
	);
}
