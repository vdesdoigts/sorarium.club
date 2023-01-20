import { SxProps, Typography } from '@mui/material';

interface TitleProps {
  title: string;
  sx?: SxProps;
}

export default function Title({ title, sx }: TitleProps) {
  return (
    <Typography
      sx={{
        color: '#000',
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.4rem' },
        lineHeight: 0.9,
        ...sx
      }}
    >
      {title}
    </Typography>
  );
}
