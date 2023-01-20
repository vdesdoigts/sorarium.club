import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const user = req.session.user;
      const { cursor } = req.query;

      if (!user) {
        return res.status(401).send('Unauthorized');
      }

      const wishlist = await prisma.nbaWishlist.findUnique({
        where: {
          userId: user.id
        }
      });

      const wishlistCards = await prisma.nbaWishlistCard.findMany({
        take: 1,
        ...(cursor
          ? {
              skip: 1,
              cursor: {
                id: cursor as string
              }
            }
          : {}),
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

      return res.status(200).send({
        wishlistCards,
        wishlistCardsCount
      });
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
