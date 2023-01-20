import ProfileSection from '@/back-components/ProfileSection';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';

function Header() {
  const { y: scrollY } = useWindowScroll();
  const lastScrollY = useRef(scrollY);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    const direction = scrollY > lastScrollY.current ? 'down' : 'up';
    if (
      direction !== scrollDirection &&
      (scrollY - lastScrollY.current > 10 ||
        scrollY - lastScrollY.current < -10)
    ) {
      setScrollDirection(direction);
    }
    lastScrollY.current = scrollY > 0 ? scrollY : 0;
  }, [scrollY]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 10,
        pointerEvents: 'all',
        background: '#fff',
        transition: 'transform 300ms ease',
        transform:
          lastScrollY.current !== 0 && scrollDirection === 'down'
            ? 'translateY(-70px)'
            : 'translateY(0)'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1480px',
          px: 4,
          margin: '0 auto',
          transform: 'translate(0px, 0px)'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            left: '0rem',
            width: '100%',
            top: 0,
            color: '#000',
            fontSize: 0
          }}
        >
          <Box
            sx={{
              zIndex: 2,
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '4.375rem'
            }}
          >
            <Link passHref href="/">
              <Typography
                component="a"
                sx={{
                  position: 'relative',
                  zIndex: 2,
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
            <ProfileSection />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
