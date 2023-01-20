import { prisma } from '@/utils/prisma';
import { NextApiHandler } from 'next/types';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { search } = req.query;

    if (search) {
      // if (search.length <= 3) {
      //   return res.status(422).json({
      //     message: 'Search query must be at least 4 characters long'
      //   });
      // }

      const players = await prisma.nbaPlayer.findMany({
        take: 30,
        where: {
          fullName: {
            mode: 'insensitive',
            contains: search as string
          }
        },
        include: {
          teams: {
            include: {
              team: true
            }
          }
        }
      });

      return res.status(200).json(players);
    }
  }
};

export default handler;
