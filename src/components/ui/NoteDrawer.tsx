import SimpleEditor from "../tiptap/SimpleEditor";
import { Accessor, createSignal, onMount, Show, createResource, createEffect } from "solid-js";
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
import { NoteType, updateNote } from "../../api/notes";
import { useGlobalContext } from "../../context/store"


const TIMEOUT = 800;


const options = { initial_drawer_size:"lg", editor_max_width: "800px" }



interface DrawerProps {
	isOpen: () => boolean;
	onClose: () => void;
	noteData: Accessor<NoteType | undefined>;
	fullScreen?: boolean;
}

// const [data, { mutate, refetch }] = createResource(fetchNotes);

export default function NoteDrawer(props: DrawerProps) {
	const [fullScreen, setFullScreen] = createSignal(false);
	const [title, setTitle] = createSignal("");
	const [body, setBody] = createSignal("");
	const [isSaving, setIsSaving] = createSignal<"saved" | boolean>(false);
	const { setStore } = useGlobalContext()

	onMount(() => {
		if (props.fullScreen) {
			setFullScreen(props.fullScreen);
		}
	});

	createEffect(()=> setTitle(props.noteData()?.title || ""))
	createEffect(()=> setBody(props.noteData()?.body || ""))

	const saving = async (body:string, newTitle?:string) => {
		setIsSaving(true)
		let id = props.noteData()?.id
		if(typeof id === "undefined") throw new Error("No note id.")

		let t = newTitle ? newTitle : title()
		const updatedNote = await updateNote(id, t, body)
		setStore("notes", (n) => n.id === id, { title: t, body })

		setIsSaving("saved")

		setTimeout(() => setIsSaving(false), 3000)		

	}

	const triggerSaving = debounce((content:string, newTitle?:string) => saving(content, newTitle), TIMEOUT)


	const handleTitle = (e:any) => triggerSaving(body() , e.target.value);

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
					<Show when={isSaving()} >
						<span class={`text-sm absolute right-[7rem] top-[1rem] py-2 ${isSaving() !== "saved" ? "animate-fadeInOut" : "opacity-70" }`} >
							<Show when={isSaving() === "saved"} fallback="Saving" >Saved</Show>
						</span>
					</Show>

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
