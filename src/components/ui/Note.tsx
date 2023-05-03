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
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Tooltip,
	Input
} from "@hope-ui/solid";
import { HiSolidPlus } from "solid-icons/hi";
import { createSignal, Show, lazy, createEffect, onMount } from "solid-js";
import {
	createNote,
	NoteType,
	deleteNote,
	updateNoteAccent,
} from "~/api/notes";
import { createFolder } from "~/api/folders"
import NoteDrawer from "~/components/ui/NoteDrawer";
import { FiMoreHorizontal, FiTrash2, FiPenTool, FiStar } from "solid-icons/fi";
import { useGlobalContext } from "~/context/store";
import { format, formatDistanceToNow, parseISO, addMinutes } from "date-fns";
import { useNavigate } from "@solidjs/router";


export const NewFolder = () =>{
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [title, setTitle] = createSignal("")
	const navigate = useNavigate()

		const handleNewFolder = async () => {
		const { newFolder, error } = await createFolder(title());

		if (newFolder) {

			// Redirect to folder page :folderid
			onClose()
			navigate(`/folders/${newFolder.id}`);
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
				onClick={onOpen}
			>
				New Folder
			</Button>
			<Modal
				centered
				initialFocus="#folder_title"
				opened={isOpen()}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Delete note</ModalHeader>
					<ModalBody>
						<form onSubmit={e=>{
							e.preventDefault()
							handleNewFolder()
						}}>
							<Input id="folder_title" onChange={e=> setTitle(e.target.value)} placeholder="Search notes" />
						</form>
					</ModalBody>
					<ModalFooter class="space-x-3">
						<Button
							onClick={onClose}
							variant="subtle"
							colorScheme="neutral"
						>
							Cancel
						</Button>
						<Button
							onClick={handleNewFolder}
							colorScheme="success"
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}


const DeleteNote = (props: { noteId: number }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();

	return (
		<>
			<MenuItem onSelect={onOpen} icon={<FiTrash2 />}>
				Delete
			</MenuItem>
			<Modal
				centered
				initialFocus="#cancel_delete"
				opened={isOpen()}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Delete note</ModalHeader>
					<ModalBody>
						<p>Are you sure you want to delete this note?</p>
					</ModalBody>
					<ModalFooter class="space-x-3">
						<Button
							id="cancel_delete"
							onClick={onClose}
							variant="subtle"
							colorScheme="neutral"
						>
							Cancel
						</Button>
						<Button
							onClick={() => deleteNote(props.noteId)}
							colorScheme="danger"
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const CutomizeNote = (props: { noteId: number }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const { store, setStore } = useGlobalContext();
	const [clr, setClr] = createSignal("");

	const saveCustom = async () => {
		updateNoteAccent(props.noteId, clr());
		setStore("notes", (n) => n.id === props.noteId, "accent_color", clr());
		onClose();
	};

	return (
		<>
			<MenuItem onSelect={onOpen} icon={<FiPenTool />}>
				Cuttomize
			</MenuItem>
			<Modal
				centered
				initialFocus="#cancel_delete"
				opened={isOpen()}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Customize note</ModalHeader>
					<ModalBody>
						<input
							type="color"
							value={clr()}
							onChange={(e: any) => setClr(e.target.value)}
						/>
					</ModalBody>
					<ModalFooter class="space-x-3">
						<Button
							id="cancel_delete"
							onClick={onClose}
							variant="subtle"
							colorScheme="neutral"
						>
							Cancel
						</Button>
						<Button
							onClick={saveCustom}
							bgColor="$primary"
							color="$primaryC"
							colorScheme="neutral"
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const NoteOption = (props: { noteId: number }) => {
	return (
		<Menu>
			<MenuTrigger
				as={IconButton}
				variant="ghost"
				marginRight="-10px"
				fontSize="1.2rem"
				colorScheme="neutral"
				onClick={(e: any) => e.stopPropagation()}
				icon={<FiMoreHorizontal />}
			/>
			<MenuContent minW="$60">
				<DeleteNote noteId={props.noteId} />

				<CutomizeNote noteId={props.noteId} />
			</MenuContent>
		</Menu>
	);
};

const Favorited = () => {
	const [fav, setFav] = createSignal(false);

	const handleFav = (e: any) => {
		e.stopPropagation();
		setFav((prev) => !prev);
	};

	return (
		<IconButton
			aria-label="Favorite"
			variant="ghost"
			marginRight="5px"
			fontSize="1.2rem"
			onClick={handleFav}
			colorScheme={fav() ? "warning" : "neutral"}
			icon={<FiStar fill={fav() ? "#ffb224" : "transparent"} />}
			class="!bg-transparent"
		/>
	);
};

const SingleNote = (props: { note: NoteType }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [noteData, setNoteData] = createSignal<NoteType>();

	onMount(() => {
		setNoteData(props.note);
	});

	function localize(t: string) {
		const date = parseISO(t);
		return new Date(
			Date.UTC(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds()
			)
		);
	}

	return (
		<>
			<div
				onClick={onOpen}
				tabindex="0"
				style={{ "border-color": noteData()?.accent_color }}
				class="relative overflow-hidden group rounded-xl w-full cursor-pointer border-2 p-4 pb-1 shadow-5"
			>
				<div
					style={{ background: noteData()?.accent_color }}
					class="absolute inset-0 -z-10 opacity-0 duration-300 group-hover:opacity-10"
				/>

				<div class="flex items-center justify-between">
					<h2 class="font-semibold">{noteData()?.title}</h2>
				</div>

				<div
					class="h-36 my-3 text-sm opacity-70 overflow-hidden"
					innerHTML={noteData()?.body}
				/>

				<div class="flex items-center">
					<Show when={typeof noteData()?.updated_at === "string"}>
						<Tooltip
							label={<span>Updated {format(
								localize(noteData()?.updated_at!),
								"MMMM dd,  YYY - hh:mm"
							)}</span>}
						>
							<span class="text-xs font-semibold opacity-50">
								{formatDistanceToNow(
									localize(noteData()?.updated_at!),
									{ addSuffix: true }
								)}
							</span>
						</Tooltip>
					</Show>

					<div class="mx-auto "/>

					{/*<Favorited />*/}

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
	const { setStore } = useGlobalContext();

	const handleNewNote = async () => {
		const { newNote, error } = await createNote("Note", "<p></p>");

		if (newNote) {
			setNoteData(newNote);

			setStore("notes", (l) => [...l, newNote]);

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
