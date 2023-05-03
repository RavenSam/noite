import { invoke } from "@tauri-apps/api";
import { createResource, createSignal, createEffect } from "solid-js";

export type FolderType = {
	id: number;
	title: string;
	created_at:string;
	updated_at:string;
};

export const fetchFolder = async () => {
	const string_data: string = await invoke("folders_list");
	const folder: FolderType[] = await JSON.parse(string_data);
	return folder;
};

const [folders, { mutate, refetch }] = createResource(fetchFolder);


	export async function createFolder(title: string) {
	try {
		const string_data: string = await invoke("create_folder", { title });
		const newFolder:FolderType = await JSON.parse(string_data);
		refetch();
		return { newFolder, error: false };
	} catch (e: any) {
		console.log(e);
		return { error: e };
	}
}

export { folders, refetch };