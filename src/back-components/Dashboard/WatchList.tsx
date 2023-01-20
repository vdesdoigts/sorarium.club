import MainPaper from '@/back-components/MainPaper';
import WatchList from '@/back-components/WatchList';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { Button, Divider, Stack } from '@mui/material';
import Link from 'next/link';

function DashboardWatchList() {
  return (
    <MainPaper
      headerComponent={
        <Stack direction="row" spacing={2}>
          <Link href="/watchlist" passHref>
            <Button>Edit</Button>
          </Link>
        </Stack>
      }
      icon={LocalFireDepartmentOutlinedIcon}
      title="Watchlist"
    >
      <WatchList />
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        pt={2}
        pb={2}
        px={3}
      >
        <Button>View all cards</Button>
      </Stack>
    </MainPaper>
  );
}

export default DashboardWatchList;
