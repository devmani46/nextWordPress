import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
                    ...fontFamily.sans
                ]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			black: 'rgb(33 37 41)',
  			white: 'rgb(255 255 255)',
  			gray: 'rgb(96 105 113)',
  			'violet-light': 'rgb(234 234 240)',
  			'violet-light-hover': 'rgb(223 223 233)',
  			'violet-light-active': 'rgb(189 189 209)',
  			'violet-normal': 'rgb(42 42 107)',
  			'violet-normal-hover': 'rgb(38 38 96)',
  			'violet-normal-active': 'rgb(34 34 86)',
  			'violet-dark': 'rgb(32 32 80)',
  			'violet-dark-hover': 'rgb(25 25 64)',
  			'violet-dark-active': 'rgb(19 19 48)',
  			'violet-darker': 'rgb(15 15 37)',
  			'blue-light': 'rgb(234 243 249)',
  			'blue-light-hover': 'rgb(224 236 245)',
  			'blue-light-active': 'rgb(191 216 235)',
  			'blue-normal': 'rgb(48 130 191)',
  			'blue-normal-hover': 'rgb(43 117 172)',
  			'blue-normal-active': 'rgb(38 104 153)',
  			'blue-dark': 'rgb(36 98 143)',
  			'blue-dark-hover': 'rgb(29 78 115)',
  			'blue-dark-active': 'rgb(22 58 86)',
  			'blue-darker': 'rgb(17 46 67)',
  			'blue-grey-light': 'rgb(240 240 241)',
  			'blue-grey-light-hover': 'rgb(233 233 234)',
  			'blue-grey-light-active': 'rgb(210 209 212)',
  			'blue-grey-normal': 'rgb(109 106 117)',
  			'blue-grey-normal-hover': 'rgb(98 95 105)',
  			'blue-grey-normal-active': 'rgb(87 85 94)',
  			'blue-grey-dark': 'rgb(82 80 88)',
  			'blue-grey-dark-hover': 'rgb(65 64 70)',
  			'blue-grey-dark-active': 'rgb(49 48 53)',
  			'blue-grey-darker': 'rgb(38 37 41)',
  			'white-light': 'rgb(255 255 255)',
  			'white-light-hover': 'rgb(255 255 255)',
  			'white-light-active': 'rgb(255 255 255)',
  			'white-normal': 'rgb(255 255 255)',
  			'white-normal-hover': 'rgb(230 230 230)',
  			'white-normal-active': 'rgb(204 204 204)',
  			'white-dark': 'rgb(191 191 191)',
  			'white-dark-hover': 'rgb(153 153 153)',
  			'white-dark-active': 'rgb(115 115 115)',
  			'white-darker': 'rgb(89 89 89)',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
