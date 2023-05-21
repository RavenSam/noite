import { appWindow } from "@tauri-apps/api/window";

export default function AppWindow() {
	return (
		<div data-tauri-drag-region class="titlebar space-x-2">
			<button
				class="titlebar-button rounded-md bg-emerald-500"
				id="titlebar-minimize"
				onClick={() => appWindow.minimize()}
			>
			</button>
			<button
				class="titlebar-button rounded-md bg-orange-500"
				id="titlebar-maximize"
				onClick={() => appWindow.toggleMaximize()}
			></button>
			<button
				class="titlebar-button rounded-md bg-pink-500"
				id="titlebar-close"
				onClick={() => appWindow.close()}
			></button>
		</div>
	);
}


