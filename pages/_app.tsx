import { CacheProvider, EmotionCache } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { ReactElement, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme/ThemeProvider';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const queryClient = new QueryClient();

interface SorariumAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function SorariumApp(props: SorariumAppProps) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <CacheProvider value={emotionCache}>
          <DefaultSeo
            title="Sorarium - Collectibles showcase for NBA Sorare"
            description="Take your NBA Sorare collections to the next level with Sorarium. A collector network for showcasing and discovering collections."
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'https://sorarium.club/',
              siteName: 'Sorarium - Collectibles showcase for NBA Sorare',
              images: [
                {
                  url: 'https://sorarium.club/static/og/showcase.jpg',
                  width: 1200,
                  height: 630,
                  alt: 'Drag & Drop your cards to create your own showcase',
                  type: 'image/jpeg'
                }
              ]
            }}
            twitter={{
              handle: '@vdesdoigts',
              cardType: 'summary_large_image'
            }}
            additionalLinkTags={[
              {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=block'
              }
            ]}
            additionalMetaTags={[
              {
                property: 'viewport',
                content:
                  'width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover,minimum-scale=1'
              },
              {
                property: 'keywords',
                content:
                  'sorare, collectibles, NBA, showcase, NFT, blockchain, sport, basket-ball, players, collectors, limited, rare, super rare, unique'
              }
            ]}
          />
          <Head>
            <title>Sorarium</title>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover,minimum-scale=1"
            />
          </Head>
          <SidebarProvider menus={pageProps.menus}>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                {/* @ts-ignore */}
                {getLayout(<Component key={router.asPath} {...pageProps} />)}
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </CacheProvider>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default SorariumApp;
