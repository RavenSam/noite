import { For } from "solid-js";
import { Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import { HiSolidArrowRight } from "solid-icons/hi";
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
import SimpleEditor from "../components/tiptap/SimpleEditor";

const notes = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

const SingleNote = () => {
	const { isOpen, onOpen, onClose } = createDisclosure();

	return (
		<>
			<div
				onClick={onOpen}
				class="min-h-[5rem] bg-slate-700 rounded-xl w-full cursor-pointer"
			></div>

			<Drawer
				opened={isOpen()}
				size="lg"
				placement="right"
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton
						borderRadius="0.75rem"
						_focus={{ boxShadow: "none" }}
						size="lg"
						icon={<HiSolidArrowRight />}
					/>
					<DrawerHeader fontWeight="bold"  >Note</DrawerHeader>

					<DrawerBody>
						<div class="w-full">
							<SimpleEditor />
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
			<h1 class="text-3xl tracking-wider font-extrabold py-4 leading-none">
				My Notes
			</h1>
			<Tabs class="mt-4">
				<TabList>
					<Tab>All notes</Tab>
					<Tab>Folders</Tab>
				</TabList>
				<TabPanel>
					<AllNotes />
				</TabPanel>
				<TabPanel>2</TabPanel>
			</Tabs>
		</div>
	);
}
