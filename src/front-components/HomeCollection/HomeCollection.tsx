import CollectionSwiperItem from '@/front-components/Collections/CollectionSwiperItem';
import type { NbaCollectionWithCards } from '@/utils/types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeCollectionCall from './HomeCollectionCall';

interface HomeProps {
  collections: NbaCollectionWithCards[];
  userId: string;
}

export default function HomeCollection({ collections, userId }: HomeProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });
  const [isReady, setReady] = useState<boolean>(false);

  const onAfterInit = () => {
    setReady(true);
  };

  return (
    <Box
      pt={10}
      pb={4}
      sx={{
        width: '100%',
        maxWidth: '1480px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      {!matches && (
        <Box mx="auto" px={{ xs: 2, sm: 4 }} mb={4}>
          <HomeCollectionCall userId={userId} />
        </Box>
      )}
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
          spaceBetween={20}
          slidesPerView={'auto'}
          onAfterInit={onAfterInit}
        >
          {matches && (
            <SwiperSlide>
              <Grid>
                <HomeCollectionCall userId={userId} />
              </Grid>
            </SwiperSlide>
          )}
          {collections?.length > 0 &&
            collections.map((collection) => (
              <SwiperSlide key={collection.id}>
                <Link passHref href={`/collections/${collection.id}`}>
                  <Box
                    component="a"
                    display="inline-flex"
                    width="300px"
                    sx={{ textDecoration: 'none' }}
                  >
                    <Box width="100%" pb={1}>
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
