import {
	Button,
	createDisclosure,
	Menu,
	MenuTrigger,
	IconButton,
	MenuContent,
	MenuItem,
	Modal,
	ModalOverlay,
	ModalContent,ModalCloseButton,ModalHeader,ModalBody, ModalFooter, Tooltip
} from "@hope-ui/solid";
import { HiSolidPlus } from "solid-icons/hi";
import { createSignal, Show, lazy, createEffect } from "solid-js";
import { createNote, NoteType, deleteNote } from "../../api/notes";
import NoteDrawer from "./NoteDrawer";
import { FiMoreHorizontal, FiTrash2, FiPenTool } from "solid-icons/fi";
import { useGlobalContext } from "../../context/store"

const DeleteNote = (props:{noteId: number}) =>{
	const { isOpen, onOpen, onClose } = createDisclosure()



  return (
    <>
      <MenuItem onSelect={onOpen} icon={<FiTrash2 />}>Delete</MenuItem>
      <Modal centered initialFocus="#cancel_delete" opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Delete note</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this note?</p>
          </ModalBody>
          <ModalFooter class="space-x-3" >
            <Button id="cancel_delete" onClick={onClose} variant="subtle" colorScheme="neutral" >Cancel</Button>
            <Button onClick={()=> deleteNote(props.noteId)} colorScheme="danger">Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


const CutomizeNote = (props:{noteId: number}) =>{
	const { isOpen, onOpen, onClose } = createDisclosure()



  return (
    <>
      <MenuItem onSelect={onOpen} icon={<FiPenTool />}>Cuttomize</MenuItem>
      <Modal centered initialFocus="#cancel_delete" opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Customize note</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this note?</p>
          </ModalBody>
          <ModalFooter class="space-x-3" >
            <Button id="cancel_delete" onClick={onClose} variant="subtle" colorScheme="neutral" >Cancel</Button>
            <Button  bgColor="$primary" color="$primaryC" colorScheme="neutral">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



const NoteOption = (props:{noteId: number}) => {
	return (
		<Menu>
			<MenuTrigger
				as={IconButton}
				variant="ghost"
				marginRight="-10px"
				fontSize="1.2rem"
				colorScheme="neutral"
				onClick={(e) => e.stopPropagation()}
				icon={<FiMoreHorizontal />}
			/>
			<MenuContent minW="$60">
				<DeleteNote noteId={props.noteId} />

				<CutomizeNote noteId={props.noteId} />
			</MenuContent>
		</Menu>
	);
};

const SingleNote = (props: { note: NoteType }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [noteData, setNoteData] = createSignal<NoteType>();

	createEffect(() => setNoteData(props.note));

	return (
		<>
			<div
				onClick={onOpen}
				style={{ "border-color": noteData()?.accent_color }}
				class="rounded-xl w-full cursor-pointer border-2 p-4 pb-1 shadow-5"
			>
				<div class="flex items-center justify-between">
					<h2 class="font-semibold">{noteData()?.title}</h2>
				</div>

	

				<div class="h-36 my-3 text-sm opacity-70 overflow-hidden" innerHTML={noteData()?.body} />			
	

				<div class="flex items-center justify-between">
					<Tooltip label={`Updated at ${noteData()?.updated_at}`}>
						<span class="text-xs font-semibold opacity-50">10:00PM</span>
					</Tooltip>
					<NoteOption noteId={noteData()?.id!} />
				</div>
			</div>

			<NoteDrawer noteData={noteData} isOpen={isOpen} onClose={onClose} />
		</>
	);
};

const NewNote = () => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [noteData, setNoteData] = createSignal<NoteType>();
	const { setStore } = useGlobalContext()

	const handleNewNote = async () => {
		const { newNote, error } = await createNote("Note", "<p></p>");

		if (newNote) {
			setNoteData(newNote);

			setStore("notes", l => [...l, newNote])

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
