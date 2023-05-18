import { JSXElement, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import type { SetStoreFunction } from "solid-js/store";
import type { NoteType } from "~/api/notes"
import type { FolderType } from "~/api/folders"

type FolderNotesType = FolderType & { notes: NoteType[] }

export type SORT_OPTIONS = "edited_desc" | "edited_asc" | "created_desc" | "created_asc" 

export type FilterNotesType = { inFolder: boolean, sort: SORT_OPTIONS }

type StoreType = { notes: NoteType[], folders:FolderNotesType[], filter_notes: FilterNotesType }

interface ContextProps{
	store: StoreType
	setStore: SetStoreFunction<StoreType>
}


export const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props:{ children:JSXElement }) {
	const [store, setStore] = createStore<StoreType>({ 
		notes: [], 
		folders: [], 
		filter_notes: { inFolder:false, sort: "edited_desc" } 
	});


	return (
		<GlobalContext.Provider value={{ store, setStore }}>
			{props.children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext)!