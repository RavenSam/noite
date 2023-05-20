import { createEffect, Show } from "solid-js"
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid"
import { data } from "~/api/notes"
import AllNotes, { EmptyNotes } from "~/components/ui/AllNotes"
import { useGlobalContext } from "~/context/store"

export default function Notes() {
   const { store, setStore } = useGlobalContext()

   createEffect(() => setStore("notes", () => [...(data() || [])]))

   return (
      <div>
         <h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">My Notes</h1>

         <Tabs class="mt-4">
            <TabList>
               <Tab>Notes</Tab>
            </TabList>
            <TabPanel tabIndex="-1">
               <Show when={store.notes.length} fallback={<EmptyNotes />}>
                  <AllNotes data={store.notes} />
               </Show>
            </TabPanel>
         </Tabs>
      </div>
   )
}
