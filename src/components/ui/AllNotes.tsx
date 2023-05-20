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
import { NoteType } from "~/api/notes"
import { useGlobalContext, SORT_OPTIONS } from "~/context/store"
import { bakedNotes } from "~/utils/sort"

type SearchNotesProps = { search: Accessor<string>; setSearch: Setter<string> }

type EmptyNotesProps = {
   msg?: string
   folderId?: number
}

interface AllNotesProps {
   data: NoteType[]
}

const SearchNotes = (props: SearchNotesProps) => {
   return (
      <InputGroup class="flex-1">
         <InputLeftElement pointerEvents="none">
            <FiSearch opacity=".5" />
         </InputLeftElement>

         <Input
            type="Search"
            oninput={(e) => props.setSearch(e.target.value)}
            value={props.search()}
            placeholder="Search notes"
         />
      </InputGroup>
   )
}

const sortList: { name: string; value: SORT_OPTIONS }[] = [
   { name: "edited descending", value: "edited_desc" },
   { name: "edited ascending", value: "edited_asc" },
   { name: "created descending", value: "created_desc" },
   { name: "created ascending", value: "created_asc" },
]

const FilterNotes = () => {
   const { store, setStore } = useGlobalContext()

   return (
      <Menu>
         <MenuTrigger as={IconButton} variant="outline" colorScheme="neutral" icon={<FiSliders />} />
         <MenuContent>
            <MenuGroup>
               <MenuLabel>Sort by</MenuLabel>
               <For each={sortList}>
                  {(el) => (
                     <MenuItem
                        icon={
                           store.filter_notes.sort === el.value ? (
                              <FiCheck class="!text-green-500" />
                           ) : (
                              <FiXCircle class="opacity-0" />
                           )
                        }
                        onSelect={() => setStore("filter_notes", "sort", el.value)}
                        class="capitalize"
                     >
                        {el.name}
                     </MenuItem>
                  )}
               </For>
            </MenuGroup>
            <MenuGroup>
               <MenuLabel>Filter</MenuLabel>
               <MenuItem
                  icon={
                     store.filter_notes.inFolder ? <FiCheck class="!text-green-500" /> : <FiXCircle class="opacity-0" />
                  }
                  onSelect={() => setStore("filter_notes", "inFolder", (el) => !el)}
                  class="capitalize"
               >
                  With Folder
               </MenuItem>
            </MenuGroup>
         </MenuContent>
      </Menu>
   )
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
         <div class="flex items-center justify-end pb-5 pt-1 space-x-3">
            <SearchNotes search={search} setSearch={setSearch} />

            <FilterNotes />

            <NewNote />
         </div>

         <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            <For each={bakedNotes(props.data, store.filter_notes, search)}>{(note) => <SingleNote note={note} />}</For>
         </div>
      </div>
   )
}
