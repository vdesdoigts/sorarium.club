import Scrollbar from '@/back-components/Scrollbar';
import { Box, darken, Drawer, styled, useTheme } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';
import MenuList from './MenuList';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    min-width: ${theme.sidebar.width};
    color: ${theme.colors.alpha.trueWhite[70]};
    position: relative;
    z-index: 7;
    height: 100%;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background: theme.sidebar.background
        }}
      >
        <Scrollbar>
          <MenuList />
        </Scrollbar>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? darken(theme.colors.alpha.black[100], 0.5)
                : theme.colors.alpha.white[100]
          }}
        >
          <Scrollbar>
            <MenuList />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
