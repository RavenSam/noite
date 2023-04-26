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
					fontWeight:"700"
				},
			},
		},

		Input:{
			baseStyle:{
				input:{
					borderRadius: "0.75rem",
				}
			}
		},

		Notification:{
			baseStyle:{
				root:{
					borderRadius: "0.75rem",
				}
			}
		},

		Tooltip:{
			baseStyle:{
					borderRadius: "0.5rem",
					fontSize:"12px",
					fontWeight:"bold",
					padding:"8px 10px"
			}
		},

		Modal:{
			baseStyle:{
				closeButton:{
					borderRadius: "0.75rem",
				},
				content:{
					borderRadius: "0.75rem",
				},
				header:{
					fontWeight:"700"
				}
			}
		},

		Menu :{
			baseStyle:{
				content:{
					borderRadius: "0.75rem",
				},
				item:{
					borderRadius: "0.75rem",
				}
			}
		},

		Tabs:{
			baseStyle:{
				tab:{
					_focus: { boxShadow: "none" },
					color:"$gray1",
					fontSize:".9rem",
					fontWeight: "800" ,
					_selected:{ borderColor:"$primary", color:"$primary" }
				}
			}
		}
	},
};
