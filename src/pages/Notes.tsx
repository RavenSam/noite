import {
	For,
	createResource,
	createEffect,
	Show,
	onMount,
	createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import { NoteType, fetchNotes, data } from "~/api/notes";
import { SingleNote, NewNote, NewFolder } from "~/components/ui/Note";
import AllNotes from "~/components/ui/AllNotes";
import { useGlobalContext } from "~/context/store";

const EmptyNotes = () => {
	return (
		<div class="flex items-center flex-col space-y-8 justify-center min-h-[5rem]">
			<h2 class="font-normal text-xl">No note found. Create one?</h2>
			<NewNote />
		</div>
	);
};



export default function Notes() {
	const { store, setStore } = useGlobalContext();

	createEffect(() => {
		setStore("notes", () => [...(data() || [])]);
		console.log(data());
	});

	return (
		<div>
			<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
				My Notes
			</h1>

			<Tabs class="mt-4">
				<TabList>
					<Tab>Notes</Tab>
				</TabList>
				<TabPanel tabIndex="-1">
					<Show when={store.notes.length} fallback={<EmptyNotes />}>
						<AllNotes data={store.notes} />
					</Show>
				</TabPanel>
			</Tabs>
		</div>
	);
}
