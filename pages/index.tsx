import DemoCardGallery from '@/front-components/DemoCardGallery';
import HomeButton from '@/front-components/HomeButton';
import HomeCollection from '@/front-components/HomeCollection';
import Underline from '@/front-components/Underline';
import SiteLayout from '@/layouts/SiteLayout';
import { getPublicGalleryCards } from '@/utils/gallery';
import { prisma } from '@/utils/prisma';
import type {
  NbaCollectionWithCards,
  NbaSorareCardWithPlayer
} from '@/utils/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import update from 'immutability-helper';
import Link from 'next/link';
import { useCallback, useState } from 'react';

interface HomeProps {
  cards: NbaSorareCardWithPlayer[];
  collections: NbaCollectionWithCards[];
  userId: string;
}

function Home({ collections, userId, ...props }: HomeProps) {
  const [cards, setCards] = useState<NbaSorareCardWithPlayer[]>(props.cards);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card)
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card]
          ]
        })
      );
    },
    [cards, findCard, setCards]
  );

  return (
    <>
      <Box textAlign="center" pt={8}>
        <Typography
          component="h1"
          color="#000"
          fontFamily="Poppins"
          fontSize={{ xs: '2.2rem', sm: '3rem', md: '5rem' }}
          fontWeight={800}
          textTransform="uppercase"
          lineHeight="1"
        >
          <Box component="span" position="relative">
            <Underline />
            <Box
              component="span"
              position="relative"
              zIndex={2}
              color={(theme) => theme.colors.backgrounds.main}
              sx={{
                textShadow:
                  '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Collectibles
            </Box>
          </Box>
          <br />
          <Box component="span" position="relative">
            <Underline />
            <Box component="span" position="relative" zIndex={2}>
              Showcase
            </Box>
          </Box>
          <br />
          <Box component="span" position="relative">
            <Underline />
            <Box
              component="span"
              position="relative"
              zIndex={2}
              color={(theme) => theme.colors.backgrounds.main}
              sx={{
                textShadow:
                  '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              for NBA Sorare
            </Box>
          </Box>
        </Typography>
      </Box>
      <HomeCollection collections={collections} userId={userId} />
      <Box
        pt={4}
        pb={4}
        px={{ xs: 2, sm: 4 }}
        sx={{
          width: '100%',
          maxWidth: '1480px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Grid container columnSpacing={3}>
          <Grid xs sx={{ order: { xs: 2, md: 1 } }}>
            <Box
              overflow="hidden"
              position="relative"
              pt={2}
              px={2}
              pb={1}
              bgcolor="#fff"
              borderRadius="8px"
              boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
            >
              <DemoCardGallery
                cards={cards}
                findCard={findCard}
                moveCard={moveCard}
              />
            </Box>
          </Grid>
          <Grid
            width={{ xs: '100%', md: '400px' }}
            mb={{ xs: 4, md: 0 }}
            sx={{ order: { xs: 1, md: 2 } }}
          >
            <Box
              position="relative"
              display="flex"
              flexDirection="column"
              pb={3}
              bgcolor="#000"
              borderRadius="8px"
              boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
            >
              <Box
                height="528px"
                display="flex"
                flexDirection="column"
                pt={3}
                px={3}
              >
                <Box flex={1}>
                  <Typography
                    sx={{
                      color: '#fff',
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '2.2rem',
                      lineHeight: 1.3,
                      textAlign: 'left'
                    }}
                  >
                    Drag & Drop
                    <br /> your cards
                    <br /> to create
                    <br /> your own showcase
                  </Typography>
                </Box>
                <Box>
                  <Link
                    href={`/galleries/${process.env.NEXT_PUBLIC_HOME_GALLERY_ID}`}
                    passHref
                  >
                    <HomeButton title="Explore" />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

Home.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export async function getServerSideProps() {
  const collections = process.env.HOME_USER_ID
    ? await prisma.nbaCollection.findMany({
        where: {
          userId: process.env.HOME_USER_ID
        },
        include: {
          _count: {
            select: {
              cards: true
            }
          },
          cards: {
            take: 3,
            include: {
              card: true
            },
            orderBy: {
              position: 'asc'
            }
          }
        },
        orderBy: {
          position: 'asc'
        }
      })
    : null;

  const gallery = process.env.NEXT_PUBLIC_HOME_GALLERY_ID
    ? await prisma.nbaGallery.findUnique({
        where: {
          id: process.env.NEXT_PUBLIC_HOME_GALLERY_ID as string
        },
        include: {
          user: true
        }
      })
    : null;

  const { galleryCards, sorareCards } = gallery
    ? await getPublicGalleryCards({
        galleryId: gallery.id,
        userId: gallery.userId,
        withGalleryCard: true,
        resultPerPage: 8
      })
    : { galleryCards: [], sorareCards: undefined };

  return {
    props: {
      userId: process.env.HOME_USER_ID,
      collections,
      cards: sorareCards
        ? [...galleryCards.map(({ card }) => card), ...sorareCards]
        : galleryCards.map(({ card }) => card)
    }
  };
}

export default Home;
