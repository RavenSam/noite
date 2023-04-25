import { For, Resource } from "solid-js";
import {
  Menu,
  MenuTrigger,
  IconButton,
  MenuContent,
  MenuItem,
} from "@hope-ui/solid";
import {
  FiFilter,
  FiPlus,
  FiExternalLink,
  FiRepeat,
  FiEdit,
} from "solid-icons/fi";
import { NewNote, SingleNote } from "./Note";
import { NoteType } from "../../api/notes";


const FilterNotes = () => {
  return (
    <Menu>
      <MenuTrigger
        as={IconButton}
        variant="outline"
        colorScheme="neutral"
        icon={<FiFilter />}
      />
      <MenuContent minW="$60">
        <MenuItem icon={<FiPlus />} command="⌘T">
          New Tab
        </MenuItem>
        <MenuItem icon={<FiExternalLink />} command="⌘N">
          New Window
        </MenuItem>
        <MenuItem icon={<FiRepeat />} command="⌘⇧N">
          Open Closed Tab
        </MenuItem>
        <MenuItem icon={<FiEdit />} command="⌘O">
          Open File...
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

interface AllNotesProps {
  data: NoteType[];
}

export default function AllNotes(props:AllNotesProps) {
  return (
    <div class="">
      <div class="flex items-center justify-end pb-5 pt-1 space-x-2">
        <FilterNotes />
        
        <NewNote />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <For each={props.data}>{(note) => <SingleNote note={note} />}</For>
      </div>
    </div>
  );
}
