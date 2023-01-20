import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import type { ChipProps } from '@mui/material';

const icons = {
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  StyleOutlinedIcon: StyleOutlinedIcon,
  CollectionsOutlinedIcon: CollectionsOutlinedIcon,
  BookmarksOutlinedIcon: BookmarksOutlinedIcon,
  LocalFireDepartmentOutlinedIcon: LocalFireDepartmentOutlinedIcon,
  CategoryOutlinedIcon: CategoryOutlinedIcon
};

export interface MenuConfigItemProps {
  id: string;
  title: string;
  caption: string;
  type: string;
  icon: any;
  children: MenuConfigItemProps[];
  url?: string;
  chip?: ChipProps;
  external?: boolean;
  target?: boolean;
  disabled?: boolean;
}

export default function getMenuConfig(props: any) {
  return [
    {
      id: 'support',
      title: 'Dashboard',
      type: 'group',
      icon: icons['ContactSupportOutlinedIcon'],
      children: [
        {
          id: 'overview',
          title: 'Overview',
          type: 'item',
          icon: icons['CategoryOutlinedIcon'],
          url: '/dashboard'
        },
        {
          id: 'gallery',
          title: 'My Gallery',
          type: 'item',
          icon: icons['CollectionsOutlinedIcon'],
          url: '/dashboard/gallery'
        },
        {
          id: 'collections',
          title: 'Collections',
          type: 'collapse',
          icon: icons['StyleOutlinedIcon'],
          ...(props['menu-collections']
            ? {
                children: props['menu-collections']
              }
            : {})
        },
        // {
        //   id: 'watchlist',
        //   title: 'Watchlist',
        //   type: 'item',
        //   icon: icons['LocalFireDepartmentOutlinedIcon'],
        //   url: '/dashboard/watchlist'
        // },
        {
          id: 'wishlist',
          title: 'Wishlist',
          type: 'item',
          icon: icons['BookmarksOutlinedIcon'],
          url: '/dashboard/wishlist'
        }
      ]
    }
  ];
}
