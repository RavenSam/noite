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
					_focus: { boxShadow: "none" },
					borderRadius: "0.75rem",
					fontWeight:"700"
				},
			},
		},

		Input:{
			baseStyle:{
				input:{
					borderRadius: "0.75rem",

					_focus:{
						boxShadow:"none",
						borderColor:"$primary"
					},
				}
			}
		},

		Notification:{
			baseStyle:{
				root:{
					borderRadius: "0.75rem",
					opacity:"0.6",
					backdropFilter:"blur(5px)"
				},
			}
		},

		Tooltip:{
			baseStyle:{
					borderRadius: "0.5rem",
					fontSize:"12px",
					fontWeight:"bold",
					padding:"8px 10px",
					opacity:"0.6",
					backdropFilter:"blur(5px)"
			}
		},

		Modal:{
			baseStyle:{
				closeButton:{
					borderRadius: "0.75rem",
				},
				overlay:{
					backdropFilter:"blur(3px)"
				},
				content:{
					borderRadius: "0.75rem",
				},
				header:{
					fontWeight:"700"
				}
			}
		},

		Drawer:{
			baseStyle:{
				header:{
					opacity:"0.8",
					backdropFilter:"blur(5px)"
				}
			}
		},

		Menu :{
			baseStyle:{
				content:{
					borderRadius: "0.75rem",
					opacity:"0.7",
					backdropFilter:"blur(5px)"
				},
				item:{
					borderRadius: "0.75rem",
					fontSize:"13px",
					fontWeight:"600",
				}
			}
		},

		Badge:{
			baseStyle:{
				opacity:"0.7",
				backdropFilter:"blur(5px)"
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
