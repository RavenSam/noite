import { createEffect, createSignal, Accessor, onMount } from "solid-js"
import { createEditorTransaction, createTiptapEditor } from "solid-tiptap"
import { useColorMode} from "@hope-ui/solid";
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import { NoteType } from "../../api/notes";


interface EditorProps {
   noteData: Accessor<NoteType | undefined>;
   triggerSaving:()=> void
   setBody:()=>void
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
       onUpdate: ({ editor }) =>{
          const content = editor.getHTML()
          props.setBody(content)
          props.triggerSaving(content)
       }
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

   return <div id="simple-editor" onClick={() => editor()?.commands.focus()} class={`prose prose-sm  max-w-none ${colorMode() === "light" ? "" : "prose-invert"}`} ref={ref} />
}