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
export const TaskFieldsFragmentDoc = gql`
    fragment TaskFields on Task {
  uuid
  description
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
export const FindTaskDocument = gql`
    query FindTask($uuid: ID!) {
  findTask(uuid: $uuid) {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;

/**
 * __useFindTaskQuery__
 *
 * To run a query within a React component, call `useFindTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useFindTaskQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindTaskQuery, Operations.FindTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindTaskQuery, Operations.FindTaskQueryVariables>(FindTaskDocument, options);
      }
export function useFindTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindTaskQuery, Operations.FindTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindTaskQuery, Operations.FindTaskQueryVariables>(FindTaskDocument, options);
        }
export type FindTaskQueryHookResult = ReturnType<typeof useFindTaskQuery>;
export type FindTaskLazyQueryHookResult = ReturnType<typeof useFindTaskLazyQuery>;
export type FindTaskQueryResult = Apollo.QueryResult<Operations.FindTaskQuery, Operations.FindTaskQueryVariables>;
export const AllTasksDocument = gql`
    query AllTasks {
  allTasks {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;

/**
 * __useAllTasksQuery__
 *
 * To run a query within a React component, call `useAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<Operations.AllTasksQuery, Operations.AllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.AllTasksQuery, Operations.AllTasksQueryVariables>(AllTasksDocument, options);
      }
export function useAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.AllTasksQuery, Operations.AllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.AllTasksQuery, Operations.AllTasksQueryVariables>(AllTasksDocument, options);
        }
export type AllTasksQueryHookResult = ReturnType<typeof useAllTasksQuery>;
export type AllTasksLazyQueryHookResult = ReturnType<typeof useAllTasksLazyQuery>;
export type AllTasksQueryResult = Apollo.QueryResult<Operations.AllTasksQuery, Operations.AllTasksQueryVariables>;
export const RemoveTaskDocument = gql`
    mutation RemoveTask($input: RemoveTaskInput!) {
  removeTask(input: $input) {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;
export type RemoveTaskMutationFn = Apollo.MutationFunction<Operations.RemoveTaskMutation, Operations.RemoveTaskMutationVariables>;

/**
 * __useRemoveTaskMutation__
 *
 * To run a mutation, you first call `useRemoveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTaskMutation, { data, loading, error }] = useRemoveTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveTaskMutation(baseOptions?: Apollo.MutationHookOptions<Operations.RemoveTaskMutation, Operations.RemoveTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.RemoveTaskMutation, Operations.RemoveTaskMutationVariables>(RemoveTaskDocument, options);
      }
export type RemoveTaskMutationHookResult = ReturnType<typeof useRemoveTaskMutation>;
export type RemoveTaskMutationResult = Apollo.MutationResult<Operations.RemoveTaskMutation>;
export type RemoveTaskMutationOptions = Apollo.BaseMutationOptions<Operations.RemoveTaskMutation, Operations.RemoveTaskMutationVariables>;
export const AddTaskDocument = gql`
    mutation AddTask($input: AddTaskInput!) {
  addTask(input: $input) {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;
export type AddTaskMutationFn = Apollo.MutationFunction<Operations.AddTaskMutation, Operations.AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<Operations.AddTaskMutation, Operations.AddTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Operations.AddTaskMutation, Operations.AddTaskMutationVariables>(AddTaskDocument, options);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<Operations.AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<Operations.AddTaskMutation, Operations.AddTaskMutationVariables>;