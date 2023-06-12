import { createSignal } from "solid-js"
import {
   Button,
   createDisclosure,
   Menu,
   MenuTrigger,
   IconButton,
   MenuContent,
   MenuItem,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalCloseButton,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Tooltip,
} from "@hope-ui/solid"
import { FiMoreHorizontal, FiTrash2, FiStar, FiEdit2 } from "solid-icons/fi"
import { useGlobalContext } from "~/context/store"
import { deleteNote, updateNoteAccent } from "~/api/notes"

export default function NoteOption(props: { noteId: number }) {
   return (
      <Menu>
         <Tooltip label="Note options">
            <MenuTrigger
               as={IconButton}
               variant="ghost"
               marginRight="-10px"
               fontSize="1.2rem"
               colorScheme="neutral"
               class="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
               _hover={{ bgColor: "transparent" }}
               onClick={(e: any) => e.stopPropagation()}
               icon={<FiMoreHorizontal />}
            />
         </Tooltip>
         <MenuContent minW="$60">
            <CutomizeNote noteId={props.noteId} />

            <DeleteNote noteId={props.noteId} />
         </MenuContent>
      </Menu>
   )
}

const DeleteNote = (props: { noteId: number }) => {
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
               <ModalHeader>Delete note</ModalHeader>
               <ModalBody>
                  <p>Are you sure you want to delete this note?</p>
               </ModalBody>
               <ModalFooter class="space-x-3">
                  <Button id="cancel_delete" onClick={onClose} variant="subtle" colorScheme="neutral">
                     Cancel
                  </Button>
                  <Button onClick={() => deleteNote(props.noteId)} colorScheme="danger">
                     Delete
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

const CutomizeNote = (props: { noteId: number }) => {
   const { isOpen, onOpen, onClose } = createDisclosure()
   const { store, setStore } = useGlobalContext()
   const [clr, setClr] = createSignal("")

   const saveCustom = async () => {
      updateNoteAccent(props.noteId, clr())
      setStore("notes", (n) => n.id === props.noteId, "accent_color", clr())
      onClose()
   }

   return (
      <>
         <MenuItem onSelect={onOpen} icon={<FiEdit2 />}>
            Customize
         </MenuItem>
         <Modal centered initialFocus="#cancel_delete" opened={isOpen()} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalCloseButton />
               <ModalHeader>Customize note</ModalHeader>
               <ModalBody>
                  <div class="flex items-center justify-between p-2">
                     <label for="accent_color">Accent color</label>
                     <input
                        id="accent_color"
                        type="color"
                        class="border-none w-8 h-8 rounded-xl bg-transparent cursor-pointer"
                        value={store.notes.filter((n) => n.id == props.noteId)[0].accent_color}
                        onChange={(e: any) => setClr(e.target.value)}
                     />
                  </div>
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

export const Favorited = () => {
   const [fav, setFav] = createSignal(false)

   const handleFav = (e: any) => {
      e.stopPropagation()
      setFav((prev) => !prev)
   }

   return (
      <IconButton
         aria-label="Favorite"
         variant="ghost"
         marginRight="5px"
         fontSize="1.2rem"
         onClick={handleFav}
         colorScheme={fav() ? "warning" : "neutral"}
         icon={<FiStar fill={fav() ? "#ffb224" : "transparent"} />}
         class="!bg-transparent"
      />
   )
}
