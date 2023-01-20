import EastIcon from '@mui/icons-material/East';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

interface HomeButtonProps {
  title: string;
  reverseColor?: boolean;
}

export default function HomeButton({
  title,
  reverseColor,
  ...rest
}: HomeButtonProps) {
  return (
    <ButtonBase
      {...rest}
      component="a"
      sx={{
        m: 0,
        width: '100%',
        height: '60px',
        border: 0,
        position: 'relative',
        minWidth: '100%',
        minHeight: '60px',
        borderRadius: '60px',
        color: reverseColor ? '#fff' : '#000',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        background: reverseColor
          ? 'rgba(0, 0, 0, .6)'
          : 'rgba(255, 255, 255, .9)',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&::after': {
          content: "''",
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: reverseColor ? '#000' : '#fff',
          borderRadius: '60px',
          zIndex: 1,
          transition: 'transform 500ms ease'
        },
        '&:hover::after': {
          transform: 'translateX(calc(100% - 60px))'
        },
        '&:hover .icon-container': {
          transform: 'translateX(125%)'
        },
        '&:hover .icon--left': {
          transform: 'translateX(0)',
          opacity: 1
        },
        '&:hover .icon--right': {
          transform: 'translateX(200%)',
          opacity: 0
        }
      }}
    >
      <Box component="span" position="relative" zIndex={2}>
        {title}
      </Box>
      <Box
        className="icon-container"
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '25px',
          height: '25px',
          marginLeft: '15px',
          transition: 'transform 500ms ease'
        }}
      >
        <Box
          className="icon--right"
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '25px',
            height: '25px'
          }}
        >
          <EastIcon />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 2,
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          className="icon--left"
          sx={{
            width: '25px',
            height: '25px',
            transition: 'transform 500ms ease, opacity 250ms ease',
            transform: 'translateX(-200%)',
            opacity: 0,
            '& svg': {
              width: '100%',
              height: '100%',
              fill: reverseColor ? '#fff' : '#000'
            }
          }}
        >
          <EastIcon />
        </Box>
      </Box>
    </ButtonBase>
  );
}
