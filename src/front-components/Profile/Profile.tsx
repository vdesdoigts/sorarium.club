import Title from '@/front-components/Title';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from '@prisma/client';
import Link from 'next/link';
import slugify from 'slugify';

interface ProfileProps {
  userUsername: User['sorareUsername'];
}

export default function Profile({ userUsername }: ProfileProps) {
  return (
    <Box>
      <Box
        sx={{
          opacity: 0
        }}
      >
        <Title title="Profile" />
      </Box>

      <Box pt="2rem">
        <Box
          display="flex"
          flexDirection="column"
          py={3}
          bgcolor="#fff"
          borderRadius="8px"
          boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
          textAlign="center"
        >
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {userUsername}
          </Typography>
          <Link
            passHref
            href={`https://sorare.com/nba/gallery/${slugify(userUsername, {
              lower: true
            })}`}
          >
            <Typography
              component="a"
              target={'_blank'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#7f5711"
              sx={{
                textDecoration: 'underline'
              }}
            >
              {/* <LaunchOutlinedIcon /> */}
              {`sorare.com/${slugify(userUsername, {
                lower: true
              })}`}
            </Typography>
          </Link>
          <Box mt={4} px={3}>
            <Box>
              <Typography
                component="ul"
                sx={{
                  listStyle: 'none',
                  pl: 0,
                  '& li + li': {
                    mt: 0.5
                  }
                }}
              >
                <Typography
                  component="li"
                  fontSize="1rem"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box component="span" fontSize="0.875rem">
                    Common cards
                  </Box>
                  <Box component="span">
                    <Box
                      // display="inline-flex"
                      // alignItems="center"
                      // justifyContent="center"
                      // width="30px"
                      // height="30px"
                      // borderRadius="50%"
                      // bgcolor="#feddb2"
                      // color="#2c1908"
                      fontSize="0.875rem"
                    >
                      60
                    </Box>
                  </Box>
                </Typography>
                <Typography
                  component="li"
                  fontSize="1rem"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box component="span" fontSize="0.875rem">
                    Limited cards
                  </Box>
                  <Box component="span">
                    <Box
                      // display="inline-flex"
                      // alignItems="center"
                      // justifyContent="center"
                      // width="30px"
                      // height="30px"
                      // borderRadius="50%"
                      // bgcolor="#feddb2"
                      // color="#2c1908"
                      fontSize="0.875rem"
                    >
                      60
                    </Box>
                  </Box>
                </Typography>
                <Typography
                  component="li"
                  fontSize="1rem"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box component="span" fontSize="0.875rem">
                    Rare cards
                  </Box>
                  <Box component="span">
                    <Box
                      // display="inline-flex"
                      // alignItems="center"
                      // justifyContent="center"
                      // width="30px"
                      // height="30px"
                      // borderRadius="50%"
                      // bgcolor="#feddb2"
                      // color="#2c1908"
                      fontSize="0.875rem"
                    >
                      60
                    </Box>
                  </Box>
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box mt={4} px={3}>
            <Typography
              color="grey.500"
              fontSize=".75rem"
              textAlign="center"
              textTransform="uppercase"
            >
              Last update 1 day ago
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
