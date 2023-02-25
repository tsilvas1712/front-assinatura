import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    "lifewall-pastel": "#FFFAEA",
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "lifewall-pastel",
        color: "gray.900",
      },
    },
  },
});
