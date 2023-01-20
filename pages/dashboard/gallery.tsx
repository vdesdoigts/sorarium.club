import AlertSnackbar from '@/back-components/AlertSnackbar';
import CardGallery from '@/back-components/CardGallery';
import { ItemTypes } from '@/back-components/CardGallery/CardDnd';
import GalleryCardList from '@/back-components/GalleryCardList';
import MainPaper from '@/back-components/MainPaper';
import Scrollbar from '@/back-components/Scrollbar';
import SidebarLayout from '@/layouts/SidebarLayout';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { getMenus, getUserOrRedirect } from '@/utils/ssr';
import type {
  NbaSorareCardWithPlayer,
  PartialNbaGalleryCardWithCard
} from '@/utils/types';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NbaGallery, User } from '@prisma/client';
import axios from 'axios';
import update from 'immutability-helper';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';
import { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';

const GALLERY_LIMIT = 48;

interface GalleryProps {
  gallery: NbaGallery;
  galleryCards: PartialNbaGalleryCardWithCard[];
  galleryCardIds: string[];
  galleryCardsCount: number;
  nbaCards: NbaSorareCardWithPlayer[];
  nbaCardsCount: number;
}

function Gallery({
  gallery,
  galleryCards,
  nbaCards,
  nbaCardsCount
}: GalleryProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const [openError, setOpenError] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] =
    useState<PartialNbaGalleryCardWithCard[]>(galleryCards);

  const onSubmitGallery = async () => {
    setSaving(true);
    try {
      await axios.put<NbaGallery>(`/api/nba-gallery/${gallery.id}`, {
        cards: selectedCards.map((card, index) => ({
          cardId: card.card.id,
          position: index,
          galleryId: gallery.id
        }))
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSelectCard = (card: NbaSorareCardWithPlayer) => {
    const newCard: PartialNbaGalleryCardWithCard = {
      card,
      cardId: card.id,
      galleryId: gallery.id
    };
    if (selectedCards.find((c) => c.cardId === newCard.cardId)) {
      const newSelectedCards = selectedCards.filter(
        (selectedCard: any) => selectedCard.cardId !== newCard.cardId
      );
      setSelectedCards(newSelectedCards);
    } else {
      if (selectedCards.length >= GALLERY_LIMIT) {
        setOpenError(true);
        return;
      }
      setSelectedCards([...selectedCards, newCard]);
    }
  };

  const removeCard = (id: string) => {
    if (selectedCards.find((c) => c.cardId === id)) {
      const newSelectedCards = selectedCards.filter(
        (selectedCard: any) => selectedCard.cardId !== id
      );
      setSelectedCards(newSelectedCards);
    }
  };

  const findCard = useCallback(
    (id: string) => {
      const card = selectedCards.filter((c) => `${c.cardId}` === id)[0];
      return {
        card,
        index: selectedCards.indexOf(card)
      };
    },
    [selectedCards]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      setSelectedCards(
        update(selectedCards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card]
          ]
        })
      );
    },
    [findCard, selectedCards, setSelectedCards]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const renderView = () => {
    return (
      <>
        <Stack
          direction="row"
          px={2}
          pt={3}
          pb={1}
          justifyContent="space-between"
          spacing={1}
        >
          <Box
            sx={{
              display: 'inline-flex',
              px: 2,
              py: 2,
              borderRadius: 1,
              backgroundColor: 'grey.50',
              '& .MuiAlert-icon': {
                color: 'primary.main'
              },
              '& .MuiAlert-message': {
                color: '#000'
              }
            }}
          >
            Highlight your top Sorare NBA cards and share them with the
            community!
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              px: 2,
              py: 2,
              borderRadius: 1,
              backgroundColor: 'grey.50'
            }}
          >
            <Typography component="span" fontWeight={700}>
              {selectedCards.length}
            </Typography>
            /{GALLERY_LIMIT}
          </Box>
        </Stack>
        <CardGallery
          cards={selectedCards}
          findCard={findCard}
          moveCard={moveCard}
          removeCard={removeCard}
        />
      </>
    );
  };

  const content = useMemo(() => renderView(), [selectedCards]);

  return (
    <>
      <NextSeo title="Gallery — Sorarium" noindex />
      <Box
        ref={drop}
        height={'100%'}
        pt={{ xs: '10px', md: '20px' }}
        pr={{ xs: '10px', md: '20px' }}
        pb={{ xs: '20px', xl: '0px' }}
        pl={{ xs: '10px', md: '20px' }}
        maxWidth="1800px"
      >
        <Grid
          container
          columnSpacing={2}
          sx={{
            display: 'flex',
            [theme.breakpoints.up('md')]: {
              height: '100%'
            }
          }}
        >
          <Grid xs={12} md={7} lg={8} xl={9} sx={{ display: 'flex' }}>
            <MainPaper
              contentSx={{
                [theme.breakpoints.up('md')]: {
                  height: '100%'
                }
              }}
              headerComponent={
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading={isSaving}
                    variant="contained"
                    onClick={onSubmitGallery}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              }
              icon={CollectionsOutlinedIcon}
              title="My Gallery"
            >
              {matches ? <Scrollbar>{content}</Scrollbar> : content}
            </MainPaper>
          </Grid>
          {matches && (
            <Grid xs={12} md={5} lg={4} xl={3} sx={{ display: 'flex' }}>
              <Paper
                variant="outlined"
                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <GalleryCardList
                  nbaCards={nbaCards}
                  nbaCardsCount={nbaCardsCount}
                  selectedCards={selectedCards}
                  handleSelectCard={handleSelectCard}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      <AlertSnackbar
        message={`You have reached the ${GALLERY_LIMIT} cards limit`}
        open={openError}
        onClose={() => setOpenError(false)}
      />
    </>
  );
}

Gallery.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = (await getUserOrRedirect({ req, res })) as User;

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    const gallery = await prisma.nbaGallery.upsert({
      select: {
        id: true
      },
      where: {
        userId: user.id
      },
      create: {
        userId: user.id
      },
      update: {}
    });

    const galleryCards = await prisma.nbaGalleryCard.findMany({
      include: {
        card: true
      },
      take: GALLERY_LIMIT,
      where: {
        galleryId: gallery.id
      },
      orderBy: {
        position: 'asc'
      }
    });

    const nbaCards = await prisma.nbaSorareCard.findMany({
      where: {
        users: {
          some: {
            id: user.id
          }
        }
      },
      take: 50,
      include: {
        player: true
      },
      orderBy: {
        slug: 'asc'
      }
    });

    const nbaCardsCount = await prisma.nbaSorareCard.count({
      where: {
        users: {
          some: {
            id: user.id
          }
        }
      }
    });

    const menus = await getMenus({ user });

    return {
      props: {
        menus,
        gallery,
        galleryCards,
        nbaCards,
        nbaCardsCount
      }
    };
  },
  ironSessionConfig
);

export default Gallery;
