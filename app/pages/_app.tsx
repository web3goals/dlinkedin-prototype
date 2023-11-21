import "@/styles/globals.css";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <NextNProgress height={4} color={theme.palette.primary.main} />
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
