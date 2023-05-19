import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import { NewFolder } from "~/components/ui/Note";
import { For, createEffect } from "solid-js";
import { folders } from "~/api/folders";
import { A } from "@solidjs/router";
import { HiSolidFolder } from "solid-icons/hi";
import { useGlobalContext } from "~/context/store";


const EmptyFolders = () => {
	return (
		<div class="flex items-center flex-col space-y-8 justify-center min-h-[5rem]">
			<h2 class="font-normal text-xl">No Folder found. Create one?</h2>
			<NewFolder />
		</div>
	);
};

export default function Folder() {
	const { store, setStore } = useGlobalContext();

	createEffect(() => setStore("folders", () => [...(folders() || [])]));

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
					<div>
						<div class="flex items-center justify-end pb-5 pt-1 space-x-3">
							<NewFolder />
						</div>
						<div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
							<For each={store.folders} fallback={<EmptyFolders />}>
								{(folder) => (
									<A
										href={`/folders/${folder.id}`}
										class="rounded-xl flex flex-col items-center p-4 hover:bg-gradient-to-b from-blue-500 to-blue-600/80 hover:shadow-xl"
									>

										<HiSolidFolder
											size="100%"
											class="aspect-square -mb-5 "
										/>
										<span>{folder.title}</span>
									</A>
								)}
							</For>
						</div>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}
