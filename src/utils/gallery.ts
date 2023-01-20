import { prisma } from '@/utils/prisma';
import { User } from '@prisma/client';

export const createGalleryWithCards = async (user: User, cards: string[]) => {
  const gallery = await prisma.nbaGallery.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      }
    }
  });

  for (const [idx, value] of cards.entries()) {
    try {
      await prisma.nbaGalleryCard.create({
        data: {
          card: {
            connect: {
              id: value
            }
          },
          gallery: {
            connect: {
              id: gallery.id
            }
          },
          position: idx
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return prisma.nbaGallery.findUnique({
    where: {
      id: gallery.id
    },
    include: {
      cards: {
        select: {
          card: true,
          position: true
        }
      }
    }
  });
};

export const getPublicGalleryCards = async ({
  galleryId,
  teamId,
  userId,
  specialSerialNumber,
  resultPerPage = Number(process.env.NEXT_PUBLIC_RESULT_PER_PAGE),
  galleryCardCursor,
  sorareCardCursor,
  withGalleryCard
}: {
  galleryId: string;
  teamId?: string;
  userId: string;
  specialSerialNumber?: boolean;
  resultPerPage?: number;
  galleryCardCursor?: string;
  sorareCardCursor?: string;
  withGalleryCard?: boolean;
}) => {
  const galleryCards = withGalleryCard
    ? await prisma.nbaGalleryCard.findMany({
        take: resultPerPage,
        ...(galleryCardCursor
          ? {
              skip: 1,
              cursor: {
                id: galleryCardCursor
              }
            }
          : {}),
        include: {
          card: true
        },
        where: {
          galleryId: galleryId
        },
        orderBy: {
          position: 'asc'
        }
      })
    : [];

  let sorareCards;
  if (galleryCards.length < resultPerPage) {
    const whereFilter = {
      users: {
        some: {
          id: userId
        }
      },
      NOT: {
        id: {
          in: galleryCards.map(({ card }) => card.id)
        }
      },
      ...(teamId || specialSerialNumber
        ? {
            OR: [
              {
                ...(teamId
                  ? {
                      player: {
                        teams: {
                          some: {
                            teamId: teamId as string
                          }
                        }
                      }
                    }
                  : {}),
                ...(specialSerialNumber
                  ? {
                      specialSerialNumber: {
                        not: false
                      }
                    }
                  : {})
              }
            ]
          }
        : {})
    };

    sorareCards = await prisma.nbaSorareCard.findMany({
      take: resultPerPage - galleryCards.length,
      ...(sorareCardCursor
        ? {
            skip: 1,
            cursor: {
              id: sorareCardCursor
            }
          }
        : {}),
      where: whereFilter,
      orderBy: {
        slug: 'asc'
      }
    });
  }

  return {
    galleryCards,
    hasNextGalleryCards: galleryCards.length === resultPerPage,
    sorareCards,
    hasNextSorareCardPage:
      sorareCards?.length + galleryCards.length === resultPerPage
  };
};
