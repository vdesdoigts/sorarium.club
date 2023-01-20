import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { MenuConfigItemProps } from '../_config';

interface NavItemProps {
  item: MenuConfigItemProps;
  level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
  const router = useRouter();
  const { closeSidebar } = useContext(SidebarContext);
  const selected = router.asPath === item.url;
  const theme = useTheme();
  const Icon = item.icon;

  const itemIcon = item.icon ? (
    <Icon
      sx={{
        color: selected
          ? theme.sidebar.menuItemIconColorActive
          : theme.sidebar.menuItemIconColor,
        fontSize: '1.5rem'
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        fontSize: level > 0 ? 'inherit' : 'default',
        width: '8px',
        height: '8px'
      }}
    />
  );
  const itemIconClass = !item.icon
    ? {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto'
      }
    : {
        marginTop: 'auto',
        marginBottom: 'auto'
      };

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {};
  if (item?.external) {
    listItemProps = { component: 'a' };
  }

  return (
    <Link href={item.url!} target={itemTarget} passHref>
      <ListItemButton
        {...listItemProps}
        onClick={closeSidebar}
        disabled={item.disabled}
        selected={selected}
        sx={{
          borderRadius: 'borderRadius',
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor:
            level > 1 ? 'transparent !important' : theme.sidebar.menuItemBg,
          py: level > 1 ? 1 : 1.25,
          pl: level > 1 ? '48px' : '18px',
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
          sx={{ my: 'auto', minWidth: !item.icon ? 18 : 36, ...itemIconClass }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              fontWeight={selected ? '500' : '400'}
              pt={0.2}
              sx={{ my: 'auto' }}
              color="inherit"
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography variant="caption" display="block" gutterBottom>
                {item.caption}
              </Typography>
            )
          }
        />
      </ListItemButton>
    </Link>
  );
};

export default NavItem;
