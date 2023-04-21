import { HopeThemeConfig } from "@hope-ui/solid";

export const config: HopeThemeConfig = {
	initialColorMode: "system",
	lightTheme: {
		colors: {
			primary: "#000",
			primaryC: "#fff",
			gray1: "#9ca3af",
		},
	},
	darkTheme: {
		colors: {
			primary: "#fff",
			primaryC: "#000", // A color that contast the primary color
			gray1: "#374151",

		},
	},
	components: {
		Button: {
			baseStyle: {
				root: {
					borderRadius: "0.75rem",
					_focus: { boxShadow: "none" },
				},

			},
		},
	},
};
