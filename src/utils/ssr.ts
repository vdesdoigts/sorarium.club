import { prisma } from '@/utils/prisma';
import { User } from '@prisma/client';
import type {
  NextApiRequest,
  NextApiResponse
} from 'next/dist/shared/lib/utils';

export async function getUserOrRedirect({
  req
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const userSession = req.session.user;

  if (!userSession) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userSession.id
    },
    select: {
      id: true,
      sorareId: true,
      sorareRefreshToken: true,
      sorareUsername: true,
      sorareToken: true,
      nbaGallery: {
        select: {
          id: true
        }
      }
    }
  });

  return user;
}

export async function getMenus({ user }: { user: User }) {
  const collections = await prisma.nbaCollection.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      position: 'asc'
    }
  });

  return {
    collections
  };
}
