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
  description?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  taskAdd?: Maybe<Task>;
  taskRemove?: Maybe<Task>;
  unused?: Maybe<Scalars['String']>;
};


export type MutationTaskAddArgs = {
  input: AddTaskInput;
};


export type MutationTaskRemoveArgs = {
  input: RemoveTaskInput;
};

export type Query = {
  __typename?: 'Query';
  taskAll?: Maybe<Array<Task>>;
  taskFind?: Maybe<Task>;
  unused?: Maybe<Scalars['String']>;
};


export type QueryTaskFindArgs = {
  uuid: Scalars['ID'];
};

export type RemoveTaskInput = {
  uuid: Scalars['ID'];
};

export type Task = {
  __typename?: 'Task';
  description?: Maybe<Scalars['String']>;
  uuid: Scalars['ID'];
};
