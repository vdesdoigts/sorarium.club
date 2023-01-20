import { sorareCrudApi, sorareGraphqlClient } from '@/api/client';
import { CurrentUserNbaCardsQuery } from '@/gql/sdk';
import { prisma } from '@/utils/prisma';
import { User } from '@prisma/client';
import slugify from 'slugify';

export const createSorareSlugFromNbaData = (nbaPlayer: NbaApi.NbaPlayer) => {
  return slugify(
    `${nbaPlayer.firstName.toLowerCase()}-${nbaPlayer.lastName.toLowerCase()}-${nbaPlayer.dateOfBirthUTC.replace(
      /-/g,
      ''
    )}`,
    {
      strict: true
    }
  );
};

export const exchangeOauthToken = async (code: string) => {
  const params = new URLSearchParams();
  params.set('client_id', process.env.NEXT_PUBLIC_SORARE_API_UID);
  params.set('client_secret', process.env.SORARE_API_SECRET);
  params.set('code', code);
  params.set('grant_type', 'authorization_code');
  params.set('redirect_uri', process.env.NEXT_PUBLIC_SORARE_REDIRECT_URI);

  const { data } = await sorareCrudApi.post<Sorare.OauthToken>(
    '/oauth/token',
    params.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return data;
};

export const getSorareUser = async (token: string) => {
  const data = await sorareGraphqlClient.CurrentUserQuery(
    {},
    {
      Authorization: `Bearer ${token}`
    }
  );

  return data;
};

export const getUserNbaCards = async (user: User) => {
  let cursor = null;

  const playersList: CurrentUserNbaCardsQuery['currentSportsUser']['nbaCards']['nodes'] =
    [];

  do {
    const players = await sorareGraphqlClient.CurrentUserNBACards(
      {
        first: 20,
        after: cursor
      },
      {
        Authorization: `Bearer ${user.sorareToken}`
      }
    );

    playersList.push(
      ...players.currentSportsUser.nbaCards.nodes.filter(
        (node) => node.rarity !== 'common'
      )
    );

    if (players.currentSportsUser.nbaCards.pageInfo.hasNextPage) {
      cursor = players.currentSportsUser.nbaCards.pageInfo.endCursor;
    } else {
      cursor = null;
    }
  } while (cursor !== null);

  const userPlayers = await prisma.nbaSorareCard.findMany({
    where: {
      users: {
        some: {
          id: user.id
        }
      }
    }
  });

  const cardsDeleted = userPlayers.filter(
    (player) =>
      !playersList.some((sorarePlayer) => sorarePlayer.id === player.sorareId)
  );

  if (cardsDeleted.length > 0) {
    for (const card of cardsDeleted) {
      await prisma.nbaSorareCard.update({
        where: {
          id: card.id
        },
        data: {
          users: {
            disconnect: {
              id: user.id
            }
          }
        }
      });

      await prisma.nbaGalleryCard.deleteMany({
        where: {
          cardId: card.id,
          gallery: {
            userId: user.id
          }
        }
      });

      await prisma.nbaCollectionCard.deleteMany({
        where: {
          cardId: card.id,
          collection: {
            userId: user.id
          }
        }
      });
    }
  }

  for (const player of playersList) {
    const nbaPlayer = await prisma.nbaPlayer.findUnique({
      where: {
        sorareSlug: player.player.slug
      },
      include: {
        teams: {
          include: {
            team: true
          }
        }
      }
    });

    if (nbaPlayer) {
      const specialSerialNumber = nbaPlayer.teams.filter((team) => {
        return (
          team.team.name === player.team.fullName &&
          team.jerseyNumber === player.serialNumber
        );
      });

      await prisma.nbaSorareCard.upsert({
        where: {
          sorareId: player.id
        },
        update: {
          specialSerialNumber:
            specialSerialNumber.length > 0 || player.serialNumber === 1,
          users: {
            connect: {
              id: user.id
            }
          }
        },
        create: {
          imageUrl: player.fullImageUrl,
          rarity: player.rarity,
          serialNumber: player.serialNumber,
          specialSerialNumber:
            specialSerialNumber.length > 0 || player.serialNumber === 1,
          slug: player.slug,
          // @ts-ignore
          season: player.season,
          users: {
            connect: {
              id: user.id
            }
          },
          sorareId: player.id,
          player: {
            connect: {
              sorareSlug: player.player.slug
            }
          }
        }
      });
    }
  }
};

export const getSorareCard = async (user: User, slug: string) => {
  const data = await sorareGraphqlClient.NBACard(
    {
      slug
    },
    {
      Authorization: `Bearer ${user.sorareToken}`
    }
  );

  return data;
};
