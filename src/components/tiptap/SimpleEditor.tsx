import { createEffect, createSignal, Accessor, onMount, Setter } from "solid-js"
import { createEditorTransaction, createTiptapEditor } from "solid-tiptap"
import { useColorMode } from "@hope-ui/solid"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import { NoteType } from "../../api/notes"
import { Scheduled } from "@solid-primitives/scheduled"

interface EditorProps {
   noteData: Accessor<NoteType | undefined>
   triggerSaving: Scheduled<[content: string, wCount: number, newTitle?: string | undefined]>
   setBody: Setter<string>
   setWordCount: Setter<number>
}

export default function SimpleEditor(props: EditorProps) {
   const [editable, setEditable] = createSignal(true)
   const { colorMode } = useColorMode()

   let ref!: HTMLDivElement

   const editor = createTiptapEditor(() => ({
      editable: editable(),
      element: ref!,
      extensions: [StarterKit, Typography],
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

   return (
      <div
         id="simple-editor"
         onClick={() => editor()?.commands.focus()}
         class="prose max-w-none dark:prose-invert"
         ref={ref}
      />
   )
}
