import { JSXElement, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import type { SetStoreFunction } from "solid-js/store";
import type { NoteType } from "~/api/notes"
import type { FolderType } from "~/api/folders"

type FolderNotesType = FolderType & { notes: NoteType[] }

type StoreType = { notes: NoteType[], folders:FolderNotesType[] }

interface ContextProps{
	store: StoreType
	setStore: SetStoreFunction<StoreType>
}


export const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props:{ children:JSXElement }) {
	const [store, setStore] = createStore<StoreType>({ notes: [], folders: [] });


	return (
		<GlobalContext.Provider value={{ store, setStore }}>
			{props.children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext)!