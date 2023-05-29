import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid"
import { FoldersTab } from "~/components/ui/Folder"
import { createEffect } from "solid-js"
import { folders } from "~/api/folders"
import { useGlobalContext } from "~/context/store"



export default function Folder() {
   const { store, setStore } = useGlobalContext()
   

   createEffect(() => setStore("folders", () => [...(folders() || [])]))

   return (
      <div>
         <h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">My Folders</h1>

         <Tabs class="mt-4">
            <TabList>
               <Tab>Folders</Tab>
            </TabList>
            <TabPanel tabIndex="-1">
               <FoldersTab/>
            </TabPanel>
         </Tabs>
      </div>
   )
}
