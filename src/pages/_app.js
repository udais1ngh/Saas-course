import "src/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      

        <Component {...pageProps} />

     
    </SessionContextProvider>

  )
}
