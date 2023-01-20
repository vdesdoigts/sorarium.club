import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      pt={6}
      pb={4}
      px={{ xs: 2, sm: 4 }}
      sx={{
        width: '100%',
        maxWidth: '1480px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <Grid container spacing={1} justifyContent="space-between">
        <Grid>
          <Link href="/" passHref>
            <Typography
              component="a"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '1.5rem',
                color: '#000',
                textDecoration: 'none'
              }}
            >
              sorarium
            </Typography>
          </Link>
        </Grid>
        <Grid>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid>
              <Link href="https://twitter.com/vdesdoigts" passHref>
                <MuiLink
                  component="a"
                  display="inline-block"
                  sx={{ color: '#000' }}
                >
                  Terms & Privacy
                </MuiLink>
              </Link>
            </Grid>
            <Grid>
              <Link href="https://twitter.com/vdesdoigts" passHref>
                <IconButton component="a" target="_blank">
                  <TwitterIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid>
              <Link href="mailto:vdesdoigts+sorarium@gmail.com" passHref>
                <IconButton component="a" target="_blank">
                  <AlternateEmailIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
