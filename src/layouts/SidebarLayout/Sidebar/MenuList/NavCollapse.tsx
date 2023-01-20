import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MenuConfigItemProps } from '../_config';
import NavItem from './NavItem';

interface NavCollapseProps {
  menu: MenuConfigItemProps;
  level: any;
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
  const router = useRouter();
  const selected = router.asPath.includes(menu.id);
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
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
        ...(selected
          ? {
              width: '8px',
              height: '8px'
            }
          : {
              width: '6px',
              height: '6px'
            })
      }}
    />
  );

  const menuIconClass = !menu.icon
    ? {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto'
      }
    : {
        marginTop: 'auto',
        marginBottom: 'auto'
      };

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: 'borderRadius',
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor:
            level > 1 ? 'transparent !important' : theme.sidebar.menuItemBg,
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 18}px`,
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
        selected={selected}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36, ...menuIconClass }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              pt={0.2}
              color="inherit"
              fontWeight={selected ? '500' : '400'}
              sx={{ my: 'auto' }}
            >
              {menu.title}
            </Typography>
          }
        />
        {open ? (
          <ExpandLessIcon
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              fontSize: '1rem'
            }}
          />
        ) : (
          <ExpandMoreIcon
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              fontSize: '1rem'
            }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.sidebar.menuItemBgActive
            }
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

export default NavCollapse;
