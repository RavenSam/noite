import { Button, createDisclosure, IconButton, Tooltip } from "@hope-ui/solid"
import { HiSolidPlus } from "solid-icons/hi"
import { createSignal, Show, onMount } from "solid-js"
import { createNote, NoteType } from "~/api/notes"
import NoteDrawer from "~/components/ui/NoteDrawer"
import { FiFolder } from "solid-icons/fi"
import { useGlobalContext } from "~/context/store"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import { useLocation, A } from "@solidjs/router"
import NoteOption from "~/components/control/NoteOption"

type NewNoteProps = {
   folderId?: number
   btnFixed?: boolean
}

/**
 * ****************************************************************************************
 * @description single note ui card
 */
export const SingleNote = (props: { note: NoteType }) => {
   const { isOpen, onOpen, onClose } = createDisclosure()
   const [noteData, setNoteData] = createSignal<NoteType>()
   const location = useLocation()

   onMount(() => {
      setNoteData(props.note)
   })

   function localize(t: string) {
      const date = parseISO(t)
      return new Date(
         Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
         )
      )
   }

   return (
      <>
         <div
            onClick={onOpen}
            tabindex="0"
            style={{ "border-color": noteData()?.accent_color }}
            class="relative overflow-hidden group rounded-xl w-full cursor-pointer border-2 p-4 pb-1 shadow-5"
         >
            <div
               style={{ background: noteData()?.accent_color }}
               class="absolute inset-0 -z-10 opacity-0 duration-300 group-hover:opacity-10"
            />

            <div class="flex items-center justify-between space-x-2">
               <Tooltip label={noteData()?.title}>
                  <h2 class="font-semibold truncate">{noteData()?.title}</h2>
               </Tooltip>

               <Show when={location.pathname === "/" && noteData()?.folder}>
                  <Tooltip label="Go to the parent folder">
                     <A
                        onClick={(e: any) => e.stopPropagation()}
                        href={`/folders/${noteData()?.folder}`}
                        class="text-sky-600 opacity-50 hover:opacity-100 p-1"
                     >
                        <FiFolder />
                     </A>
                  </Tooltip>
               </Show>
            </div>

            <div
               class="h-36 my-3 text-sm opacity-50 overflow-hidden prose prose-sm max-w-none dark:prose-invert"
               innerHTML={noteData()?.body}
            />

            <div class="flex items-center">
               <Show when={typeof noteData()?.updated_at === "string"}>
                  <Tooltip
                     label={<span>Updated {format(localize(noteData()?.updated_at!), "MMMM dd,  YYY - H:mm")}</span>}
                  >
                     <span class="text-xs font-semibold opacity-50">
                        {formatDistanceToNow(localize(noteData()?.updated_at!), { addSuffix: true })}
                     </span>
                  </Tooltip>
               </Show>

               <div class="mx-auto " />

               {/*<Favorited />*/}

               <NoteOption noteId={noteData()?.id!} />
            </div>
         </div>

         <NoteDrawer noteData={noteData} isOpen={isOpen} onClose={onClose} />
      </>
   )
}

/**
 * ****************************************************************************************
 * @description create a new note
 */
export const NewNote = (props: NewNoteProps) => {
   const { isOpen, onOpen, onClose } = createDisclosure()
   const [noteData, setNoteData] = createSignal<NoteType>()
   const { setStore } = useGlobalContext()

   const handleNewNote = async () => {
      const { newNote, error } = await createNote("Note", "<p></p>", props.folderId)

      if (newNote) {
         setNoteData(newNote)

         setStore("notes", (l) => [...l, newNote])

         onOpen()
      } else {
         // Send a notif
         console.log("Error creating a new note", error)
      }
   }

   return (
      <>
         <Show
            when={!props.btnFixed}
            fallback={
               <Tooltip placement="left" label="Create a note">
                  <IconButton
                     onClick={handleNewNote}
                     colorScheme="neutral"
                     rounded={"$full"}
                     size="lg"
                     variant="subtle"
                     class="shadow-5 !fixed bottom-5 right-5 opacity-50 backdrop-blur-[5px]"
                     aria-label="New Note"
                     icon={<HiSolidPlus />}
                  />
               </Tooltip>
            }
         >
            <Button
               leftIcon={<HiSolidPlus />}
               colorScheme="neutral"
               variant="outline"
               fontWeight="bold"
               fontSize=".9rem"
               onClick={handleNewNote}
            >
               New Note
            </Button>
         </Show>

         <NoteDrawer noteData={noteData} isOpen={isOpen} onClose={onClose} />
      </>
   )
}
