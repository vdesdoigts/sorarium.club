import Title from '@/front-components/Title';
import type { NbaCollectionWithCards } from '@/utils/types';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import CollectionSwiperItem from './CollectionSwiperItem';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useRef, useState } from 'react';

interface CollectionsProps {
  collections: NbaCollectionWithCards[];
}

export default function Collections({ collections }: CollectionsProps) {
  const swiperRef = useRef(null);
  const [isReady, setReady] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const onNext = () => {
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      swiper.slideNext();
    }
  };

  const onPrev = () => {
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      swiper.slidePrev();
    }
  };

  const onAfterInit = () => {
    setReady(true);
    const swiper = swiperRef.current?.swiper;
    if (swiper && !swiper.isEnd && swiper.isBeginning) {
      setShowNavigation(true);
    }
  };

  return (
    <Box>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        px={{ xs: 2, sm: 4 }}
      >
        <Grid>
          <Title title="Collections" />
        </Grid>
        {showNavigation && (
          <Grid>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid>
                <IconButton onClick={onPrev}>
                  <KeyboardArrowLeftIcon />
                </IconButton>
              </Grid>
              <Grid>
                <IconButton onClick={onNext}>
                  <KeyboardArrowRightIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          '&  > .swiper': {
            width: '100%',
            height: '100%',
            px: 4,
            overflow: 'visible'
          },
          '& .swiper-slide': {
            textAlign: 'center',
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            opacity: isReady ? 1 : 0
          }
        }}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={'auto'}
          onAfterInit={onAfterInit}
        >
          {collections.map((collection) => (
            <SwiperSlide key={collection.id}>
              <Link passHref href={`/collections/${collection.id}`}>
                <Box
                  component="a"
                  display="inline-flex"
                  width="300px"
                  sx={{ textDecoration: 'none' }}
                >
                  <Box width="100%" pt={3} pb={1}>
                    <CollectionSwiperItem collection={collection} />
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
