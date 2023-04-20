import { createEffect, createSignal } from "solid-js"
import { createEditorTransaction, createTiptapEditor } from "solid-tiptap"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"

export default function SimpleEditor() {
   const [editable, setEditable] = createSignal(true)

   let ref!: HTMLDivElement

   const editor = createTiptapEditor(() => ({
      editable: editable(),
      element: ref!,
      extensions: [StarterKit, Typography],
      content: `<p>Simple Editor</p>`,
   }))

   createEffect(() => {
      if (!editor) {
         return undefined
      }

      createEditorTransaction(editor, (editor) => editor?.setEditable(editable()))
   })

   return <div id="simple-editor prose max-w-none" ref={ref} />
}