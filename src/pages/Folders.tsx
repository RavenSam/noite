import {
	Tabs,
	TabList,
	Tab,
	ModalContent,
	TabPanel,
	ModalHeader,
	Menu,
	MenuTrigger,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	IconButton,
	MenuContent,
	createDisclosure,
	MenuItem,
	Modal,
	ModalOverlay,
	Input
} from "@hope-ui/solid";
import { NewFolder } from "~/components/ui/Note";
import { For, createEffect, createSignal, Show } from "solid-js";
import { folders, deleteFolder, updateFolder } from "~/api/folders";
import { useNavigate } from "@solidjs/router";
import { HiSolidFolder } from "solid-icons/hi";
import { FiMoreHorizontal, FiTrash2, FiPenTool } from "solid-icons/fi";
import { useGlobalContext } from "~/context/store";

const EmptyFolders = () => {
	return (
		<div class="flex items-center flex-col space-y-8 justify-center min-h-[5rem]">
			<h2 class="font-normal text-xl">No Folder found. Create one?</h2>
			<NewFolder />
		</div>
	);
};

const DeleteFolder = (props: { folderId: number }) => {
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
						<p>Are you sure you want to delete this folder? All notes withing this folder will also be deleted.</p>
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
							onClick={() => deleteFolder(props.folderId)}
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

const RenameFolder = (props: { folderId: number }) => {
	const { isOpen, onOpen, onClose } = createDisclosure();
	const [title, setTitle] = createSignal("");

	const saveCustom = async () => {
		updateFolder(props.folderId, title());
		onClose();
	};

	return (
		<>
			<MenuItem onSelect={onOpen} icon={<FiPenTool />}>
				Rename
			</MenuItem>
			<Modal
				centered
				initialFocus="#folder_title"
				opened={isOpen()}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalHeader>Customize note</ModalHeader>
					<ModalBody>
						<Input
							id="folder_title"
							type="text"
							value={title()}
							onChange={(e: any) => setTitle(e.target.value)}
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

const FolderOption = (props: { folderId: number }) => {
	return (
		<Menu>
			<MenuTrigger
				as={IconButton}
				variant="ghost"
				marginRight="-10px"
				fontSize="1.2rem"
				colorScheme="neutral"
				class="opacity-0 ml-auto -mb-8 group-hover:opacity-100 focus-visible:opacity-100"
				_hover={{ bgColor: "transparent" }}
				onClick={(e: any) => e.stopPropagation()}
				icon={<FiMoreHorizontal />}
			/>
			<MenuContent minW="$60">
				<DeleteFolder folderId={props.folderId} />

				<RenameFolder folderId={props.folderId} />
			</MenuContent>
		</Menu>
	);
};

export default function Folder() {
	const { store, setStore } = useGlobalContext();
	const navigate = useNavigate();

	createEffect(() => setStore("folders", () => [...(folders() || [])]));

	return (
		<div>
			<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
				My Folders
			</h1>


			<Tabs class="mt-4">
				<TabList>
					<Tab>Folders</Tab>
				</TabList>
				<TabPanel tabIndex="-1">
				<Show when={store.folders.length} fallback={<EmptyFolders />}>
					<div>
						<div class="flex items-center justify-end pb-5 pt-1 space-x-3">
							<NewFolder />
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-4">
							<For each={store.folders} >
								{(folder) => (
									<div
										onClick={() => navigate(`/folders/${folder.id}`)}
										class="rounded-xl relative group flex flex-col items-center p-4 hover:bg-gradient-to-b from-blue-500 to-blue-600/80 hover:shadow-xl"
									>
										<FolderOption folderId={folder.id} />

										<HiSolidFolder
											size="100%"
											class="aspect-square -mb-5 "
										/>
										<span>{folder.title}</span>
									</div>
								)}
							</For>
						</div>
					</div>
					</Show>
				</TabPanel>
			</Tabs>
		</div>
	);
}
