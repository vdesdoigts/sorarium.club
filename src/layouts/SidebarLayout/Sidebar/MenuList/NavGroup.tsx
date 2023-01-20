import { List, Typography } from '@mui/material';
import { MenuConfigItemProps } from '../_config';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

interface NavGroupProps {
  item: MenuConfigItemProps;
}

const NavGroup = ({ item }: NavGroupProps) => {
  // menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        disablePadding
        subheader={
          item.title && (
            <Typography
              display="block"
              gutterBottom
              sx={{
                margin: '10px 0px 0.35em',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: 1.66,
                display: 'block',
                color: '#212121',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '6px',
                textTransform: 'capitalize'
              }}
            >
              {item.title}
            </Typography>
          )
        }
      >
        {items}
      </List>
      {/* <Divider sx={{ mt: 0.25, mb: 1.25 }} /> */}
    </>
  );
};

export default NavGroup;
