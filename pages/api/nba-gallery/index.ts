import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiResponse, NextApiRequest } from 'next/types';
import { prisma } from '@/utils/prisma';
import { createGalleryWithCards } from '@/utils/gallery';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const user = req.session.user;

      if (!user) {
        return res.status(401).send('Unauthorized');
      }

      const userDb = await prisma.user.findUnique({ where: { id: user.id } });

      if (!userDb) {
        return res.status(401).send('Unauthorized');
      }

      const { cards } = JSON.parse(req.body);

      if (!cards) {
        return res.status(422).send('Missing cards');
      }

      return createGalleryWithCards(userDb, req.body.cards);
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
