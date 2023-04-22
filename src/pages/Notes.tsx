import {
	For,
	createResource,
	createEffect,
	Show,
	onMount,
	createSignal,
} from "solid-js";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import { NoteType, fetchNotes } from "../api/notes";
import { SingleNote, NewNote } from "../components/ui/Note";

const [data] = createResource(fetchNotes);

const AllNotes = () => {
	return (
		<div class="py-4">
			<div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
				<For each={data()}>{(note) => <SingleNote note={note} />}</For>
			</div>
		</div>
	);
};

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
	return (
		<div class="">
			<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
				My Notes
			</h1>
			<Show when={data()?.length} fallback={<EmptyNotes />}>
				<Tabs class="mt-4">
					<TabList>
						<Tab>All notes</Tab>
						<Tab>Folders</Tab>
					</TabList>
					<TabPanel>
						<AllNotes />
					</TabPanel>
					<TabPanel>2</TabPanel>
				</Tabs>
			</Show>
		</div>
	);
}
