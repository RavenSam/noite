import {
   Button,
   createDisclosure,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalCloseButton,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Input,
} from "@hope-ui/solid"
import { createSignal, Show, For } from "solid-js"
import { createFolder, FolderType } from "~/api/folders"
import { useNavigate } from "@solidjs/router"
import { HiSolidPlus } from "solid-icons/hi"
import { useGlobalContext } from "~/context/store"
import FolderOption from "~/components/control/FolderOption"
import { HiSolidFolder } from "solid-icons/hi"

export const NewFolder = () => {
   const { isOpen, onOpen, onClose } = createDisclosure()
   const [title, setTitle] = createSignal("")
   const navigate = useNavigate()

   const handleNewFolder = async () => {
      const { newFolder, error } = await createFolder(title())

      if (newFolder) {
         // Redirect to folder page :folderid
         onClose()
         navigate(`/folders/${newFolder.id}`)
      } else {
         // Send a notif
         console.log("Error creating a new note", error)
      }
   }

   return (
      <>
         <Button
            leftIcon={<HiSolidPlus />}
            colorScheme="neutral"
            variant="outline"
            fontWeight="bold"
            fontSize=".9rem"
            onClick={onOpen}
         >
            New Folder
         </Button>
         <Modal centered initialFocus="#folder_title" opened={isOpen()} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalCloseButton />
               <ModalHeader>Create folder</ModalHeader>
               <ModalBody>
                  <form
                     onSubmit={(e) => {
                        e.preventDefault()
                        handleNewFolder()
                     }}
                  >
                     <Input id="folder_title" onChange={(e) => setTitle(e.target.value)} placeholder="Folder name" />
                  </form>
               </ModalBody>
               <ModalFooter class="space-x-3">
                  <Button onClick={onClose} variant="subtle" colorScheme="neutral">
                     Cancel
                  </Button>
                  <Button onClick={handleNewFolder} bgColor="$primary" color="$primaryC" colorScheme="neutral">
                     Create
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

const EmptyFolders = () => {
   return (
      <div class="flex items-center flex-col space-y-8 justify-center min-h-[40vh]">
         <h2 class="font-semibold text-xl opacity-60">No Folder found. Create one?</h2>
         <NewFolder />
      </div>
   )
}

export const FoldersTab = () => {
   const { store } = useGlobalContext()

   return (
      <Show when={store.folders.length} fallback={<EmptyFolders />}>
         <div>
            <div class="flex items-center justify-end pb-5 pt-1 space-x-3">
               <NewFolder />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-4 lg:grid-cols-6 gap-4">
               <For each={store.folders}>{(folder) => <SingleFolder folder={folder} />}</For>
            </div>
         </div>
      </Show>
   )
}

const SingleFolder = (props: { folder: FolderType }) => {
   const navigate = useNavigate()

   return (
      <div
         onClick={() => navigate(`/folders/${props.folder.id}`)}
         class="relative overflow-hidden rounded-xl group flex flex-col items-center p-4 group hover:shadow-xl"
      >
         <div class="absolute inset-0 -z-10 bg-[var(--hope-colors-primary)] opacity-0 group-hover:opacity-10" />
         <FolderOption folderId={props.folder.id} />

         <HiSolidFolder size="100%" class="aspect-square -mb-5 " />

         <span>{props.folder.title}</span>
      </div>
   )
}
