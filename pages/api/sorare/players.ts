import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { getUserNbaCards } from '@/utils/sorare';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const user = req.session.user;

      if (!user) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      const userDb = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      });

      if (!userDb) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      await getUserNbaCards(userDb);

      return res.json({ user });
    }

    return res.status(404).send(null);
  },
  ironSessionConfig
);

export default handler;
