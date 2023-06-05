import {
   IconButton,
   Input,
   InputGroup,
   InputLeftElement,
   Menu,
   MenuContent,
   MenuGroup,
   MenuItem,
   MenuLabel,
   MenuTrigger,
} from "@hope-ui/solid"
import { FiCheck, FiSearch, FiSliders, FiXCircle, FiList, FiGrid } from "solid-icons/fi"
import { Accessor, createSignal, For, Setter, Show } from "solid-js"
import { NewNote } from "~/components/ui/Note"
import { SORT_OPTIONS, useGlobalContext } from "~/context/store"

type VueControlType = {
   folderId?: number
}

type SearchNotesProps = { search: Accessor<string>; setSearch: Setter<string> }

export default function VueControl(props: VueControlType) {
   const [search, setSearch] = createSignal("")

   return (
      <div class="flex items-center justify-end pb-5 pt-1 space-x-3">
         <Show when={!props.folderId}>
            <SearchNotes search={search} setSearch={setSearch} />

            <FilterNotes />
         </Show>

         {/* <DisplayToggle /> */}

         <NewNote folderId={props.folderId} />
      </div>
   )
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

const DisplayToggle = () => {
   const [display, setDisplay] = createSignal<"grid" | "list">("grid")

   const handleDisplay = () => {
      setDisplay((prev) => (prev == "grid" ? "list" : "grid"))
   }

   return (
      <IconButton
         aria-label="Vue Toggle"
         variant="outline"
         colorScheme="neutral"
         onClick={handleDisplay}
         icon={display() == "grid" ? <FiGrid /> : <FiList />}
      />
   )
}
