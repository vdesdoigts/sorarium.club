import Transitions from '@/back-components/Transitions';
import useCurrentUser from '@/hooks/useCurrentUser';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Divider,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Link from 'next/link';
import React from 'react';

const ProfileSection = () => {
  const { data: currentUser } = useCurrentUser();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    if (!currentUser) {
      openLogin();
    } else {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const openLogin = () => {
    window.open(
      `https://sorare.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SORARE_API_UID}&redirect_uri=${process.env.NEXT_PUBLIC_SORARE_REDIRECT_URI}&response_type=code&scope=`,
      '_self'
    );
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <ButtonBase
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          height: '44px',
          pl: 1.5,
          pr: 2,
          border: 0,
          position: 'relative',
          minHeight: '44px',
          borderRadius: '44px',
          color: '#fff',
          fontWeight: 700,
          background: 'rgba(0,0,0,1)',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all .2s ease-in-out',
          transform: 'rotate(0deg)',
          '& svg': {
            transition: 'all .2s ease-in-out'
          },
          '&:hover': {
            background: 'rgba(0,0,0,.6)'
          },
          '&:hover svg': {
            transform: 'rotate(45deg)'
          }
        }}
      >
        <SportsBasketballOutlinedIcon />
        <Box ml={0.6}>
          {!currentUser ? 'Sign in' : currentUser.sorareUsername}
        </Box>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper
              variant="outlined"
              sx={{
                border: 'none',
                borderRadius: '8px',
                boxShadow: 'none',
                '& .MuiPaper-root': {
                  boxShadow: '0 1px 3px rgb(25 25 25 / 10%)'
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem>
                    <ListItemText>
                      <Link href="/dashboard" passHref>
                        <Typography
                          component="a"
                          variant="body2"
                          sx={{
                            textDecoration: 'none',
                            color: '#000 !important'
                          }}
                        >
                          Dashboard
                        </Typography>
                      </Link>
                    </ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Link href="/logout" passHref>
                      <Typography
                        component="a"
                        variant="body2"
                        sx={{
                          textDecoration: 'none',
                          color: '#000 !important'
                        }}
                      >
                        Logout
                      </Typography>
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
