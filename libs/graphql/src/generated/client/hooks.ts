import * as Operations from 'libs/graphql/src/generated/client/operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const PriorityFieldsFragmentDoc = gql`
    fragment PriorityFields on Priority {
  uuid
  description
  priority
}
    `;
export const TaskFieldsFragmentDoc = gql`
    fragment TaskFields on Task {
  uuid
  description
  priority {
    uuid
    description
    priority
  }
}
    `;
export const FindPriorityDocument = gql`
    query FindPriority($uuid: ID!) {
  priorityFind(uuid: $uuid) {
    ...PriorityFields
  }
}
    ${PriorityFieldsFragmentDoc}`;

/**
 * __useFindPriorityQuery__
 *
 * To run a query within a React component, call `useFindPriorityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPriorityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPriorityQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useFindPriorityQuery(baseOptions: Apollo.QueryHookOptions<Operations.FindPriorityQuery, Operations.FindPriorityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.FindPriorityQuery, Operations.FindPriorityQueryVariables>(FindPriorityDocument, options);
      }
export function useFindPriorityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.FindPriorityQuery, Operations.FindPriorityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.FindPriorityQuery, Operations.FindPriorityQueryVariables>(FindPriorityDocument, options);
        }
export type FindPriorityQueryHookResult = ReturnType<typeof useFindPriorityQuery>;
export type FindPriorityLazyQueryHookResult = ReturnType<typeof useFindPriorityLazyQuery>;
export type FindPriorityQueryResult = Apollo.QueryResult<Operations.FindPriorityQuery, Operations.FindPriorityQueryVariables>;
export const AllPrioritiesDocument = gql`
    query AllPriorities {
  priorityAll {
    ...PriorityFields
  }
}
    ${PriorityFieldsFragmentDoc}`;

/**
 * __useAllPrioritiesQuery__
 *
 * To run a query within a React component, call `useAllPrioritiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPrioritiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPrioritiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPrioritiesQuery(baseOptions?: Apollo.QueryHookOptions<Operations.AllPrioritiesQuery, Operations.AllPrioritiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Operations.AllPrioritiesQuery, Operations.AllPrioritiesQueryVariables>(AllPrioritiesDocument, options);
      }
export function useAllPrioritiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Operations.AllPrioritiesQuery, Operations.AllPrioritiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Operations.AllPrioritiesQuery, Operations.AllPrioritiesQueryVariables>(AllPrioritiesDocument, options);
        }
export type AllPrioritiesQueryHookResult = ReturnType<typeof useAllPrioritiesQuery>;
export type AllPrioritiesLazyQueryHookResult = ReturnType<typeof useAllPrioritiesLazyQuery>;
export type AllPrioritiesQueryResult = Apollo.QueryResult<Operations.AllPrioritiesQuery, Operations.AllPrioritiesQueryVariables>;
export const FindTaskDocument = gql`
    query FindTask($uuid: ID!) {
  taskFind(uuid: $uuid) {
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
  taskAll {
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
  taskRemove(input: $input) {
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
  taskAdd(input: $input) {
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