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
import { createSignal } from "solid-js"
import { createFolder } from "~/api/folders"
import { useNavigate } from "@solidjs/router"
import { HiSolidPlus } from "solid-icons/hi"

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
               <ModalHeader>Delete note</ModalHeader>
               <ModalBody>
                  <form
                     onSubmit={(e) => {
                        e.preventDefault()
                        handleNewFolder()
                     }}
                  >
                     <Input id="folder_title" onChange={(e) => setTitle(e.target.value)} placeholder="Search notes" />
                  </form>
               </ModalBody>
               <ModalFooter class="space-x-3">
                  <Button onClick={onClose} variant="subtle" colorScheme="neutral">
                     Cancel
                  </Button>
                  <Button onClick={handleNewFolder} bgColor="$primary" color="$primaryC" colorScheme="neutral">
                     Save
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
