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
  addTask?: Maybe<Task>;
  removeTask?: Maybe<Task>;
};


export type MutationAddTaskArgs = {
  input: AddTaskInput;
};


export type MutationRemoveTaskArgs = {
  input: RemoveTaskInput;
};

export type Person = {
  __typename?: 'Person';
  name: Scalars['String'];
  uuid: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allTasks?: Maybe<Array<Maybe<Task>>>;
  findTask?: Maybe<Task>;
  person?: Maybe<Person>;
};


export type QueryFindTaskArgs = {
  uuid: Scalars['ID'];
};


export type QueryPersonArgs = {
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
