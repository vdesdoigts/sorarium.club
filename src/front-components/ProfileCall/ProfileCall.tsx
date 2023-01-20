import Underline from '@/front-components/Underline';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { User } from '@prisma/client';
import Link from 'next/link';
import slugify from 'slugify';

const textColor = '#000';

interface ProfileProps {
  userUsername: User['sorareUsername'];
}

export default function ProfileCall({ userUsername }: ProfileProps) {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid xs={12} sm="auto">
          <Typography
            component="h1"
            color="#000"
            fontFamily="Poppins"
            fontSize={{ xs: '2rem', sm: '3rem', md: '5rem' }}
            fontWeight="800"
            textTransform="uppercase"
            lineHeight="1"
          >
            <Box component="span" position="relative">
              <Underline />
              <Box component="span" position="relative" zIndex={2}>
                {userUsername}
              </Box>
            </Box>
            <br />
            <Box
              component="span"
              color={(theme) => theme.colors.backgrounds.main}
              sx={{
                position: 'relative',
                textShadow:
                  '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              <Underline />
              <Box component="span" position="relative" zIndex={2}>
                Showcase
              </Box>
            </Box>
          </Typography>
        </Grid>
        <Grid xs={12} sm="auto">
          <Box pb={{ xs: 1, md: 2 }}>
            <Link
              passHref
              href={`https://sorare.com/nba/gallery/${slugify(userUsername, {
                lower: true
              })}`}
            >
              <Typography
                component="a"
                target={'_blank'}
                color={textColor}
                sx={{
                  textDecoration: 'underline'
                }}
              >
                {`sorare.com/${slugify(userUsername, {
                  lower: true
                })}`}
              </Typography>
            </Link>
            <Typography color={textColor}>Last update 1 day ago</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
