import { getPublicGalleryCards } from '@/utils/gallery';
import { prisma } from '@/utils/prisma';
import { NextApiHandler } from 'next/types';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const {
      galleryId,
      teamId,
      onlySerialNumber,
      galleryCardCursor,
      sorareCardCursor,
      withGalleryCard
    } = req.query;

    const gallery = await prisma.nbaGallery.findUnique({
      where: {
        id: galleryId as string
      },
      include: {
        user: true
      }
    });

    if (!gallery) {
      return res.status(404).send('Not found');
    }

    const {
      galleryCards,
      hasNextGalleryCards,
      sorareCards,
      hasNextSorareCardPage
    } = await getPublicGalleryCards({
      galleryId: gallery.id,
      userId: gallery.userId,
      specialSerialNumber: onlySerialNumber === 'true',
      teamId: teamId as string,
      galleryCardCursor: galleryCardCursor as string,
      sorareCardCursor: sorareCardCursor as string,
      withGalleryCard: withGalleryCard === 'true'
    });

    return res.status(200).json({
      galleryCards,
      hasNextGalleryCards,
      sorareCards,
      hasNextSorareCardPage
    });
  }
};

export default handler;
