import { useParams, useNavigate } from "@solidjs/router"
import { For, createSignal, createEffect, Show } from "solid-js"
import { NewNote, SingleNote } from "~/components/ui/Note"
import { NoteType, data } from "~/api/notes"
import { EmptyNotes } from "~/components/ui/AllNotes"
import { useGlobalContext } from "~/context/store"
import { Tabs, TabList, Tab, TabPanel, IconButton } from "@hope-ui/solid"
import { folders, FolderType } from "~/api/folders"
import { sortNotesByDate } from "~/utils/sort"
import { FiChevronLeft } from "solid-icons/fi"
import VueControl from "~/components/control/VueControl"

export default function Folder() {
   const params = useParams()
   const navigate = useNavigate()
   const { store, setStore } = useGlobalContext()
   const [folder, setFolder] = createSignal<FolderType>()
   const [notes, setNotes] = createSignal<NoteType[]>()

   createEffect(() => setFolder(folders()?.filter((f) => f.id === +params.id)[0]))

   createEffect(() => setStore("notes", () => [...(data() || [])]))

   createEffect(() => {
      const folderNotes = store.notes.filter((n) => n.folder === +params.id)
      setNotes(folderNotes)
   })

   return (
      <>
         <div>
            <div class="flex items-center space-x-2">
               <IconButton
                  onClick={() => navigate(-1)}
                  colorScheme="neutral"
                  variant="ghost"
                  aria-label="Expand"
                  icon={<FiChevronLeft class="text-xl" />}
                  opacity={0.5}
               />
               <h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">{folder()?.title}</h1>
            </div>

            <Tabs class="mt-4">
               <TabList>
                  <Tab>Notes</Tab>
               </TabList>
               <TabPanel tabIndex="-1" class="relative">

                  <VueControl folderId={+params.id} />
                  
                  <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                     <For
                        each={sortNotesByDate(notes())}
                        fallback={
                           <EmptyNotes folderId={+params.id} msg="This folder is empty. Why don't you change that?" />
                        }
                     >
                        {(note) => <SingleNote note={note} />}
                     </For>
                  </div>

                 {/* <Show when={notes()?.length! > 0} >
                     <NewNote folderId={+params.id} btnFixed />                  
                  </Show>*/}
               </TabPanel>
            </Tabs>
         </div>
      </>
   )
}
