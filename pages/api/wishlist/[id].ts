import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const wishlist = await prisma.nbaWishlist.findUnique({
        where: {
          id: req.query.id as string
        }
      });

      if (!wishlist) {
        return res.status(404).send('Not found');
      }

      return res.status(200).send(wishlist);
    }

    if (req.method === 'PUT') {
      const user = req.session.user;

      if (!user) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      const { body } = req;

      await prisma.nbaWishlistCard.deleteMany({
        where: {
          wishlistId: req.query.id as string,
          wishlist: {
            userId: user.id
          }
        }
      });
      const wishlistCards = await prisma.nbaWishlistCard.createMany({
        data: body.cards
      });

      if (!wishlistCards) {
        return res.status(404).send('Not found');
      }

      const count = await prisma.nbaWishlistCard.count({
        where: {
          wishlistId: req.query.id as string,
          wishlist: {
            userId: user.id
          }
        }
      });

      return res.status(200).send({
        count,
        wishlistCards
      });
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
