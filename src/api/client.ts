import { getSdk } from '@/gql/sdk';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

export const nbaDataApi = axios.create({
  baseURL: 'https://data.nba.net/10s/prod'
});
export const sorareCrudApi = axios.create({
  baseURL: 'https://api.sorare.com'
});

const sorareGraphql = new GraphQLClient(
  'https://api.sorare.com/sports/graphql'
);

export const sorareGraphqlClient = getSdk(sorareGraphql, (action) => {
  return action({
    APIKEY: process.env.NEXT_PUBLIC_SORARE_API_UID
  });
});
