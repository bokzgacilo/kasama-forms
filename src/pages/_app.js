import { useColorMode } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import "@/styles/globals.css";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  return <Provider>
    <Component {...pageProps} />
  </Provider>
}
