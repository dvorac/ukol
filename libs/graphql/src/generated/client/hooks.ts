import * as Operations from 'libs/graphql/src/generated/client/operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const PersonFieldsFragmentDoc = gql`
    fragment PersonFields on Person {
  uuid
  name
}
    `;
export const FindPersonDocument = gql`
    query findPerson($uuid: ID!) {
  person(uuid: $uuid) {
    ...PersonFields
  }
}
    ${PersonFieldsFragmentDoc}`;

/**
 * __useFindPersonQuery__
 *
 * To run a query within a React component, call `useFindPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPersonQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useFindPersonQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindPersonQuery, Operations.FindPersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindPersonQuery, Operations.FindPersonQueryVariables>(FindPersonDocument, options);
      }
export function useFindPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindPersonQuery, Operations.FindPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindPersonQuery, Operations.FindPersonQueryVariables>(FindPersonDocument, options);
        }
export type FindPersonQueryHookResult = ReturnType<typeof useFindPersonQuery>;
export type FindPersonLazyQueryHookResult = ReturnType<typeof useFindPersonLazyQuery>;
export type FindPersonQueryResult = Apollo.QueryResult<Operations.FindPersonQuery, Operations.FindPersonQueryVariables>;