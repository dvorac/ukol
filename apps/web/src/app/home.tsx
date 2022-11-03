import { useAllTasksQuery } from '@ukol/graphql';
import { AddTask } from './tasks/add-task';
import { TaskList } from './tasks/list';

export interface HomeProps {
  unused?: string
}

export const Home: React.FC<HomeProps> = () => {
  const { data, loading, error, refetch } = useAllTasksQuery();

  if (loading) {
    return (<div>Loading...</div>)
  };

  if (error) {
    return (<div>{`Error: ${error}`}</div>)
  };

  const tasks = data?.taskAll || [];

  return (
    <>
      <TaskList tasks={tasks} onRemoveTask={
        () => refetch()
      }/>
      <AddTask onAddTask={
        () => refetch()
      }/>
    </>
  );
}