export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddTaskInput = {
  description: Scalars['String'];
  priorityUuid?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  taskAdd?: Maybe<Task>;
  taskRemove?: Maybe<Task>;
  taskUpdate?: Maybe<Task>;
  unused?: Maybe<Scalars['String']>;
};


export type MutationTaskAddArgs = {
  input: AddTaskInput;
};


export type MutationTaskRemoveArgs = {
  input: RemoveTaskInput;
};


export type MutationTaskUpdateArgs = {
  input: UpdateTaskInput;
};

export type Priority = {
  __typename?: 'Priority';
  description: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  uuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  priorityAll: Array<Priority>;
  priorityFind?: Maybe<Priority>;
  taskAll: Array<Task>;
  taskFind?: Maybe<Task>;
  unused?: Maybe<Scalars['String']>;
};


export type QueryPriorityFindArgs = {
  uuid: Scalars['ID'];
};


export type QueryTaskFindArgs = {
  uuid: Scalars['ID'];
};

export type RemoveTaskInput = {
  uuid: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  description: Scalars['String'];
  priority?: Maybe<Priority>;
  uuid: Scalars['ID'];
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']>;
  priorityUuid?: InputMaybe<Scalars['ID']>;
  uuid: Scalars['String'];
};
