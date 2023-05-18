import { Show, For, Resource, createSignal, createEffect } from "solid-js";
import {
  Menu,
  MenuTrigger,
  IconButton,
  MenuContent,
  MenuItem,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Spinner,
  MenuGroup,
  MenuLabel
} from "@hope-ui/solid";
import {
  FiSliders,
  FiPlus,
  FiExternalLink,
  FiRepeat,
  FiEdit,
  FiSearch,
  FiCheck,
  FiXCircle
} from "solid-icons/fi";
import { NewNote, SingleNote } from "~/components/ui/Note";
import { NoteType } from "~/api/notes";
import { useGlobalContext, SORT_OPTIONS, FilterNotesType } from "~/context/store";


const SearchNotes = () => {
  const [searching, setSearching] = createSignal(false);

  return (
    <InputGroup class="flex-1">
    <InputLeftElement pointerEvents="none">
      <FiSearch opacity=".5" />
    </InputLeftElement>

      <Input placeholder="Search notes" />

      <Show when={searching()}>
        <InputRightElement pointerEvents="none">
          <Spinner size="sm" opacity=".5" />
        </InputRightElement>
      </Show>
    </InputGroup>
  );
};

const sortList: { name:string, value:SORT_OPTIONS }[] = [ {name:"edited descending", value:"edited_desc"} , 
  {name:"edited ascending", value:"edited_asc"} , 
  {name:"created descending", value:"created_desc"} , 
  {name:"created ascending", value:"created_asc"} ]


const FilterNotes = () => {
  const { store, setStore } = useGlobalContext();


  return (
    <Menu>
      <MenuTrigger
        as={IconButton}
        variant="outline"
        colorScheme="neutral"
        icon={<FiSliders />}
      />
 <MenuContent>
    <MenuGroup>
      <MenuLabel>Sort by</MenuLabel>
      <For each={ sortList } >
        { ( el ) => 
        <MenuItem 
        icon={store.filter_notes.sort === el.value ? <FiCheck class="!text-green-500" /> : <FiXCircle class="opacity-0" /> } 
        onSelect={()=> setStore("filter_notes", "sort", el.value )}
        class="capitalize"
        >
          {el.name}
        </MenuItem> }        
      </For>
    </MenuGroup>
    <MenuGroup>
      <MenuLabel>Filter</MenuLabel>
      <MenuItem 
        icon={store.filter_notes.inFolder ? <FiCheck  class="!text-green-500" /> : <FiXCircle class="opacity-0" /> } 
        onSelect={()=> setStore("filter_notes", "inFolder", (el) => !el )}
        class="capitalize"
        >
          With Folder
        </MenuItem>
    </MenuGroup>
  </MenuContent> 
    </Menu>
  );
};

const backedNotes = (notes:NoteType[], filter_notes:FilterNotesType) => {
  const filtered = notes.filter(n => filter_notes.inFolder ? n : n.folder == null )

  const sorted = filtered.sort((a, b)=>{
    let du1 = new Date(a.updated_at).valueOf()
    let du2 = new Date(b.updated_at).valueOf()
    let dc1 = new Date(a.created_at).valueOf()
    let dc2 = new Date(b.created_at).valueOf()

    switch (filter_notes.sort) {
      case "edited_asc":
        return du1 - du2
        break;

      case "edited_desc":
        return du2 - du1
        break;

      case "created_asc":
        return dc1 - dc2
        break;

      case "created_desc":
        return dc2 - dc1
        break;
      
      default:
        return 0
        break;
    }
  })

  return sorted
}

interface AllNotesProps {
  data: NoteType[];
}


export default function AllNotes(props: AllNotesProps) {
  const { store, setStore } = useGlobalContext();

  return (
    <div class="">
      <div class="flex items-center justify-end pb-5 pt-1 space-x-3">
        <SearchNotes />

        <FilterNotes />

        <NewNote />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <For each={backedNotes(props.data, store.filter_notes)}>{(note) => <SingleNote note={note} />}</For>
      </div>
    </div>
  );
}
