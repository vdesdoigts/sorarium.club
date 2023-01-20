import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
      const userSession = req.session.user;

      if (!userSession) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      const galleryCards = await prisma.nbaSorareCard.findMany({
        take: Number(process.env.NEXT_PUBLIC_RESULT_PER_PAGE),
        where: {
          users: {
            some: {
              id: userSession.id
            }
          },
          player: {
            fullName: {
              contains: req.query.search as string,
              mode: 'insensitive'
            }
          }
        },
        include: {
          player: true
        },
        orderBy: {
          slug: 'asc'
        }
      });

      if (!galleryCards) {
        return res.status(404).send('Not found');
      }

      return res.status(200).send({
        galleryCards
      });
    }

    if (req.method === 'POST') {
      const { card } = req.body;
      const { id, player, ...restCard } = card;

      const nbaSorareCard = await prisma.nbaSorareCard.upsert({
        where: {
          sorareId: card.sorareId
        },
        create: {
          player: {
            connect: {
              id: player.id
            }
          },
          ...restCard
        },
        update: restCard,
        include: {
          player: true
        }
      });

      return res.status(200).send(nbaSorareCard);
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
