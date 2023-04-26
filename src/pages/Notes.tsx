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
import { SingleNote, NewNote } from "~/components/ui/Note";
import AllNotes from "~/components/ui/AllNotes";
import { useGlobalContext } from "~/context/store"

const EmptyNotes = () => {
	return (
		<Tabs class="mt-4">
			<TabList>
				<Tab>All notes</Tab>
			</TabList>
			<TabPanel>
				<div class="flex items-center flex-col space-y-8 justify-center min-h-[5rem]">
					<h2 class="font-normal text-xl">No note found. Create one?</h2>
					<NewNote />
				</div>
			</TabPanel>
		</Tabs>
	);
};

export default function Notes() {
	const { store, setStore } = useGlobalContext()

	createEffect(()=>{
		setStore("notes", ()=> [...(data() || [])])
	})

	return (
		<div>
			<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
				My Notes
			</h1>

			<Show when={store.notes.length} fallback={<EmptyNotes />}>
				<Tabs class="mt-4">
					<TabList>
						<Tab>All notes</Tab>
						<Tab>Folders</Tab>
					</TabList>
					<TabPanel>
						<AllNotes data={store.notes} />
					</TabPanel>
					<TabPanel>
						2
					</TabPanel>
				</Tabs>
			</Show>
		</div>
	);
}
