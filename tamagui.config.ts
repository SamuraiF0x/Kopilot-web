import { createFont, createTamagui, createTokens } from "tamagui";
import { createAnimations } from "@tamagui/animations-css";
import { shorthands } from "@tamagui/shorthands";

export const animations = createAnimations({
	smoothBounce: "cubic-bezier(0.35, 1.15, 0.2, 1.1) 600ms",
	slow: "ease 400ms",
	smooth: "ease 300ms",
	lazy: "cubic-bezier(1, 0.43, 0.75, 1.15) 625ms",
	stutter: "cubic-bezier(0.92, 1.55, 0.72, 0.24) 625ms",
	bouncy: "cubic-bezier(0.47, 1.64, 0.41, 0.8) 400ms",
	elastic: "ease-in 100ms",
});

const spaceMonoFont = createFont({
	family: "Space Mono, monospace",
	size: {
		1: 13, // s
		2: 14, // m
		3: 15, // l
		4: 16, // xl
		5: 15, // H6
		6: 17, // H5
		7: 18, // H4
		8: 21, // H3
		9: 25, // H2
		10: 28, // H1
		11: 40, // H1
		true: 15,
	},
	lineHeight: {
		1: 13, // s
		2: 14, // m
		3: 15, // l
		4: 16, // xl
		5: 16, // H6
		6: 18, // H5
		7: 19, // H4
		8: 21, // H3
		9: 27, // H2
		10: 30, // H1
	},
	weight: {
		1: 400, // s - xl
		5: 700, // H6 - H1
	},
	letterSpacing: {
		1: 0, // H6 - H2
		10: 0.5, // H1
	},
	face: {
		normal: { normal: "SpaceMono-Regular", italic: "SpaceMono-Italic" },
		bold: { normal: "SpaceMono-Bold", italic: "SpaceMono-BoldItalic" },
	},
});

const startSize = 45;

const size = {
	0: 1,
	1: 2,
	2: 5,
	2.5: 7.5,
	3: 10,
	4: 15,
	5: 20,
	5.5: 30,
	6: startSize, // TINY - 45 -> 45
	7: Math.round(startSize + startSize / 2), // SMALL - 67,5 -> 68
	8: Math.round(startSize * 1.618), // MEDIUM - 72,81 -> 73
	9: Math.round(startSize * 1.618 + startSize / 2), // BIG - 95,31 -> 95
	10: Math.round(startSize * 1.618 ** 2), // LARGE - 117,81 -> 118
	10.5: Math.round(1.5 * (startSize * 1.618 ** 2)), // EXTRA-LARGE - 176,71 -> 177
	11: Math.round(2 * (startSize * 1.618 ** 2)), // EXTRA-LARGE - 235,62 -> 236
	12: Math.round(2.5 * (startSize * 1.618 ** 2)), // EXTRA-EXTRA-LARGE - 294,52 -> 295
	13: Math.round(3 * (startSize * 1.618 ** 2)), // HUGE - 353,42 -> 353
	true: startSize,
};

const startRadius = 15;

const radius = {
	0: 0,
	1: 5,
	2: 7,
	3: 8,
	4: 10,
	5: 12,
	6: startRadius, // TINY - 15
	7: Math.round(startRadius + startRadius / 2), // SMALL - 23
	8: Math.round(startRadius * 1.618), // MEDIUM - 24
	9: Math.round(startRadius * 1.618 + startRadius / 2), // BIG - 32
	10: Math.round(startRadius * 1.618 ** 2), // LARGE - 39
	11: "100%",
	true: startRadius,
};

export const accentColors = {
	yellow: "#F9DC5C",
	green: "#06D6A0",
	blue: "#3185FC",
	red: "#E40066",
	orange: "#F95738",

	purple: "#A000D2", //dont use opacity in hex color B3
};

export const tokens = createTokens({
	size,
	space: { ...size },
	radius,
	zIndex: { 0: 0, 1: 100 },
	color: {
		//dark
		voidBlue: "#080B1C",
		voidBlueTransparent: "#080B1C80",
		spaceBlue: "#1E132A",
		spaceBlueTransparent: "#1E132A80",

		//light
		spaceLatte: "#F4FAFF",
		spaceLatteTransparent: "#F4FAFF80",
		gray: "#E4F1FB",

		//shared
		fusion: "#2b205e", //light text & dark box
		oceanBlue: "#01295F", //light text & dark box
		beige: "#FAF0CA", //dark txt & light box
		lavanda: "#947BD3", //primary
		lavanda50: "#947BD380", //primary

		...accentColors,
	},
});

