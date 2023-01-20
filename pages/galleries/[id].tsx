import Gallery from '@/front-components/Gallery';
import GallerySidebar, {
  FiltersProps
} from '@/front-components/GallerySidebar';
import Title from '@/front-components/Title';
import SiteLayout from '@/layouts/SiteLayout';
import { getPublicGalleryCards } from '@/utils/gallery';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import type {
  NbaGalleryWithUser,
  NbaSorareCardWithPlayer
} from '@/utils/types';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { NbaTeam } from '@prisma/client';
import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProfileProps {
  cards: NbaSorareCardWithPlayer[];
  gallery: NbaGalleryWithUser;
  galleryCardCursor?: string;
  hasNextGalleryCards?: boolean;
  sorareCardCursor: string;
  hasNextSorareCardPage?: boolean;
  teams: NbaTeam[];
}

function GalleryPage({ gallery, teams, ...props }: ProfileProps) {
  const [cards, setCards] = useState<NbaSorareCardWithPlayer[]>(props.cards);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>({
    team: undefined,
    onlySerialNumber: false,
    sortedByOwner: true
  });
  const [galleryCardCursor, setGalleryCardCursor] = useState<string>(
    props.galleryCardCursor
  );
  const [hasNextGalleryCards, setHasNextGalleryCards] = useState<boolean>(
    props.hasNextGalleryCards
  );
  const [sorareCardCursor, setSorareCardCursor] = useState<string>(
    props.sorareCardCursor
  );
  const [hasNextSorareCards, setHasNextSorareCards] = useState<boolean>(
    props.hasNextSorareCardPage
  );

  const onFilterChange = (key: string, value: string | boolean) => {
    setHasNextGalleryCards(undefined);
    setHasNextSorareCards(undefined);
    setSorareCardCursor(undefined);
    setGalleryCardCursor(undefined);

    if (key !== 'sortedByOwner') {
      setFilters((prev) => ({ ...prev, sortedByOwner: false, [key]: value }));
    } else if (key === 'sortedByOwner' && value === true) {
      setFilters({
        sortedByOwner: true,
        team: undefined,
        onlySerialNumber: false
      });
    } else {
      // @ts-ignore
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const onPaginationChange = () => {
    getCards();
  };

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
    } else {
      getCards(true);
    }
  }, [filters]);

  const getCards = (reset?: boolean) => {
    setLoading(true);
    try {
      axios
        .get('/api/nba-gallery-card/public', {
          params: {
            galleryId: gallery.id,
            ...(filters.team ? { teamId: filters.team } : {}),
            ...(filters.onlySerialNumber
              ? { onlySerialNumber: filters.onlySerialNumber }
              : {}),
            ...(galleryCardCursor ? { galleryCardCursor } : {}),
            ...(sorareCardCursor ? { sorareCardCursor } : {}),
            ...(filters.sortedByOwner
              ? {
                  withGalleryCard: filters.sortedByOwner && !sorareCardCursor
                }
              : {})
          }
        })
        .then((res) => {
          const {
            sorareCards,
            hasNextGalleryCards,
            galleryCards,
            hasNextSorareCardPage
          } = res.data;
          setGalleryCardCursor(
            galleryCards?.length
              ? galleryCards[galleryCards.length - 1].id
              : undefined
          );
          setSorareCardCursor(
            sorareCards?.length
              ? sorareCards[sorareCards.length - 1].id
              : undefined
          );
          setHasNextGalleryCards(hasNextGalleryCards);
          setHasNextSorareCards(hasNextSorareCardPage);

          if (reset) {
            setCards(
              sorareCards
                ? [...galleryCards.map(({ card }) => card), ...sorareCards]
                : galleryCards.map(({ card }) => card)
            );
          } else {
            setCards(
              sorareCards
                ? [
                    ...cards,
                    ...galleryCards.map(({ card }) => card),
                    ...sorareCards
                  ]
                : [...cards, ...galleryCards.map(({ card }) => card)]
            );
          }
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NextSeo
        title={`${gallery.user.sorareUsername} gallery – Sorarium`}
        description={`Explore ${gallery.user.sorareUsername} NBA Sorare gallery on Sorarium.`}
      />
      <Box
        pb={4}
        sx={{
          width: '100%',
          maxWidth: '1480px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Box pt={7} px={{ xs: 2, sm: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Box position="relative" zIndex={2} pb={1}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link passHref href={`/profile/${gallery.user.id}`}>
                  <MuiLink component="a" underline="hover" color="inherit">
                    {gallery.user.sorareUsername}
                  </MuiLink>
                </Link>
                <Typography color="text.primary">Gallery</Typography>
              </Breadcrumbs>
            </Box>
            <Box position="relative" zIndex={1}>
              <Title title="Gallery" />
            </Box>
          </Box>
          <Box pt={1}>
            <Grid container columnSpacing={3}>
              <Grid width="400px">
                <Box pt={2} position="sticky" top="70px" zIndex={2}>
                  <GallerySidebar
                    disabledSortedByOwner={!props.galleryCardCursor}
                    filters={filters}
                    teams={teams}
                    onFilterChange={onFilterChange}
                  />
                </Box>
              </Grid>
              <Grid xs zIndex={1}>
                <Box pt={2}>
                  <Gallery
                    cards={cards}
                    hasNextPage={hasNextGalleryCards || hasNextSorareCards}
                    isLoading={isLoading}
                    onPaginationChange={onPaginationChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

GalleryPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ params }) {
    const gallery = await prisma.nbaGallery.findUnique({
      where: {
        id: params.id
      },
      include: {
        user: true
      }
    });

    if (!gallery) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    const {
      galleryCards,
      hasNextGalleryCards,
      sorareCards,
      hasNextSorareCardPage
    } = await getPublicGalleryCards({
      galleryId: gallery.id,
      userId: gallery.userId,
      withGalleryCard: true
    });

    const teams = await prisma.nbaTeam.findMany();

    return {
      props: {
        cards: sorareCards
          ? [...galleryCards.map(({ card }) => card), ...sorareCards]
          : galleryCards.map(({ card }) => card),
        gallery,
        galleryCardCursor:
          galleryCards.length > 0
            ? galleryCards[galleryCards.length - 1].id
            : null,
        hasNextGalleryCards,
        sorareCardCursor:
          sorareCards?.length > 0
            ? sorareCards[sorareCards.length - 1].id
            : null,
        hasNextSorareCardPage,
        teams
      }
    };
  },
  ironSessionConfig
);

export default GalleryPage;
