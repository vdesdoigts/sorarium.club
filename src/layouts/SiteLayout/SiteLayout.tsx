import { Box } from '@mui/material';
import type { AppProps } from 'next/app';
import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
  pageProps?: AppProps;
}

const SiteLayout: FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <Box bgcolor="#fff8f5" minHeight="100vh" pt={5}>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default SiteLayout;
