import ProfileSection from '@/back-components/ProfileSection';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Box, IconButton, Stack, styled, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 6;
    background-color: ${theme.header.background};
    backdrop-filter: blur(3px);
    position: fixed;
    justify-content: space-between;
    width: 100%;
    padding-right: 20px;
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      left: ${theme.sidebar.width};
      width: auto;
    }
`
);

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <ProfileSection />
      </Stack>
    </HeaderWrapper>
  );
}

export default Header;
