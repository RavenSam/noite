import { createEffect, createSignal, Accessor } from "solid-js"
import { createEditorTransaction, createTiptapEditor } from "solid-tiptap"
import { useColorMode} from "@hope-ui/solid";
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import { NoteType } from "../../api/notes";


interface EditorProps {
noteData: Accessor<NoteType | undefined>;
}

export default function SimpleEditor(props:EditorProps) {
   const [editable, setEditable] = createSignal(true)
   const { colorMode } = useColorMode();

   let ref!: HTMLDivElement


   const editor = createTiptapEditor(() => ({

      editable: editable(),
      element: ref!,
      extensions: [StarterKit, Typography],
      content: props.noteData()?.body || "<p></p>",
   }))

   createEffect(() => {
      if (!editor) {
         return undefined
      }

      createEditorTransaction(editor, (editor) => editor?.setEditable(editable()))
   })

   return <div id="simple-editor" class={`prose prose-sm  max-w-none ${colorMode() === "light" ? "" : "prose-invert"}`} ref={ref} />
}