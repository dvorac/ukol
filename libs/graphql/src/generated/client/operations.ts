import * as Types from 'libs/graphql/src/generated/schema';

export type FindPersonQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID'];
}>;


export type FindPersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', uuid: string, name: string } | null };

export type PersonFieldsFragment = { __typename?: 'Person', uuid: string, name: string };

export type FindTaskQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID'];
}>;


export type FindTaskQuery = { __typename?: 'Query', findTask?: { __typename?: 'Task', uuid: string, description?: string | null } | null };

export type AllTasksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllTasksQuery = { __typename?: 'Query', allTasks?: Array<{ __typename?: 'Task', uuid: string, description?: string | null } | null> | null };

export type RemoveTaskMutationVariables = Types.Exact<{
  input: Types.RemoveTaskInput;
}>;


export type RemoveTaskMutation = { __typename?: 'Mutation', removeTask?: { __typename?: 'Task', uuid: string, description?: string | null } | null };

export type AddTaskMutationVariables = Types.Exact<{
  input: Types.AddTaskInput;
}>;


export type AddTaskMutation = { __typename?: 'Mutation', addTask?: { __typename?: 'Task', uuid: string, description?: string | null } | null };

export type TaskFieldsFragment = { __typename?: 'Task', uuid: string, description?: string | null };
