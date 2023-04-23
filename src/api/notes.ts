import { invoke } from "@tauri-apps/api";
import { createResource, createSignal, createEffect } from "solid-js";

export type NoteType = {
	id: number;
	title: string;
	body: string;
};

export const fetchNotes = async () => {
	const string_data: string = await invoke("notes_list");
	const notes: NoteType[] = await JSON.parse(string_data);
	return notes;
};

const [data, { mutate, refetch }] = createResource(fetchNotes);

export async function createNote(title: string, body: string) {
	try {
		const string_data: string = await invoke("note_create", { title, body });
		const newNote = await JSON.parse(string_data);
		refetch();
		return { newNote, error: false };
	} catch (e: any) {
		console.log(e);
		return { error: e };
	}
}

export { data };
