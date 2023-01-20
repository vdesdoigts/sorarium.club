import { prisma } from '@/utils/prisma';
import { NextApiHandler } from 'next/types';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { galleryId, cursor } = req.query;

    const galleryCards = await prisma.nbaGalleryCard.findMany({
      take: Number(process.env.NEXT_PUBLIC_RESULT_PER_PAGE),
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor as string
            }
          }
        : {}),
      include: {
        card: true
      },
      where: {
        galleryId: galleryId as string
      },
      orderBy: {
        position: 'asc'
      }
    });

    const count = await prisma.nbaGalleryCard.count({
      where: {
        galleryId: galleryId as string
      }
    });

    return res.status(200).json({
      count,
      galleryCards
    });
  }
};

export default handler;
