import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast"; // Import Toaster
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster /> {/* Add the Toaster component */}
    </>
  );
}

export default MyApp;
