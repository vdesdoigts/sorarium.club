import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next/types';

const handler = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const collection = await prisma.nbaCollection.findUnique({
      where: {
        id: req.query.id as string
      }
    });

    if (!collection) {
      return res.status(404).send('Not found');
    }

    if (req.method === 'GET') {
      return res.status(200).send(collection);
    }

    if (req.method === 'PUT' || req.method === 'DELETE') {
      const user = req.session.user;

      if (!user || user.id !== collection.userId) {
        return res.status(401).send({ error: 'unauthorized' });
      }

      if (req.method === 'PUT') {
        if (req.body.cards) {
          await prisma.nbaCollectionCard.deleteMany({
            where: {
              collectionId: req.query.id as string,
              collection: {
                userId: user.id
              }
            }
          });

          const collectionCards = await prisma.nbaCollectionCard.createMany({
            data: req.body.cards
          });

          if (!collectionCards) {
            return res.status(404).send('Not found');
          }

          return res.status(200).send(collectionCards);
        }

        if (req.body.collection?.title && req.body.collection?.description) {
          const updatedCollection = await prisma.nbaCollection.update({
            where: {
              id: req.query.id as string
            },
            data: {
              title: req.body.collection.title,
              description: req.body.collection.description
            }
          });

          if (!updatedCollection) {
            return res.status(404).send('Not found');
          }

          return res.status(200).send(updatedCollection);
        }

        return res.status(200).send({});
      }

      if (req.method === 'DELETE') {
        await prisma.nbaCollection.delete({
          where: {
            id: req.query.id as string
          }
        });

        return res.status(200).send(collection);

        // Not working with two args
        // const collection = await prisma.nbaCollection.delete({
        //   where: {
        //     id: req.query.id as string,
        //     userId: user.id
        //   }
        // });
        // return res.status(200).send(collection);
      }
    }

    return res.status(404).send('Not found');
  },
  ironSessionConfig
);

export default handler;
