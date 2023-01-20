import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const userSession = req.session.user;

    if (!userSession) {
      return res.status(401).send({ error: 'unauthorized' });
    }

    if (req.method === 'GET') {
      const collections = await prisma.nbaCollection.findMany({
        where: {
          userId: userSession.id as string
        }
      });

      return res.status(200).send(collections);
    }

    if (req.method === 'POST') {
      const userSession = req.session.user;

      if (!userSession) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      const { collection } = req.body;

      const count = await prisma.nbaCollection.count({
        where: {
          userId: userSession.id
        }
      });

      const createdCollection = await prisma.nbaCollection.create({
        data: {
          userId: userSession.id,
          position: count + 1,
          ...collection
        }
      });

      return res.status(200).send(createdCollection);
    }

    if (req.method === 'PUT') {
      const { collections } = req.body;

      for (const collection of collections) {
        await prisma.nbaCollection.update({
          where: {
            id: collection.id
          },
          data: {
            position: collection.position
          }
        });
      }

      return res.status(200);
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