const config = createTamagui({
	defaultTheme: "light",
	// onlyAllowShorthands: true,
	// shouldAddPrefersColorThemes: false,
	// themeClassNameOnRoot: false,
	size,
	tokens,
	animations,
	fonts: {
		heading: spaceMonoFont,
		body: spaceMonoFont,
	},
	media: {
		xs: { maxWidth: 480 },
		gtXs: { minWidth: 480 + 1 },
		sm: { maxWidth: 600 },
		gtSm: { minWidth: 600 + 1 },
		md: { maxWidth: 730 },
		gtMd: { minWidth: 730 + 1 },
		lg: { maxWidth: 950 },
		gtLg: { minWidth: 950 + 1 },
		xl: { maxWidth: 1120 },
		gtXl: { minWidth: 1120 + 1 },
		short: { maxHeight: 820 },
		tall: { minHeight: 820 },
		hoverNone: { hover: "none" },
		pointerCoarse: { pointer: "coarse" },
	},

	themes: {
		light: {
			contrast: tokens.color.oceanBlue,
			primary: tokens.color.lavanda,
			accent: tokens.color.blue,
			success: tokens.color.green,
			error: tokens.color.red,
			warning: tokens.color.yellow,

			color: tokens.color.oceanBlue,
			colorTransparent: tokens.color.voidBlueTransparent,
			colorHover: tokens.color.oceanBlue,
			colorPress: tokens.color.green,
			colorFocus: tokens.color.spaceLatteTransparent,
			link: tokens.color.purple,

			placeholderColor: tokens.color.lavanda50,
			placeholderTextColor: tokens.color.voidBlueTransparent,
			placeholderBorderColor: tokens.color.lavanda50,
			placeholderBgColor: tokens.color.spaceLatteTransparent,

			background: tokens.color.spaceLatte,
			backgroundStrong: tokens.color.blue,
			backgroundTransparent: tokens.color.gray,
			backgroundHover: tokens.color.spaceLatte,
			backgroundPress: tokens.color.spaceLatteTransparent,
			backgroundFocus: tokens.color.spaceLatteTransparent,

			borderColor: tokens.color.voidBlueTransparent,
			borderColorHover: tokens.color.voidBlue,
			borderColorPress: tokens.color.lavanda50,
			borderColorFocus: tokens.color.voidBlue,

			shadowColor: tokens.color.blue,
			shadowColorHover: tokens.color.blue,
			shadowColorPress: tokens.color.green,
			shadowColorFocus: tokens.color.yellow,
		},

		dark: {
			contrast: tokens.color.spaceLatte,
			primary: tokens.color.lavanda,
			accent: tokens.color.blue,
			success: tokens.color.green,
			error: tokens.color.red,
			warning: tokens.color.yellow,

			color: tokens.color.spaceLatte,
			colorTransparent: tokens.color.spaceLatteTransparent,
			colorHover: tokens.color.spaceLatte,
			colorPress: tokens.color.purple,
			colorFocus: tokens.color.lavanda50,
			link: tokens.color.purple,

			placeholderColor: tokens.color.lavanda50,
			placeholderTextColor: tokens.color.lavanda50,
			placeholderBorderColor: tokens.color.lavanda50,
			placeholderBgColor: tokens.color.voidBlueTransparent,

			background: tokens.color.spaceBlue,
			backgroundStrong: tokens.color.blue,
			backgroundTransparent: tokens.color.voidBlue,
			backgroundHover: tokens.color.voidBlue,
			backgroundPress: tokens.color.lavanda50,
			backgroundFocus: tokens.color.voidBlueTransparent,

			borderColor: tokens.color.spaceLatteTransparent,
			borderColorHover: tokens.color.spaceLatte,
			borderColorPress: tokens.color.lavanda50,
			borderColorFocus: tokens.color.spaceLatte,

			shadowColor: tokens.color.blue,
			shadowColorHover: tokens.color.blue,
			shadowColorPress: tokens.color.green,
			shadowColorFocus: tokens.color.yellow,
		},
	},
	shorthands,
});

export type AppConfig = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppConfig {}

	interface ThemeValueFallback {
		value: never;
	}
}

export default config;
