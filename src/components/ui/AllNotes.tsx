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
} from "@hope-ui/solid";
import {
  FiSliders,
  FiPlus,
  FiExternalLink,
  FiRepeat,
  FiEdit,
  FiSearch,
} from "solid-icons/fi";
import { NewNote, SingleNote } from "~/components/ui/Note";
import { NoteType } from "~/api/notes";
import { useGlobalContext } from "~/context/store";

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

export default function AllNotes(props: AllNotesProps) {
  return (
    <div class="">
      <div class="flex items-center justify-end pb-5 pt-1 space-x-3">
        <SearchNotes />

        <FilterNotes />

        <NewNote />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <For each={props.data}>{(note) => <SingleNote note={note} />}</For>
      </div>
    </div>
  );
}
