import type { NbaCollectionWithCards } from '@/utils/types';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CollectionSwiperItemProps {
  collection: NbaCollectionWithCards;
}

export default function CollectionSwiperItem({
  collection
}: CollectionSwiperItemProps) {
  const swiperRef = useRef(null);
  const direction = useRef<'next' | 'prev'>('next');
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    let timeout = null;
    let interval = null;

    if (hovered) {
      timeout = setTimeout(() => swipe(), 500);
      interval = setInterval(() => swipe(), 2800);
    } else {
      clearTimeout(timeout);
      clearInterval(interval);
    }
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [hovered]);

  const swipe = () => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      if (swiper.isEnd) {
        direction.current = 'prev';
        swiper.slidePrev();
      } else if (swiper.isBeginning) {
        direction.current = 'next';
        swiper.slideNext();
      } else if (direction.current === 'next') {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }
    }
  };

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      height="528px"
      pb={3}
      bgcolor="#fff"
      borderRadius="8px"
      boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        transition: 'all .2s ease-in-out',
        '&:hover': {
          boxShadow: '0 1px 3px rgb(25 25 25 / 20%)'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingTop: 4
        }}
      >
        <Box
          sx={{
            width: '100%',
            '& .swiper': {
              position: 'initial',
              // perspective: 'inherit',
              width: '190px', // '140px',
              height: '310px' // '228px'
            },
            '& .swiper-wrapper': {
              cursor: 'inherit !important'
            },
            '& .swiper-slide-shadow': {
              display: 'none'
            }
          }}
        >
          <Swiper
            ref={swiperRef}
            allowTouchMove={false}
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            initialSlide={1}
            speed={600}
          >
            {collection.cards.map((card) => (
              <SwiperSlide key={card.id}>
                <Image
                  priority
                  src={card.card.imageUrl}
                  width={257}
                  height={416}
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                  alt={card.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          sx={{
            display: 'flex',

            flex: 1,
            paddingTop: 3
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            width="100%"
          >
            <Grid
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                textAlign: 'center'
              }}
            >
              <Typography
                pb={1}
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'Roboto, sans-serif',
                  lineHeight: 1.235
                }}
              >
                {collection.title}
              </Typography>
              <Typography
                pb={2}
                px={{ xs: 2, sm: 4 }}
                sx={{
                  fontSize: '1rem',
                  // color: 'rgb(33, 33, 33)',
                  fontWeight: 400,
                  fontFamily: 'Roboto, sans-serif',
                  lineHeight: 1.235
                }}
              >
                {collection.description}
              </Typography>
            </Grid>
            <Grid sx={{ textAlign: 'center' }}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={1.6}
                py={1}
                borderRadius="28px"
                bgcolor="#feddb2"
                color="#2c1908"
                fontSize="0.875rem"
              >
                <StyleOutlinedIcon fontSize="medium" />
                <Typography
                  sx={{
                    pl: 0.6,
                    fontWeight: 600,
                    fontFamily: 'Roboto, sans-serif',
                    lineHeight: 1.235
                  }}
                >
                  {/* @ts-ignore */}
                  {collection._count.cards}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
