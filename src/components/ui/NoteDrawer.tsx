import SimpleEditor from "~/components/tiptap/SimpleEditor"
import { Accessor, createSignal, onMount, Show, createEffect } from "solid-js"
import { HiOutlineArrowRight } from "solid-icons/hi"
import { FiMaximize, FiMinimize } from "solid-icons/fi"
import {
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   IconButton,
} from "@hope-ui/solid"
import { debounce } from "@solid-primitives/scheduled"
import { NoteType, updateNote } from "~/api/notes"
import { useGlobalContext } from "~/context/store"

const TIMEOUT = 800

const options = { initial_drawer_size: "lg", editor_max_width: "800px" }

interface DrawerProps {
   isOpen: () => boolean
   onClose: () => void
   noteData: Accessor<NoteType | undefined>
   fullScreen?: boolean
}

export default function NoteDrawer(props: DrawerProps) {
   const [fullScreen, setFullScreen] = createSignal(false)
   const [title, setTitle] = createSignal("")
   const [body, setBody] = createSignal("")
   const [isSaving, setIsSaving] = createSignal<"saved" | boolean>(false)
   const { setStore } = useGlobalContext()

   onMount(() => {
      if (props.fullScreen) {
         setFullScreen(props.fullScreen)
      }
   })

   createEffect(() => setTitle(props.noteData()?.title || ""))
   createEffect(() => setBody(props.noteData()?.body || ""))

   const saving = async (body: string, newTitle?: string) => {
      setIsSaving(true)
      let id = props.noteData()?.id
      if (typeof id === "undefined") throw new Error("No note id.")

      const t = title().length > 1 ? title() : "untitled note"
      const updatedNote = await updateNote(id, t, body)

      setIsSaving("saved")

      setTimeout(() => setIsSaving(false), 3000)
   }

   // Made soto keep focus
   const handleClose = () => {
      let id = props.noteData()?.id
      const t = title().length > 1 ? title() : "untitled note"
      setStore("notes", (n) => n.id === id, { title: t, body: body() })
      props.onClose()
   }

   const triggerSaving = debounce((content: string, newTitle?: string) => saving(content, newTitle), TIMEOUT)

   const handleTitle = (e: any) => {
      triggerSaving(body(), e.target.value)
      setTitle(e.target.value)
   }

   return (
      <Drawer
         onClose={handleClose}
         opened={props.isOpen()}
         // @ts-ignore
         size={fullScreen() ? "full" : options.initial_drawer_size}
         placement="right"
      >
         <DrawerOverlay />
         <DrawerContent pos="relative" class="!py-8">
            <DrawerHeader
               bgColor="$backgroundC"
               class="sticky z-[2] top-[1.5rem] flex items-center space-x-3 max-w-7xl mx-auto w-full"
            >
               <input
                  placeholder="Note title"
                  type="text"
                  value={title()}
                  oninput={handleTitle}
                  class="border-none font-bold flex-1 bg-transparent outline-none"
               />

               <Show when={isSaving()}>
                  <span
                     class={`text-xs right-[7rem] py-2 ${isSaving() !== "saved" ? "animate-fadeInOut" : "opacity-70"}`}
                  >
                     <Show when={isSaving() === "saved"} fallback="Saving">
                        Saved
                     </Show>
                  </span>
               </Show>

               <IconButton
                  onClick={() => setFullScreen((prev) => !prev)}
                  colorScheme="neutral"
                  variant="ghost"
                  aria-label="Expand"
                  icon={fullScreen() ? <FiMinimize /> : <FiMaximize />}
               />

               <DrawerCloseButton borderRadius="0.75rem" pos="unset" size="lg" icon={<HiOutlineArrowRight />} />
            </DrawerHeader>

            <DrawerBody class="">
               <div style={{ "max-width": options.editor_max_width }} class="max-w-full mx-auto">
                  <SimpleEditor noteData={props.noteData} setBody={setBody} triggerSaving={triggerSaving} />
               </div>
            </DrawerBody>
         </DrawerContent>
      </Drawer>
   )
}
