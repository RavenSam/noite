import { Button, createDisclosure } from "@hope-ui/solid";
import { HiSolidPlus } from "solid-icons/hi";
import { createSignal, Show, lazy, createEffect } from "solid-js";
import { createNote, NoteType } from "../../api/notes";
import NoteDrawer from "./NoteDrawer";

const SingleNote = (props: { note: NoteType }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [noteData, setNoteData] = createSignal<NoteType>();

	createEffect(() => setNoteData(props.note));

	return (
		<>
			<div
				onClick={onOpen}
				class="min-h-[5rem] bg-slate-700 rounded-xl w-full cursor-pointer"
			>
				{noteData()?.title}
			</div>

			<NoteDrawer noteData={noteData} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

const NewNote = () => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [noteData, setNoteData] = createSignal<NoteType>();

	const handleNewNote = async () => {
		const { newNote, error } = await createNote("Note", "<p></p>");

		if (newNote) {
			setNoteData(newNote);

			console.log(newNote) /// retuns 1 not the created note

			onOpen();
		} else {
			// Send a notif
			console.log("Error creating a new note", error);
		}
	};

	return (
		<>
			<Button
				leftIcon={<HiSolidPlus />}
				colorScheme="neutral"
				variant="outline"
				fontWeight="bold"
				fontSize=".9rem"
				onClick={handleNewNote}
			>
				New Note
			</Button>

			<NoteDrawer noteData={noteData} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export { SingleNote, NewNote };
// _hover={{ bgColor: "$primary", opacity: "1" }}
// 				bgColor="$primary"
// 				color="$primaryC"
// 				opacity=".7"