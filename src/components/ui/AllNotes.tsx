import { For, createSignal, Accessor, Setter } from "solid-js"
import {
   Menu,
   MenuTrigger,
   IconButton,
   MenuContent,
   MenuItem,
   Input,
   InputGroup,
   InputLeftElement,
   MenuGroup,
   MenuLabel,
} from "@hope-ui/solid"
import { FiSliders, FiSearch, FiCheck, FiXCircle } from "solid-icons/fi"
import { NewNote, SingleNote } from "~/components/ui/Note"
import VueControl from "~/components/control/VueControl"
import { NoteType } from "~/api/notes"
import { useGlobalContext, SORT_OPTIONS } from "~/context/store"
import { bakedNotes } from "~/utils/sort"



type EmptyNotesProps = {
   msg?: string
   folderId?: number
}

interface AllNotesProps {
   data: NoteType[]
}




export const EmptyNotes = (props: EmptyNotesProps) => {
   return (
      <div class="flex items-center flex-col space-y-8 justify-center min-h-[40vh]">
         <h2 class="font-semibold text-xl opacity-60 ">{props.msg || "No note found. Create one?"}</h2>
         <NewNote folderId={props.folderId} />
      </div>
   )
}

export default function AllNotes(props: AllNotesProps) {
   const { store } = useGlobalContext()
   const [search, setSearch] = createSignal("")

   return (
      <div class="">
         <VueControl/>

         <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <For each={bakedNotes(props.data, store.filter_notes, search)}>{(note) => <SingleNote note={note} />}</For>
         </div>
      </div>
   )
}
