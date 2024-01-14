import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				atom: {
					primary: "#1329b3",
					secondary: "#2548fa",
					accent: "#00c7fe",
					neutral: "#ffffff",
					info: "#ffffff",
					success: "#00ffff",
					warning: "#ffffff",
					error: "#ffffff",
				},
			},
		],
	},
};
export default config;
