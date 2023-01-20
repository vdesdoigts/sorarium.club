import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import FormDialog from './FormDialog';

interface SearchPlayerItemProps {
  src: string;
  teamTitle: string;
  title: string;
}

function SearchPlayerItem({ src, teamTitle, title }: SearchPlayerItemProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box px={2} onClick={handleClickOpen}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          px={3}
          sx={{
            cursor: 'pointer',
            width: '100%',
            p: '1px',
            bgcolor: (theme) => theme.colors.alpha.black[5],
            borderRadius: '44px',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: (theme) => theme.colors.alpha.black[10]
            },
            '&:hover .MuiButtonBase-root': {
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText
            }
          }}
        >
          <Box
            sx={{
              width: '100%',
              p: '2px',
              bgcolor: '#fff',
              borderRadius: '44px'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box position="relative">
                <Avatar
                  variant="circular"
                  alt={title}
                  src={src}
                  sx={{
                    width: '44px',
                    height: '44px',
                    bgcolor: '#d1d3d5',
                    img: {
                      objectPosition: 'center 2px'
                    }
                  }}
                />
              </Box>
              <Stack direction="column" spacing={0.5}>
                <Typography variant="subtitle1" sx={{ lineHeight: 1 }} noWrap>
                  {title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1
                    // color: (theme) => theme.palette[rarity].main
                  }}
                >
                  {teamTitle}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <FormDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default SearchPlayerItem;
