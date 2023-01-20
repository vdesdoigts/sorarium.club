import { Box } from '@mui/material';
import type { AppProps } from 'next/app';
import { FC, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
  pageProps?: AppProps;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%'
        }}
      >
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={(theme) => ({
            position: 'relative',
            zIndex: 5,
            display: 'block',
            height: '100%',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          })}
        >
          <Box
            height="100%"
            borderRadius={(theme) =>
              `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
            }
            bgcolor={(theme) => theme.colors.backgrounds.main}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
