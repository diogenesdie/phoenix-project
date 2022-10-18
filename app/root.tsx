import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import wavesStylesheetUrl from "./styles/waves.css";
import { getUser } from "./session.server";

//import primereact theme
import theme from "primereact/resources/themes/saga-blue/theme.css";
import css from "primereact/resources/primereact.min.css";
import icons from "primeicons/primeicons.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl},
          { rel: "stylesheet", href: wavesStylesheetUrl},
          { rel: "stylesheet", href: theme},
          { rel: "stylesheet", href: css},
          { rel: "stylesheet", href: icons}];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Pheonix",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
