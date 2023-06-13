import { createEffect, createSignal, Accessor, onMount, Setter, Show, onCleanup } from "solid-js"
import { createEditorTransaction, createTiptapEditor } from "solid-tiptap"
import { useColorMode } from "@hope-ui/solid"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import { NoteType } from "~/api/notes"
import { Scheduled } from "@solid-primitives/scheduled"
import BubbleMenu from "@tiptap/extension-bubble-menu"
import Underline from "@tiptap/extension-underline"
import MenuToolbar from "./MenuToolbar"

interface EditorProps {
   noteData: Accessor<NoteType | undefined>
   triggerSaving: Scheduled<[content: string, wCount: number, newTitle?: string | undefined]>
   setBody: Setter<string>
   setWordCount: Setter<number>
}

export default function SimpleEditor(props: EditorProps) {
   const [editable, setEditable] = createSignal(true)
   const { colorMode } = useColorMode()
   const [menu, setMenu] = createSignal<HTMLDivElement>()

   let ref!: HTMLDivElement

   const editor = createTiptapEditor(() => ({
      editable: editable(),
      element: ref!,
      extensions: [
         StarterKit,
         Underline,
         Typography,
         Placeholder.configure({ placeholder: "Write something..." }),
         BubbleMenu.configure({ element: menu()!, tippyOptions: { placement: "bottom" } }),
      ],

      content: props.noteData()?.body || "<p></p>",
      onUpdate: ({ editor }) => {
         const content = editor.getHTML()
         const text = editor.getText()

         const count = text.split(/\S+/).length - 1

         props.setBody(content)
         props.setWordCount(count)

         props.triggerSaving(content, count)
      },
   }))

   createEffect(() => {
      if (!editor) {
         return undefined
      }

      createEditorTransaction(editor, (editor) => editor?.setEditable(editable()))
   })

   onMount(() => {
      editor()?.commands.focus("end")
   })

   onCleanup(() => {
      editor()?.destroy() 
   })

   return (
      <>
         <div ref={setMenu}>
            <Show when={editor()} keyed>
               {(instance) => <MenuToolbar editor={instance} />}
            </Show>
         </div>

         <div
            id="simple-editor"
            onClick={() => editor()?.commands.focus()}
            class="prose max-w-none dark:prose-invert"
            ref={ref}
         />
      </>
   )
}
