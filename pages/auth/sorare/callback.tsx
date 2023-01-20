import { prisma } from '@/utils/prisma';
import { ironSessionConfig } from '@/utils/session';
import {
  exchangeOauthToken,
  getSorareUser,
  getUserNbaCards
} from '@/utils/sorare';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';

const SorareCallback = () => {
  return null;
};

export default SorareCallback;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx: GetServerSidePropsContext) => {
    if (!ctx.query.code) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    try {
      const data = await exchangeOauthToken(ctx.query.code as string);

      const userData = await getSorareUser(data.access_token);

      const user = await prisma.user.upsert({
        where: {
          sorareId: userData.currentSportsUser.id
        },
        update: {
          sorareUsername: userData.currentSportsUser.nickname,
          sorareToken: data.access_token,
          sorareRefreshToken: data.refresh_token
        },
        create: {
          sorareId: userData.currentSportsUser.id,
          sorareUsername: userData.currentSportsUser.nickname,
          sorareToken: data.access_token,
          sorareRefreshToken: data.refresh_token
        }
      });
      ctx.req.session.user = {
        id: user.id
      };
      await ctx.req.session.save();

      getUserNbaCards(user);

      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      };
    } catch (e) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
  },
  ironSessionConfig
);
