import CollectionCall from '@/front-components/CollectionCall';
import Gallery from '@/front-components/Gallery';
import Title from '@/front-components/Title';
import SiteLayout from '@/layouts/SiteLayout';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import type {
  NbaCollectionWithCards,
  NbaSorareCardWithPlayer
} from '@/utils/types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { NbaCollection, User } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';

interface CollectionProps {
  cards: NbaSorareCardWithPlayer[];
  collection: NbaCollection;
  collections: NbaCollectionWithCards[];
  user: User;
}

function CollectionPage({
  cards,
  collection,
  collections,
  user
}: CollectionProps) {
  return (
    <>
      <Head>
        <title>
          {collection.title} by {user.sorareUsername} – Sorarium
        </title>
      </Head>
      <NextSeo
        title={`${collection.title} by ${user.sorareUsername} – Sorarium`}
        description={`Explore NBA Sorare ${collection.title}  by ${user.sorareUsername} on Sorarium.`}
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
        <Box
          pt={7}
          px={{ xs: 2, sm: 4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <Box position="relative" zIndex={2} pb={1}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link passHref href={`/profile/${user.id}`}>
                <MuiLink component="a" underline="hover" color="inherit">
                  {user.sorareUsername}
                </MuiLink>
              </Link>
              <Typography color="text.primary">Collections</Typography>
            </Breadcrumbs>
          </Box>
          <Box position="relative" zIndex={1}>
            <Title title={collection.title} />
          </Box>
        </Box>
        <Box px={{ xs: 2, sm: 4 }} pt={3}>
          <Grid container columnSpacing={3}>
            <Grid xs={12} md={true}>
              <Gallery cards={cards} />
            </Grid>
            <Grid xs={12} width={{ md: '400px' }} mt={{ xs: 4, md: 0 }}>
              <CollectionCall
                description={collection.description}
                title={collection.title}
                userUsername={user.sorareUsername}
              />
              <Stack direction="column" spacing={1} pt={2}>
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    passHref
                    href={`/collections/${collection.id}`}
                  >
                    <Box
                      component="a"
                      overflow="hidden"
                      position="relative"
                      px={2}
                      bgcolor="#fff"
                      borderRadius="8px"
                      boxShadow="0 1px 3px rgb(25 25 25 / 10%)"
                      sx={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'all .2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 1px 3px rgb(25 25 25 / 20%)'
                        }
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        py={2}
                      >
                        <Box>
                          <AvatarGroup
                            // @ts-ignore
                            total={collection._count.cards}
                            variant="rounded"
                            sx={{
                              '& .MuiAvatar-root': {
                                width: '44px',
                                height: '71px'
                              }
                            }}
                          >
                            {collection.cards.map((card) => (
                              <Avatar key={card.id} src={card.card.imageUrl} />
                            ))}
                          </AvatarGroup>
                        </Box>
                        <Box width="100%" sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="subtitle1"
                            className="title"
                            sx={{
                              transition: 'color .2s ease-in-out'
                            }}
                          >
                            {collection.title}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {collection.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

CollectionPage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ params }) {
    const collection = await prisma.nbaCollection.findUnique({
      where: {
        id: params.id
      }
    });

    const user = await prisma.user.findUnique({
      where: {
        id: collection.userId
      },
      select: {
        id: true,
        sorareId: true,
        sorareUsername: true
      }
    });

    const collections = await prisma.nbaCollection.findMany({
      where: {
        userId: collection.userId
      },
      include: {
        _count: {
          select: {
            cards: true
          }
        },
        cards: {
          take: 1,
          include: {
            card: true
          }
        }
      },
      orderBy: {
        position: 'asc'
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

    return {
      props: {
        user,
        collection,
        collections,
        cards: collectionCards.map(({ card }) => card)
      }
    };
  },
  ironSessionConfig
);

export default CollectionPage;
