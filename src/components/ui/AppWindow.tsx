import { appWindow } from "@tauri-apps/api/window";

export default function AppWindow() {
	return (
		<div data-tauri-drag-region class="titlebar space-x-2">
			<button
				class="titlebar-button rounded-full bg-orange-700"
				id="titlebar-minimize"
				onClick={() => appWindow.minimize()}
			></button>
			<button
				class="titlebar-button rounded-full bg-emerald-700"
				id="titlebar-maximize"
				onClick={() => appWindow.toggleMaximize()}
			></button>
			<button
				class="titlebar-button rounded-full bg-pink-700"
				id="titlebar-close"
				onClick={() => appWindow.close()}
			></button>
		</div>
	);
}
