import { DialogProvider } from "@/context/dialog";
import { LuksoProvider } from "@/context/lukso";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LuksoProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <DialogProvider>
            <NextNProgress height={4} color={theme.palette.primary.main} />
            <Component {...pageProps} />
          </DialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </LuksoProvider>
  );
}
