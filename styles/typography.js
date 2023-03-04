export const fontSize = {
  xs: 8,
  s: 16,
  m: 20,
  l: 36,
  xl: 48,
  xxl: 62,
  100: "Lexend_100Thin",
  200: "Lexend_200ExtraLight",
  300: "Lexend_300Light",
  400: "Lexend_400Regular",
  500: "Lexend_500Medium",
  600: "Lexend_600SemiBold",
  700: "Lexend_700Bold",
  800: "Lexend_800ExtraBold",
  900: "Lexend_900Black",
};

export const font = {
  h1: {
    fontFamily: fontSize[700],
    fontSize: fontSize.xxl,
    fontWeight: "bold",
  },
  h2: {
    fontFamily: fontSize[600],
    fontSize: fontSize.l,
  },
  body: {
    fontFamily: fontSize[400],
    fontSize: fontSize.m,
  },
  label: {
    fontFamily: fontSize[400],
    fontSize: fontSize.s,
  },
};
