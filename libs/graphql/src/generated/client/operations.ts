import * as Types from 'libs/graphql/src/generated/schema';

export type FindPersonQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type FindPersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', id: string, name: string } | null };

export type PersonFieldsFragment = { __typename?: 'Person', id: string, name: string };
