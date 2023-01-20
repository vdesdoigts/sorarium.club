import { ironSessionConfig } from '@/utils/session';
import { withIronSessionSsr } from 'iron-session/next';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, GetServerSidePropsContext } from 'next/types';

const Logout = () => {
  return (
    <>
      <NextSeo title="Logout — Sorarium" noindex />
    </>
  );
};

export default Logout;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (ctx: GetServerSidePropsContext) => {
    await ctx.req.session.destroy();

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  },
  ironSessionConfig
);
