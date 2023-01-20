import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';

const handler: NextApiHandler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const userSession = req.session.user;

      if (!userSession) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userSession.id
        },
        select: {
          id: true,
          sorareUsername: true
        }
      });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.status(200).send(user);
    }
  },
  ironSessionConfig
);

export default handler;
