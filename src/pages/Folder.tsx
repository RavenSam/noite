import { useParams, useNavigate } from "@solidjs/router";
import { For, createSignal, createEffect } from "solid-js";
import { SingleNote } from "~/components/ui/Note";
import { NoteType, fetchNotes, data } from "~/api/notes";
import { EmptyNotes } from "~/components/ui/AllNotes";
import { useGlobalContext } from "~/context/store";
import { Tabs, TabList, Tab, TabPanel, IconButton } from "@hope-ui/solid";
import { folders, FolderType } from "~/api/folders";
import { FiChevronLeft } from "solid-icons/fi";

export default function Folder() {
	const params = useParams();
	const navigate = useNavigate();
	const { store, setStore } = useGlobalContext();
	const [folder, setFolder] = createSignal<FolderType>();
	const [notes, setNotes] = createSignal<NoteType[]>();

	createEffect(() =>
		setFolder(folders()?.filter((f) => f.id === +params.id)[0])
	);

	createEffect(() => setStore("notes", () => [...(data() || [])]));

	createEffect(() => {
		const folderNotes = store.notes.filter((n) => n.folder === +params.id);
		setNotes(folderNotes);
	});

	return (
		<>
			<div>
				<div class="flex items-center space-x-2">
					<IconButton
						onClick={() => navigate(-1)}
						colorScheme="neutral"
						variant="ghost"
						aria-label="Expand"
						icon={<FiChevronLeft class="text-xl" />}
					/>
					<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
						{folder()?.title}
					</h1>
				</div>

				<Tabs class="mt-4">
					<TabList>
						<Tab>Notes</Tab>
					</TabList>
					<TabPanel tabIndex="-1">
						<div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
							<For
								each={notes()}
								fallback={<EmptyNotes folderId={+params.id} />}
							>
								{(note) => <SingleNote note={note} />}
							</For>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</>
	);
}
