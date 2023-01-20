import Collections from '@/back-components/Dashboard/Collections';
// import DashboardWatchList from '@/back-components/Dashboard/WatchList';
import DashboardWishList from '@/back-components/Dashboard/WishList';
import SidebarLayout from '@/layouts/SidebarLayout';
import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { getUserOrRedirect } from '@/utils/ssr';
import { NbaCollectionWithCards, NbaWishlistWithCards } from '@/utils/types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { User } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';

interface DashboardProps {
  collections: NbaCollectionWithCards[];
  wishlist: NbaWishlistWithCards;
}

function Dashboard({ collections, wishlist }: DashboardProps) {
  return (
    <>
      <NextSeo title="Dashboard — Sorarium" noindex />
      <Box height="100%" p="20px">
        <Grid container spacing={2}>
          <Grid xs={12} lg={8} xl={7}>
            <Collections collections={collections} />
          </Grid>
          <Grid container xs={12} lg={4} xl={5} spacing={2}>
            {/* <Grid xs={12} md={6} lg={12} xl={6}>
              <DashboardWatchList />
            </Grid> */}
            <Grid xs={12} md={6} lg={12} xl={6}>
              <DashboardWishList wishlist={wishlist} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

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
          }
        }
      },
      orderBy: {
        position: 'asc'
      }
    });

    const wishlist = await prisma.nbaWishlist.findUnique({
      where: {
        userId: user.id
      },
      include: {
        cards: {
          take: 3,
          include: {
            card: {
              include: {
                player: true
              }
            }
          },
          orderBy: {
            position: 'asc'
          }
        }
      }
    });

    return {
      props: {
        menus: {
          collections
        },
        collections,
        wishlist
      }
    };
  },
  ironSessionConfig
);

export default Dashboard;
