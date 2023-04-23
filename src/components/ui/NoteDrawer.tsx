import SimpleEditor from "../tiptap/SimpleEditor";
import { Accessor, createSignal, onMount } from "solid-js";
import { HiOutlineArrowRight } from "solid-icons/hi";
import { FiMaximize, FiMinimize } from "solid-icons/fi";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	createDisclosure,
	IconButton,
} from "@hope-ui/solid";

import { NoteType } from "../../api/notes";

const options = { initial_drawer_size:"lg", editor_max_width: "800px" }

interface DrawerProps {
	isOpen: () => boolean;
	onClose: () => void;
	noteData: Accessor<NoteType | undefined>;
	fullScreen?: boolean;
}

export default function NoteDrawer(props: DrawerProps) {
	const [fullScreen, setFullScreen] = createSignal(false);

	onMount(() => {
		if (props.fullScreen) {
			setFullScreen(props.fullScreen);
		}
	});

	return (
		<Drawer
			opened={props.isOpen()}
			// @ts-ignore
			size={fullScreen() ? "full" : options.initial_drawer_size}
			placement="right"
			onClose={props.onClose}
		>
			<DrawerOverlay />
			<DrawerContent>
				<div class="mt-10 relative">
					<IconButton
						onClick={() => setFullScreen((prev) => !prev)}
						colorScheme="neutral"
						variant="ghost"
						pos="absolute"
						right="4rem"
						top="1rem"
						aria-label="Expand"
						icon={fullScreen() ? <FiMinimize /> : <FiMaximize />}
					/>

					<DrawerCloseButton
						borderRadius="0.75rem"
						size="lg"
						icon={<HiOutlineArrowRight />}
					/>

					<DrawerHeader maxW="70%" fontWeight="bold">
						{props?.noteData()?.title}
					</DrawerHeader>

					<DrawerBody>
						<div style={{ "max-width": options.editor_max_width }} class="w-full mx-auto">
							<SimpleEditor noteData={props.noteData} />
						</div>
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
