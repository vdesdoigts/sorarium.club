import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const gallery = await prisma.nbaGallery.findUnique({
        where: {
          id: req.query.id as string
        }
      });

      if (!gallery) {
        return res.status(404).send('Not found');
      }

      return res.status(200).send(gallery);
    }

    if (req.method === 'PUT') {
      const user = req.session.user;

      if (!user) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      const { body } = req;

      await prisma.nbaGalleryCard.deleteMany({
        where: {
          galleryId: req.query.id as string,
          gallery: {
            userId: user.id
          }
        }
      });
      const gallery = await prisma.nbaGalleryCard.createMany({
        data: body.cards
      });

      if (!gallery) {
        return res.status(404).send('Not found');
      }

      return res.status(200).send(gallery);
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
