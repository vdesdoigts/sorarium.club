import Title from '@/front-components/Title';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { User } from '@prisma/client';
import Link from 'next/link';
import slugify from 'slugify';

interface ProfileProps {
  description: string;
  title: string;
  userUsername: User['sorareUsername'];
}

export default function CollectionCall({
  description,
  title,
  userUsername
}: ProfileProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      bgcolor="#feddb2"
      borderRadius="8px"
      boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
    >
      <Title title={userUsername} sx={{ fontSize: '3rem', lineHeight: 1 }} />
      <Title title="Collection" sx={{ fontSize: '3rem', lineHeight: 1 }} />
      {/* <Box mt={2} p={2} bgcolor="#795821" borderRadius="8px"> */}
      <Typography mt={2} color="#000" fontFamily="Poppins" fontWeight={600}>
        {title}
      </Typography>
      <Typography color="#000">{description}</Typography>
      {/* </Box> */}
      <Box mt={4}>
        <Link
          passHref
          href={`https://sorare.com/nba/gallery/${slugify(userUsername, {
            lower: true
          })}`}
        >
          <Typography
            component="a"
            target={'_blank'}
            color="#000"
            sx={{
              textDecoration: 'underline'
            }}
          >
            {`sorare.com/${slugify(userUsername, {
              lower: true
            })}`}
          </Typography>
        </Link>
        <Typography mt={1} color="#000">
          Last update 1 day ago
        </Typography>
      </Box>
    </Box>
  );
}
