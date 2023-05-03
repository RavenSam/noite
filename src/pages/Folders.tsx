import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import { NewFolder } from "~/components/ui/Note";
import { For } from "solid-js";
import { folders } from "~/api/folders";
import { A } from "@solidjs/router";

const EmptyFolders = () => {
	return (
		<div class="flex items-center flex-col space-y-8 justify-center min-h-[5rem]">
			<h2 class="font-normal text-xl">No Folder found. Create one?</h2>
			<NewFolder />
		</div>
	);
};

export default function Folder() {
	return (
		<div>
			<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
				My Folders
			</h1>

			<Tabs class="mt-4">
				<TabList>
					<Tab>Folders</Tab>
				</TabList>
				<TabPanel tabIndex="-1">
					<div class="space-y-4">
						<NewFolder />
						<For each={folders()} fallback={<EmptyFolders />}>
							{(folder) => (
								<A href={`/folders/${folder.id}`} class="rounded-xl border p-4">{folder.title}</A>
							)}
						</For>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}
