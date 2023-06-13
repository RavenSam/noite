import { Editor } from "@tiptap/core"
import { IconTypes } from "solid-icons"
import { FiBold, FiCode, FiItalic, FiStar, FiUnderline } from "solid-icons/fi"
import { AiOutlineStrikethrough } from "solid-icons/ai"
import { For } from "solid-js"
import { createEditorTransaction } from "solid-tiptap"

interface ControlProps {
   editor: Editor
   label: string
   key: string
   onChange: () => void
   icon: IconTypes
   isActive?: (editor: Editor) => boolean
}

interface ToolbarProps {
   editor: Editor
}

export default function MenuToolbar(props: ToolbarProps) {
   const controlList = [
      {
         key: "bold",
         label: "Bold",
         icon: FiBold,
         handler: () => props.editor.chain().focus().toggleBold().run(),
         isActive: "unset",
      },
      {
         key: "italic",
         label: "Italic",
         icon: FiItalic,
         handler: () => props.editor.chain().focus().toggleItalic().run(),
         isActive: "unset",
      },
      {
         key: "strike",
         label: "Strike",
         icon: AiOutlineStrikethrough,
         handler: () => props.editor.chain().focus().toggleStrike().run(),
         isActive: "unset",
      },
      {
         key: "underline",
         label: "Underline",
         icon: FiUnderline,
         handler: () => props.editor.chain().focus().toggleUnderline().run(),
         isActive: "unset",
      },
      {
         key: "code",
         label: "Code",
         icon: FiCode,
         handler: () => props.editor.chain().focus().toggleCode().run(),
         isActive: "unset",
      },
   ]

   return (
      <div class="relative rounded-xl text-primaryC bg-primary p-1 overflow-hidden">
         {/* <div class="absolute inset-0 bg-primary opacity-50 -z-10 backdrop-blur-sm" /> */}

         <div class="flex items-center space-x-1">
            <For each={controlList}>
               {(item) => (
                  <Control
                     key={item.key}
                     label={item.label}
                     icon={item.icon}
                     editor={props.editor}
                     onChange={item.handler}
                  />
               )}
            </For>
         </div>
      </div>
   )
}

const Control = (props: ControlProps) => {
   const flag = createEditorTransaction(
      () => props.editor,
      (instance) => {
         if (props.isActive) {
            return props.isActive(instance)
         }
         return instance.isActive(props.key)
      }
   )

   return (
      <button
         class={`w-9 h-9 flex items-center justify-center rounded-xl focus:outline-none focus-visible:ring focus-visible:ring-primaryC focus-visible:ring-opacity-75 ${
            flag() ? "bg-primaryC text-primary" : "hover:bg-white/30 dark:hover:bg-black/20"
         }`}
         aria-label={props.label}
         onclick={props.onChange}
      >
         <props.icon />
      </button>
   )
}
