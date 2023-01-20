import AlertSnackbar from '@/back-components/AlertSnackbar';
import CardGallery from '@/back-components/CardGallery';
import { ItemTypes } from '@/back-components/CardGallery/CardDnd';
import FormCollectionDialog, {
  Inputs
} from '@/back-components/FormCollectionDialog';
import GalleryCardList from '@/back-components/GalleryCardList';
import MainPaper from '@/back-components/MainPaper';
import Scrollbar from '@/back-components/Scrollbar';
import SidebarLayout from '@/layouts/SidebarLayout';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { getMenus, getUserOrRedirect } from '@/utils/ssr';
import type {
  NbaSorareCardWithPlayer,
  PartialNbaCollectionCardWithCard
} from '@/utils/types';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NbaCollection, User } from '@prisma/client';
import axios from 'axios';
import update from 'immutability-helper';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';
import { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';

const COLLECTION_LIMIT = 32;

interface CollectionProps {
  collection: NbaCollection;
  collectionCards: PartialNbaCollectionCardWithCard[];
  nbaCards: NbaSorareCardWithPlayer[];
  nbaCardsCount: number;
}

function Collection({
  collection,
  collectionCards,
  nbaCards,
  nbaCardsCount
}: CollectionProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const [title, setTitle] = useState<string>(collection.title);
  const [description, setDescription] = useState<string>(
    collection.description
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedCards, setSelectedCards] =
    useState<PartialNbaCollectionCardWithCard[]>(collectionCards);

  const onCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const onOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const onSubmitCollection = async () => {
    setLoading(true);
    try {
      await axios.put<NbaCollection>(`/api/nba-collection/${collection.id}`, {
        cards: selectedCards.map((card, index) => ({
          cardId: card.card.id,
          position: index,
          collectionId: collection.id
        }))
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCard = (card: NbaSorareCardWithPlayer) => {
    const newCard: PartialNbaCollectionCardWithCard = {
      card,
      cardId: card.id,
      collectionId: collection.id
    };
    if (selectedCards.find((c) => c.cardId === newCard.cardId)) {
      const newSelectedCards = selectedCards.filter(
        (selectedCard: any) => selectedCard.cardId !== newCard.cardId
      );
      setSelectedCards(newSelectedCards);
    } else {
      if (selectedCards.length >= COLLECTION_LIMIT) {
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
    [selectedCards, findCard, setSelectedCards]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const renderView = () => {
    return (
      <>
        <Box px={2} pt={3} pb={1}>
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
            {description}
          </Box>
        </Box>
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
      <NextSeo title={`${title} collection — Sorarium`} noindex />
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
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={onOpenEditDialog}>
                    Edit
                  </Button>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    onClick={onSubmitCollection}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              }
              icon={StyleOutlinedIcon}
              title={title}
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
      <FormCollectionDialog
        id={collection.id}
        defaultValues={{
          title: collection.title,
          description: collection.description
        }}
        open={openEditDialog}
        onClose={onCloseEditDialog}
        setData={({ title, description }: Inputs) => {
          setTitle(title);
          setDescription(description);
        }}
      />
      <AlertSnackbar
        message={`You have reached the ${COLLECTION_LIMIT} cards limit`}
        open={openError}
        onClose={() => setOpenError(false)}
      />
    </>
  );
}

Collection.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res, params }) {
    const user = (await getUserOrRedirect({ req, res })) as User;

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    const collection = await prisma.nbaCollection.findUnique({
      where: {
        id: params.id
      }
    });

    const collectionCards = await prisma.nbaCollectionCard.findMany({
      include: {
        card: true
      },
      where: {
        collectionId: params.id
      },
      orderBy: {
        position: 'asc'
      }
    });

    const nbaCards = await prisma.nbaSorareCard.findMany({
      take: 30,
      where: {
        users: {
          some: {
            id: user.id
          }
        }
      },
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
        collection,
        collectionCards,
        nbaCards,
        nbaCardsCount
      }
    };
  },
  ironSessionConfig
);

export default Collection;
