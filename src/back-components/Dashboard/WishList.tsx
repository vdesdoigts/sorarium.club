import MainPaper from '@/back-components/MainPaper';
import WishList from '@/back-components/WishList';
import { NbaWishlistWithCards } from '@/utils/types';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Box, Button, Divider, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

interface WishlistProps {
  wishlist: NbaWishlistWithCards;
}

export default function DashboardWishList({ wishlist }: WishlistProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });
  return (
    <MainPaper
      headerComponent={
        <Stack direction="row" spacing={2}>
          <Link href="dashboard/wishlist" passHref>
            {matches ? (
              <Button>Edit</Button>
            ) : (
              <IconButton color="primary">
                <ModeEditOutlinedIcon />
              </IconButton>
            )}
          </Link>
        </Stack>
      }
      icon={BookmarksOutlinedIcon}
      title="Wishlist"
    >
      {!wishlist || wishlist.cards.length === 0 ? (
        <Box textAlign="center" py={2}>
          No wishlist yet
        </Box>
      ) : (
        <>
          <WishList wishlist={wishlist} />
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            pt={2}
            pb={2}
            px={3}
          >
            <Link href="dashboard/wishlist" passHref>
              <Button>View all cards</Button>
            </Link>
          </Stack>
        </>
      )}
    </MainPaper>
  );
}
