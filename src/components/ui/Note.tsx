import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	createDisclosure,
	Button,
} from "@hope-ui/solid";
import SimpleEditor from "../tiptap/SimpleEditor";
import { HiSolidArrowRight, HiSolidPlus } from "solid-icons/hi";
import { createSignal, Show, Accessor, createEffect } from "solid-js";

import { createNote, NoteType } from "../../api/notes";


interface DrawerProps {
	isOpen: () => boolean;
	onClose: () => void;
	noteData: Accessor<NoteType | undefined>;
}

const NoteDrawer = (props: DrawerProps) => {
	return (
		<Drawer
			opened={props.isOpen()}
			size="lg"
			placement="right"
			onClose={props.onClose}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton
					borderRadius="0.75rem"
					_focus={{ boxShadow: "none" }}
					size="lg"
					icon={<HiSolidArrowRight />}
				/>
				<DrawerHeader fontWeight="bold">{props?.noteData()?.title}</DrawerHeader>

				<DrawerBody>
					<div class="w-full">
						<SimpleEditor noteData={props.noteData} />
					</div>
				</DrawerBody>

				<DrawerFooter></DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

const SingleNote = (props: { note: NoteType }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [ noteData, setNoteData ] = createSignal<NoteType>();

	createEffect(()=> setNoteData(props.note))

	return (
		<>
			<div
				onClick={onOpen}
				class="min-h-[5rem] bg-slate-700 rounded-xl w-full cursor-pointer"
			>
				
				{ noteData()?.title }
			</div>

			<NoteDrawer
				noteData={noteData}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

const NewNote = () => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [noteData, setNoteData] = createSignal<NoteType>();

	const handleNewNote = async () => {
		const { newNote, error } = await createNote("Note", "<p></p>");

		if (newNote) {
			onOpen();
			setNoteData(newNote);
		} else {
			// Send a notif
			console.log("Error creating a new note", error);
		}
	};

	return (
		<>
			<Button
				leftIcon={<HiSolidPlus />}
				_hover={{ bgColor: "$primary", opacity: "1" }}
				bgColor="$primary"
				color="$primaryC"
				opacity=".7"
				fontWeight="bold"
				size="lg"
				onClick={handleNewNote}
			>
				New Note
			</Button>

			<NoteDrawer noteData={noteData} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export { SingleNote, NewNote };
