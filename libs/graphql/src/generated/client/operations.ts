import * as Types from 'libs/graphql/src/generated/schema';

export type FindTaskQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID'];
}>;


export type FindTaskQuery = { __typename?: 'Query', taskFind?: { __typename?: 'Task', uuid: string, description?: string | null } | null };

export type AllTasksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllTasksQuery = { __typename?: 'Query', taskAll?: Array<{ __typename?: 'Task', uuid: string, description?: string | null }> | null };

export type RemoveTaskMutationVariables = Types.Exact<{
  input: Types.RemoveTaskInput;
}>;


export type RemoveTaskMutation = { __typename?: 'Mutation', taskRemove?: { __typename?: 'Task', uuid: string, description?: string | null } | null };

export type AddTaskMutationVariables = Types.Exact<{
  input: Types.AddTaskInput;
}>;


export type AddTaskMutation = { __typename?: 'Mutation', taskAdd?: { __typename?: 'Task', uuid: string, description?: string | null } | null };

export type TaskFieldsFragment = { __typename?: 'Task', uuid: string, description?: string | null };
