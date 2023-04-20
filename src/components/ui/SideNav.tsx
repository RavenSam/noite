import { A, useLocation } from "@solidjs/router";
import { JSXElement, createSignal, For } from "solid-js";
import { HiOutlineCog, HiOutlinePencilAlt } from "solid-icons/hi";

const mainPages = [
	{ name: "My Notes", icon: <HiOutlinePencilAlt />, path: "/", class: "" },
	{
		name: "Settings",
		icon: <HiOutlineCog />,
		path: "/settings",
		class: "mt-auto",
	},
];

const LinkItem = ({ item }: { item: typeof mainPages[0] }) => {
	const location = useLocation();

	return (
		<A
			href={item.path}
			class={`flex items-center rounded-xl ${item.class} ${
				item.path === location.pathname
					? "text-black"
					: "hover:text-gray-700"
			}`}
		>
			<span class="text-xl w-12 h-12 flex items-center justify-center">
				{item.icon}
			</span>
			<span class="text-sm font-bold align-middle leading-none">
				{item.name}
			</span>
		</A>
	);
};

interface SideNavProps {
	children: JSXElement;
}

export default function SideNav(props: SideNavProps) {
	const [menuWidth, setMenuWidth] = createSignal("13rem");

	return (
		<div class="bg-gray-white text-gray-500">
			<div
				style={{ width: menuWidth() }}
				class="fixed top-0 left-0 bottom-0"
			>
				<nav class="flex flex-col p-2 space-y-1">
					<For each={mainPages}>{(item) => <LinkItem item={item} />}</For>
				</nav>
			</div>

			<main style={{ "margin-left": menuWidth() }} class="min-h-screen p-2">
				{props.children}
			</main>
		</div>
	);
}
