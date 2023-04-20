import { For } from "solid-js";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";

import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	createDisclosure,
} from "@hope-ui/solid";

const notes = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

const SingleNote = () => {
	const { isOpen, onOpen, onClose } = createDisclosure();

	return (
		<>
			<div
				onClick={onOpen}
				class="min-h-[5rem] bg-slate-700 rounded-xl w-full cursor-pointer"
			></div>

			<Drawer opened={isOpen()} size="lg" placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader fontWeight="bold" >Note title</DrawerHeader>

					<DrawerBody>
						<div class="min-h-[5rem] bg-slate-300 rounded-xl w-full">
							<h2 class="text-xl text-black text-center">#Note</h2>
						</div>
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

const AllNotes = () => {
	return (
		<div class="py-4">
			<div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
				<For each={notes}>{(note) => <SingleNote />}</For>
			</div>
		</div>
	);
};

export default function Notes() {
	return (
		<div class="">
			<h1 class="text-3xl text-black tracking-wider font-extrabold border-l-4 border-black p-4 leading-none">
				My Notes
			</h1>
			<Tabs class="mt-4" >
				<TabList >
					<Tab class="!shadow-none">All notes</Tab>
					<Tab class="!shadow-none">Folders</Tab>
				</TabList>
				<TabPanel>
					<AllNotes />
				</TabPanel>
				<TabPanel>2</TabPanel>
			</Tabs>
		</div>
	);
}
