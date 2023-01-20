import Box from '@mui/material/Box';

export default function Underline() {
  return (
    <Box
      component="span"
      sx={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        width: '100%',
        height: '100%',
        transform: 'rotate(-.5deg) translateY(10%) translateX(-2%)'
      }}
    >
      <Box
        component="span"
        sx={{
          width: '104%',
          height: '50%',
          content: "''",
          display: 'inline-block',
          background: '#feddb2',
          // borderRadius: '0.7rem',
          transformOrigin: '0% 50%'
        }}
      />
    </Box>
  );
}
