import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.sorare.com/sports/graphql',
  documents: 'src/queries/*.graphql',
  generates: {
    'src/gql/sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request'
      ]
    }
  }
};

export default config;
