import { Task, UpdateTaskInput, useAllPrioritiesQuery, useAllTasksQuery, useUpdateTaskMutation } from '@ukol/graphql';
import { AddTask } from '../tasks/add-task';
import { TaskList } from '../tasks/list';

export interface HomeProps {
  unused?: string
}

export const Home: React.FC<HomeProps> = () => {
  const { data: tasks, loading: tl, error: te, refetch } = useAllTasksQuery();
  const { data: priorities, loading: pl, error: pe } = useAllPrioritiesQuery();
  const [ update ] = useUpdateTaskMutation();

  const onUpdateTask = async (updates: UpdateTaskInput) => {
    console.log(`update`);
    const task = await update({
      variables: {
        input: updates
      }
    });
    await refetch();
  }

  if (tl || pl) {
    return (<div>Loading...</div>)
  };

  if (te || pe) {
    return (
      <>
        <div>{`tasks error: ${te}`}</div>
        <div>{`priority error: ${pe}`}</div>
      </>
    )
  };

  return (
    <>
      <TaskList
        tasks={tasks?.taskAll || []}
        priorities={priorities?.priorityAll || []}
        onRemoveTask={() => refetch()}
        onUpdateTask={onUpdateTask}
      />
      <AddTask
        priorities={priorities?.priorityAll || []}
        onAddTask={() => refetch()}
      />
    </>
  );
}