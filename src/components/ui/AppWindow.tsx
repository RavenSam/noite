import { appWindow } from "@tauri-apps/api/window";

export default function AppWindow() {
	return (
		<div data-tauri-drag-region class="titlebar space-x-2">
			<button
				class="titlebar-button rounded-md bg-emerald-500 opacity-50 hover:opacity-100"
				id="titlebar-minimize"
				tabindex="-1"
				onClick={() => appWindow.minimize()}
			>
			</button>
			<button
				class="titlebar-button rounded-md bg-orange-500  opacity-50 hover:opacity-100"
				id="titlebar-maximize"
				tabindex="-1"
				onClick={() => appWindow.toggleMaximize()}
			></button>
			<button
				class="titlebar-button rounded-md bg-pink-500  opacity-50 hover:opacity-100"
				id="titlebar-close"
				tabindex="-1"
				onClick={() => appWindow.close()}
			></button>
		</div>
	);
}


