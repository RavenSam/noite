import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid"
import { NewFolder } from "~/components/ui/Folder"
import FolderOption from "~/components/control/FolderOption"
import { For, createEffect, Show } from "solid-js"
import { folders } from "~/api/folders"
import { useNavigate } from "@solidjs/router"
import { HiSolidFolder } from "solid-icons/hi"
import { useGlobalContext } from "~/context/store"

const EmptyFolders = () => {
   return (
      <div class="flex items-center flex-col space-y-8 justify-center min-h-[5rem]">
         <h2 class="font-normal text-xl">No Folder found. Create one?</h2>
         <NewFolder />
      </div>
   )
}

export default function Folder() {
   const { store, setStore } = useGlobalContext()
   const navigate = useNavigate()

   createEffect(() => setStore("folders", () => [...(folders() || [])]))

   return (
      <div>
         <h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">My Folders</h1>

         <Tabs class="mt-4">
            <TabList>
               <Tab>Folders</Tab>
            </TabList>
            <TabPanel tabIndex="-1">
               <Show when={store.folders.length} fallback={<EmptyFolders />}>
                  <div>
                     <div class="flex items-center justify-end pb-5 pt-1 space-x-3">
                        <NewFolder />
                     </div>
                     <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-4">
                        <For each={store.folders}>
                           {(folder) => (
                              <div
                                 onClick={() => navigate(`/folders/${folder.id}`)}
                                 class="rounded-xl relative group flex flex-col items-center p-4 hover:bg-gradient-to-b from-blue-500 to-blue-600/80 hover:shadow-xl"
                              >
                                 <FolderOption folderId={folder.id} />

                                 <HiSolidFolder size="100%" class="aspect-square -mb-5 " />
                                 <span>{folder.title}</span>
                              </div>
                           )}
                        </For>
                     </div>
                  </div>
               </Show>
            </TabPanel>
         </Tabs>
      </div>
   )
}
