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
import { debounce } from "@solid-primitives/scheduled"


import { NoteType } from "../../api/notes";

const TIMEOUT = 5000;


const options = { initial_drawer_size:"lg", editor_max_width: "800px" }



interface DrawerProps {
	isOpen: () => boolean;
	onClose: () => void;
	noteData: Accessor<NoteType | undefined>;
	fullScreen?: boolean;
}


export default function NoteDrawer(props: DrawerProps) {
	const [fullScreen, setFullScreen] = createSignal(false);
	const [title, setTitle] = createSignal("");
	const [body, setBody] = createSignal("");

	onMount(() => {
		if (props.fullScreen) {
			setFullScreen(props.fullScreen);
		}

		setTitle(props.noteData()?.title)
	});

	const saving = (body:string, newTitle?:string) => {
		console.log({ body, title: newTitle ? newTitle : title() })
	}

	const triggerSaving = debounce((content, newTitle) => saving(content, newTitle), TIMEOUT)


	const handleTitle = (e) => triggerSaving(body() , e.target.value);

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

					<DrawerHeader maxW="70%">
						<input type="text" value={title()} onChange={handleTitle} class="border-none font-bold w-full bg-transparent outline-none"/>
					</DrawerHeader>

					<DrawerBody>
						<div style={{ "max-width": options.editor_max_width }} class="w-full mx-auto">
							<SimpleEditor noteData={props.noteData} setBody={setBody} triggerSaving={triggerSaving} />
						</div>
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
