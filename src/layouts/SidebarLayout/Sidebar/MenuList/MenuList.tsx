import { SidebarContext } from '@/contexts/SidebarContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import {
  Box,
  CircularProgress,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useState } from 'react';
import getMenuConfig, { MenuConfigItemProps } from '../_config';
import NavGroup from './NavGroup';

const MenuList = () => {
  const { data: currentUser } = useCurrentUser();
  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();
  const { menus } = useContext(SidebarContext);
  const menuItems = getMenuConfig({
    ['menu-collections']: menus.collections.map((item) => ({
      id: item.id,
      title: item.title,
      type: 'item',
      url: `/dashboard/collections/${item.id}`
    }))
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await axios.get<any>('/api/sorare/players');
    } finally {
      setRefreshing(false);
    }
  };

  const navItems = (menuItems as MenuConfigItemProps[]).map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <Box px={2} pt={2}>
        <Link href={`/profile/${currentUser?.id}`} passHref>
          <ListItemButton
            component="a"
            target="_blank"
            sx={{
              borderRadius: 'borderRadius',
              mb: 0.5,
              alignItems: 'flex-start',
              backgroundColor: theme.sidebar.menuItemBg,
              py: 1.25,
              pl: `${18}px`,
              color: theme.sidebar.menuItemColor,

              '&.Mui-selected': {
                backgroundColor: theme.sidebar.menuItemBgActive,
                color: theme.sidebar.menuItemColorActive,
                fontSize: 500
              },
              '&:hover': {
                backgroundColor: theme.sidebar.menuItemBgActive,
                color: theme.sidebar.menuItemColorActive
              }
            }}
          >
            <ListItemIcon sx={{ my: 'auto', minWidth: 36, color: 'inherit' }}>
              <AccountCircleOutlinedIcon color="inherit" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  pt={0.2}
                  color="inherit"
                  fontWeight={'400'}
                  sx={{ my: 'auto' }}
                >
                  Profile
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
        <ListItemButton
          onClick={onRefresh}
          sx={{
            borderRadius: 'borderRadius',
            mb: 0.5,
            alignItems: 'flex-start',
            backgroundColor: theme.sidebar.menuItemBg,
            py: 1.25,
            pl: `${18}px`,
            color: theme.sidebar.menuItemColor,

            '&.Mui-selected': {
              backgroundColor: theme.sidebar.menuItemBgActive,
              color: theme.sidebar.menuItemColorActive,
              fontSize: 500
            },
            '&:hover': {
              backgroundColor: theme.sidebar.menuItemBgActive,
              color: theme.sidebar.menuItemColorActive
            }
          }}
        >
          <ListItemIcon
            sx={{
              position: 'relative',
              my: 'auto',
              minWidth: 36,
              color: 'inherit'
            }}
          >
            {refreshing && (
              <Box position="absolute" top="4px" left="4px">
                <CircularProgress size={16} />
              </Box>
            )}
            <RefreshOutlinedIcon
              color="inherit"
              sx={{ opacity: refreshing ? 0 : 1 }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                pt={0.2}
                color="inherit"
                fontWeight={'400'}
                sx={{ my: 'auto' }}
              >
                Refresh
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
      <Box px={2} pb={2}>
        {navItems}
      </Box>
    </>
  );
};

export default MenuList;
