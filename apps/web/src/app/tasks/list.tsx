import { Task, useRemoveTaskMutation } from "@ukol/graphql";
import styled from "styled-components";

export interface TaskListProps {
  tasks: Task[],
  onRemoveTask?: (task: Task) => void
}

const Item = styled.li`
  .description {
    min-width: 4rem
  }

  .remove {
    margin-left: 8px
  }
`

export const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks, onRemoveTask } = props;

  const [remove] = useRemoveTaskMutation();

  const onClickRemove = async (task: Task) => {
    const deleted = await remove({ variables: { input: { uuid: task.uuid }}});
    if (onRemoveTask && deleted.data?.taskRemove) onRemoveTask(deleted.data.taskRemove);
  }

  return (
    <ol>
      {tasks.map(t => (
        <Item>
          <span className="description">{t.description}</span>
          <button className='remove' onClick={() => onClickRemove(t)}>Remove</button>
        </Item>
      ))}
    </ol>
  );
}