import { For } from "solid-js";

const notes = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function Notes() {
	return (
		<div class="">
			<div class="py-8">
				<div class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
					<For each={notes}>
						{(note) => (
							<div class="min-h-[5rem] bg-slate-700 rounded-xl w-full"></div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
}
