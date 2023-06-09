import { A, useLocation } from "@solidjs/router"
import { JSXElement, createSignal, For } from "solid-js"
import { FiFeather, FiFolder, FiSettings } from "solid-icons/fi"
import { Tooltip } from "@hope-ui/solid"
import ColorModeSwitcher from "~/components/ui/ColorModeSwitcher"

const mainPages = [
   { name: "My Notes", icon: <FiFeather />, path: "/", class: "" },
   { name: "My Folders", icon: <FiFolder />, path: "/folders", class: "" },

   {
      name: "Settings",
      icon: <FiSettings />,
      path: "/settings",
      class: "!mt-auto opacity-0 pointer-events-none",
   },
]

const LinkItem = ({ item }: { item: typeof mainPages[0] }) => {
   const location = useLocation()

   return (
      <A
         href={item.path}
         class={`flex items-center rounded-xl duration-300 ${item.class} ${
            item.path === location.pathname ? "text-primaryC bg-primary" : "hover:text-gray-700 text-gray1"
         }`}
      >
         <Tooltip label={item.name} placement="right">
            <span class="text-xl w-12 h-12 flex items-center justify-center">{item.icon}</span>
         </Tooltip>
      </A>
   )
}

interface SideNavProps {
   children: JSXElement
}

export default function SideNav(props: SideNavProps) {
   const [menuWidth, setMenuWidth] = createSignal("4rem")

   return (
      <>
         <main style={{ "margin-left": menuWidth() }} class="p-2 pt-12">
            <div class="max-w-6xl mx-auto">{props.children}</div>
         </main>

         <div style={{ width: menuWidth() }} class="fixed top-0 left-0 bottom-0 pt-10">
            <nav class="flex flex-col px-2 py-4 h-full space-y-1">
               <For each={mainPages}>{(item) => <LinkItem item={item} />}</For>

               <ColorModeSwitcher />
            </nav>
         </div>
      </>
   )
}
