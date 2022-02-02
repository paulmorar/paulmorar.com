import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction, LinksFunction } from 'remix';
import styles from './tailwind.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'canonical',
      href: 'https://paulmorar.com/',
    },
    {
      rel: 'icon',
      href: '/favicon.svg',
      type: 'image/svg',
    },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles&display=swap',
    },
    { rel: 'stylesheet', href: styles },
  ];
};

export const meta: MetaFunction = () => {
  const title = 'Paul Morar - Your favourite developer';
  const description =
    'Paul is a developer, designer, and brewer with experience in all things JavaScript.';

  return {
    'theme-color': '#0F023E',
    title,
    description,
    keywords: 'Development, JavaScript, Portfolio, React',
    'og:title': title,
    'og:description': description,
    'og:type': 'website',
    'og:url': 'https://paulmorar.com/',
    'twitter:image': 'https://paulmorar.com/social.png',
    'twitter:card': 'summary',
    'twitter:creator': '@paulmorar',
    'twitter:site': '@paulmorar',
    'twitter:title': title,
    'twitter:description': description,
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
          heap.load("2421317269");`,
          }}
        />
      </head>
      <body className="bg-secondary">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
