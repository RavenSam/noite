import { A, useLocation } from "@solidjs/router";
import { JSXElement, createSignal, For } from "solid-js";
import { HiOutlineHome, HiOutlinePencilAlt } from "solid-icons/hi";

const mainPages = [
	{ name: "Home", icon: <HiOutlineHome />, path: "/" },
	{ name: "Notes", icon: <HiOutlinePencilAlt />, path: "/notes" },
];

interface SideNavProps {
	children: JSXElement;
}

export default function SideNav(props: SideNavProps) {
	const [menuWidth, setMenuWidth] = createSignal("13rem");
	const location = useLocation();

	return (
		<div class="bg-gray-900 text-gray-200">
			<div
				style={{ width: menuWidth() }}
				class="fixed top-0 left-0 bottom-0"
			>
				<nav class="p-2 space-y-1">
					<For each={mainPages}>
						{(item) => (
							<A
								href={item.path}
								class={`flex items-center rounded-xl ${
									item.path === location.pathname
										? "bg-sky-600 text-white shadow-md"
										: "hover:bg-white/5 hover:text-white"
								}`}
							>
								<span class="text-xl w-12 h-12 flex items-center justify-center">
									{item.icon}
								</span>
								<span class="text-sm font-semibold align-middle leading-none">
									{item.name}
								</span>
							</A>
						)}
					</For>
				</nav>
			</div>

			<main
				style={{ "margin-left": menuWidth() }}
				class="min-h-screen p-2"
			>
			<h1 class="text-3xl tracking-wider font-extrabold border-l-4 border-sky-500 p-4 leading-none">
				{mainPages.filter(el=> el.path === location.pathname)[0].name}
			</h1>
				{props.children}
			</main>
		</div>
	);
}
