import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import DefaultLayout from "@/layouts/default";
import { useEffect } from "react";
import { currentTrackState } from "@/store/current-track";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    currentTrackState.setTrack(
      JSON.parse(localStorage.getItem("track") || "null") || undefined,
    );
    currentTrackState.setCurrentTimeWithValue(
      Number(localStorage.getItem("playTime")),
    );
  }, []);

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
