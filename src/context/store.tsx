import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import type { SetStoreFunction } from "solid-js/store";
import type { NoteType } from "~/api/notes"

interface ContextProps{
	store: {notes: NoteType[]}
	setStore: SetStoreFunction<{notes: NoteType[]}>
}


export const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props) {
	const [store, setStore] = createStore<{notes:NoteType[]}>({notes: []});


	return (
		<GlobalContext.Provider value={{ store, setStore }}>
			{props.children}
		</GlobalContext.Provider>
	);
}

export const useGlobalContext = () => useContext(GlobalContext)!