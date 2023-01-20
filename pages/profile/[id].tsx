import Collections from '@/front-components/Collections';
import Gallery from '@/front-components/Gallery';
import GalleryCall from '@/front-components/GalleryCall';
import ProfileCall from '@/front-components/ProfileCall';
import Title from '@/front-components/Title';
import SiteLayout from '@/layouts/SiteLayout';
import { getPublicGalleryCards } from '@/utils/gallery';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import type {
  NbaCollectionWithCards,
  NbaSorareCardWithPlayer
} from '@/utils/types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { User } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';

interface ProfileProps {
  cards: NbaSorareCardWithPlayer[];
  collections: NbaCollectionWithCards[];
  galleryId: string;
  user: User;
  userCards: { _count: { _all: number }; rarity: string }[];
}

function ProfilePage({
  cards,
  collections,
  galleryId,
  user,
  userCards
}: ProfileProps) {
  return (
    <>
      <NextSeo
        title={`${user.sorareUsername} showcase – Sorarium`}
        description={`Explore ${user.sorareUsername} NBA Sorare showcase on Sorarium.`}
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
        <Box pt={9} px={{ xs: 2, sm: 4 }}>
          <ProfileCall userUsername={user.sorareUsername} />
        </Box>
        {collections.length > 0 && (
          <Box pt={8}>
            <Collections collections={collections} />
          </Box>
        )}
        <Box pt={8} px={{ xs: 2, sm: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Title title="Gallery" />
          </Box>
          <Box pt={1}>
            <Grid container columnSpacing={3}>
              <Grid xs={12} md={true}>
                <Box pt={2}>
                  <Gallery cards={cards} />
                </Box>
              </Grid>
              <Grid xs={12} width={{ md: '400px' }}>
                <GalleryCall
                  galleryId={galleryId}
                  userCards={userCards}
                  userUsername={user.sorareUsername}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

ProfilePage.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ params }) {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id
      },
      include: {
        nbaGallery: {
          select: {
            id: true
          }
        }
      }
    });

    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    const collections = await prisma.nbaCollection.findMany({
      where: {
        userId: user.id
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
    });

    const gallery = await prisma.nbaGallery.findUnique({
      where: {
        userId: params.id
      }
    });

    const { galleryCards, sorareCards } = await getPublicGalleryCards({
      galleryId: gallery.id,
      userId: gallery.userId,
      withGalleryCard: true,
      resultPerPage: 16
    });

    const userCards = await prisma.nbaSorareCard.groupBy({
      by: ['rarity'],
      _count: {
        _all: true
      },
      where: {
        users: {
          some: {
            id: user.id
          }
        }
      }
    });

    return {
      props: {
        user,
        collections,
        galleryId: gallery.id,
        cards: sorareCards
          ? [...galleryCards.map(({ card }) => card), ...sorareCards]
          : galleryCards.map(({ card }) => card),
        userCards
      }
    };
  },
  ironSessionConfig
);

export default ProfilePage;
