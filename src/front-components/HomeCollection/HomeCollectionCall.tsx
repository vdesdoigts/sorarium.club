import HomeButton from '@/front-components/HomeButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface HomeCollectionCallProps {
  userId: string;
}

export default function HomeCollectionCall({
  userId
}: HomeCollectionCallProps) {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      pb={3}
      bgcolor="#000"
      borderRadius="8px"
      boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
    >
      <Box height="528px" display="flex" flexDirection="column" pt={3} px={3}>
        <Box flex={1}>
          <Typography
            sx={{
              color: '#fff',
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '2.2rem',
              lineHeight: 1.3,
              textAlign: 'left'
            }}
          >
            Create & Share
            <br /> your collections
            <br /> with the
            <br /> community
          </Typography>
        </Box>
        <Box>
          <Link href={`/profile/${userId}`} passHref>
            <HomeButton title="Discover" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
