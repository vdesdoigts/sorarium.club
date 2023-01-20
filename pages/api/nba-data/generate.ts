import { nbaDataApi } from '@/api/client';
import { prisma } from '@/utils/prisma';
import { createSorareSlugFromNbaData } from '@/utils/sorare';
import { NextApiHandler } from 'next/types';

const CURRENT_YEAR = 2022;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { data: teams } = await nbaDataApi.get<NbaApi.NbaTeamsResult>(
      `/v2/${CURRENT_YEAR}/teams.json`
    );

    const nbaTeams = teams.league.standard.filter(
      (team) => team.isNBAFranchise
    );

    for (const team of nbaTeams) {
      await prisma.nbaTeam.upsert({
        where: {
          nbaId: team.teamId
        },
        update: {
          name: team.fullName,
          tricode: team.tricode
        },
        create: {
          name: team.fullName,
          tricode: team.tricode,
          nbaId: team.teamId
        }
      });
    }

    const { data: players } = await nbaDataApi.get<NbaApi.NbaPlayersResult>(
      `/v1/${CURRENT_YEAR}/players.json`
    );

    const nbaPlayers = players.league.standard.filter(
      (player) => player.isActive
    );

    for (const player of nbaPlayers) {
      await prisma.nbaPlayer.upsert({
        where: {
          nbaId: player.personId
        },
        update: {
          // team: {
          //   connect: {
          //     nbaId: player.teamId
          //   }
          // },
          sorareSlug: createSorareSlugFromNbaData(player),
          fullName: `${player.firstName} ${player.lastName}`
        },
        create: {
          nbaId: player.personId,
          // team: {
          //   connect: {
          //     nbaId: player.teamId
          //   }
          // },
          sorareSlug: createSorareSlugFromNbaData(player),
          fullName: `${player.firstName} ${player.lastName}`
        }
      });
    }

    return res.status(200).json({ message: 'success' });
  }

  return res.status(404).send(null);
};

export default handler;
