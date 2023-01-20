import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { getSorareCard } from '@/utils/sorare';
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

      const { nbaCard } = await getSorareCard(userDb, req.query.slug as string);

      return res.json({ card: nbaCard });
    }

    return res.status(404).send(null);
  },
  ironSessionConfig
);

export default handler;
