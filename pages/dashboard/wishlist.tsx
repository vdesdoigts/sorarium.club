import CardGallery from '@/back-components/CardGallery';
import { ItemTypes } from '@/back-components/CardGallery/CardDnd';
import MainPaper from '@/back-components/MainPaper';
import PlayerList from '@/back-components/PlayerList';
import Scrollbar from '@/back-components/Scrollbar';
import SidebarLayout from '@/layouts/SidebarLayout';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { getMenus, getUserOrRedirect } from '@/utils/ssr';
import type {
  NbaPlayerWithTeam,
  NbaSorareCardWithPlayer,
  NbaWishlistCardWithCard,
  PartialNbaWishlistCardWithCard
} from '@/utils/types';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NbaWishlist, User } from '@prisma/client';
import axios from 'axios';
import update from 'immutability-helper';
import { withIronSessionSsr } from 'iron-session/next';
import Head from 'next/head';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

interface WishlistProps {
  wishlist: NbaWishlist;
  wishlistCards: NbaWishlistCardWithCard[];
  wishlistCardsCount: number;
  players: NbaPlayerWithTeam[];
}

function Wishlist({ wishlist, players, ...props }: WishlistProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const [cards, setCards] = useState<NbaWishlistCardWithCard[]>(
    props.wishlistCards // cards whose in the bdd
  );

  const [selectedCards, setSelectedCards] = useState<
    PartialNbaWishlistCardWithCard[]
  >(props.wishlistCards); // Partial because we don't have id or position on adding

  const [wishlistCardsCount, setWishlistCardsCount] = useState<number>(
    props.wishlistCardsCount
  );

  const wishlistCardCursor = useRef<string | null>(
    props.wishlistCards[props.wishlistCards.length - 1]?.id || null
  );

  const onSubmitWishlist = async () => {
    setLoading(true);
    try {
      const res = await axios.put<{
        count: number;
        wishlistCards: NbaWishlistCardWithCard[];
      }>(`/api/wishlist/${wishlist.id}`, {
        cards: selectedCards.map((card, index) => ({
          cardId: card.card.id,
          position: index,
          wishlistId: wishlist.id
        }))
      });
      setCards(res.data.wishlistCards);
      setWishlistCardsCount(res.data.count);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCard = (card: NbaSorareCardWithPlayer) => {
    const newCard: PartialNbaWishlistCardWithCard = {
      card,
      cardId: card.id,
      wishlistId: wishlist.id
    };
    if (!selectedCards.find((c) => c.cardId === newCard.cardId)) {
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

  const onPaginationChange = () => {
    getCards();
  };

  const getCards = () => {
    setLoading(true);
    try {
      axios
        .get('/api/wishlist', {
          params: {
            ...(wishlistCardCursor
              ? {
                  cursor: wishlistCardCursor.current
                }
              : {})
          }
        })
        .then((res) => {
          const { wishlistCards, wishlistCardsCount: count } = res.data;
          wishlistCardCursor.current =
            wishlistCards?.length > 0
              ? wishlistCards[wishlistCards.length - 1].id
              : null;
          setWishlistCardsCount(count);
          setCards((prev) => [...prev, ...wishlistCards]);
          setSelectedCards((prev) => [...prev, ...wishlistCards]);
        });
    } finally {
      setLoading(false);
    }
  };

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const renderView = () => {
    return (
      <CardGallery
        cards={selectedCards}
        hasNextPage={cards?.length < wishlistCardsCount}
        findCard={findCard}
        moveCard={moveCard}
        removeCard={removeCard}
        onPaginationChange={onPaginationChange}
      />
    );
  };

  const content = useMemo(
    () => renderView(),
    [selectedCards, cards, wishlistCardsCount]
  );

  return (
    <>
      <Head>
        <title>Wishlist — Dashboard</title>
      </Head>
      <Box
        ref={drop}
        height={{ md: '100%' }}
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
                    loading={isLoading}
                    variant="contained"
                    onClick={onSubmitWishlist}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              }
              icon={BookmarksOutlinedIcon}
              title="Wishlist"
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
                <PlayerList
                  players={players}
                  handleSelectCard={handleSelectCard}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

Wishlist.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

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

    const wishlist = await prisma.nbaWishlist.upsert({
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

    const wishlistCards = await prisma.nbaWishlistCard.findMany({
      take: Number(process.env.NEXT_PUBLIC_RESULT_PER_PAGE),
      include: {
        card: true
      },
      where: {
        wishlistId: wishlist.id
      },
      orderBy: {
        position: 'asc'
      }
    });

    const wishlistCardsCount = await prisma.nbaWishlistCard.count({
      where: {
        wishlistId: wishlist.id
      }
    });

    const players = await prisma.nbaPlayer.findMany({
      take: 30,
      include: {
        teams: {
          select: {
            team: {
              select: {
                name: true,
                tricode: true
              }
            }
          }
        }
      },
      orderBy: {
        fullName: 'asc'
      }
    });

    const menus = await getMenus({ user });

    return {
      props: {
        menus,
        wishlist,
        wishlistCards,
        wishlistCardsCount,
        players
      }
    };
  },
  ironSessionConfig
);

export default Wishlist;
