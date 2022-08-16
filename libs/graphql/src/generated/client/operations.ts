import * as Types from 'libs/graphql/src/generated/schema';

export type FindPersonQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID'];
}>;


export type FindPersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', uuid: string, name: string } | null };

export type PersonFieldsFragment = { __typename?: 'Person', uuid: string, name: string };
