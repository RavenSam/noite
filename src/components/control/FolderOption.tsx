import { createSignal } from "solid-js"
import {
   ModalContent,
   ModalHeader,
   Menu,
   MenuTrigger,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   Button,
   IconButton,
   MenuContent,
   createDisclosure,
   MenuItem,
   Modal,
   ModalOverlay,
   Input,
   Tooltip
} from "@hope-ui/solid"
import { FiMoreHorizontal, FiTrash2, FiEdit2 } from "solid-icons/fi"
import { deleteFolder, updateFolder } from "~/api/folders"

export default function FolderOption(props: { folderId: number }) {
   return (
      <Menu>
         <Tooltip label="Folder options">
            <MenuTrigger
               as={IconButton}
               variant="ghost"
               marginRight="-10px"
               fontSize="1.2rem"
               colorScheme="neutral"
               class="opacity-0 ml-auto -mb-8 group-hover:opacity-100 focus-visible:opacity-100"
               _hover={{ bgColor: "transparent" }}
               onClick={(e: any) => e.stopPropagation()}
               icon={<FiMoreHorizontal />}
            />
         </Tooltip>
         <MenuContent minW="$60">
            <RenameFolder folderId={props.folderId} />

            <DeleteFolder folderId={props.folderId} />
         </MenuContent>
      </Menu>
   )
}

const DeleteFolder = (props: { folderId: number }) => {
   const { isOpen, onOpen, onClose } = createDisclosure()

   return (
      <>
         <MenuItem onSelect={onOpen} icon={<FiTrash2 />}>
            Delete
         </MenuItem>
         <Modal centered initialFocus="#cancel_delete" opened={isOpen()} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalCloseButton />
               <ModalHeader>Delete folder</ModalHeader>
               <ModalBody>
                  <p>
                     Deleting this folder will permanently remove all the notes inside.
                     <br />
                     Do you want to proceed with the deletion?
                  </p>
               </ModalBody>
               <ModalFooter class="space-x-3">
                  <Button id="cancel_delete" onClick={onClose} variant="subtle" colorScheme="neutral">
                     Cancel
                  </Button>
                  <Button onClick={() => deleteFolder(props.folderId)} colorScheme="danger">
                     Delete
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

const RenameFolder = (props: { folderId: number }) => {
   const { isOpen, onOpen, onClose } = createDisclosure()
   const [title, setTitle] = createSignal("")

   const saveCustom = async () => {
      updateFolder(props.folderId, title())
      onClose()
   }

   return (
      <>
         <MenuItem onSelect={onOpen} icon={<FiEdit2 />}>
            Rename
         </MenuItem>
         <Modal centered initialFocus="#folder_title" opened={isOpen()} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalCloseButton />
               <ModalHeader>Customize note</ModalHeader>
               <ModalBody>
                  <Input
                     id="folder_title"
                     type="text"
                     value={title()}
                     onChange={(e: any) => setTitle(e.target.value)}
                  />
               </ModalBody>
               <ModalFooter class="space-x-3">
                  <Button id="cancel_delete" onClick={onClose} variant="subtle" colorScheme="neutral">
                     Cancel
                  </Button>
                  <Button onClick={saveCustom} bgColor="$primary" color="$primaryC" colorScheme="neutral">
                     Save
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
