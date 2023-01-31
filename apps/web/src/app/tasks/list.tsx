import { Priority, Task, UpdateTaskInput, useRemoveTaskMutation } from "@ukol/graphql";
import styled from "styled-components";
import { byPriority, comparePriority } from "../priority/sort";
import { PrioritySelect } from "./select-priority";

export interface TaskListProps {
  tasks: Task[];
  priorities: Priority[];
  onRemoveTask?: (task: Task) => void;
  onUpdateTask?: (updates: UpdateTaskInput) => void;
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
  const { tasks, priorities, onRemoveTask, onUpdateTask } = props;

  const ordered = tasks.slice().sort(
    (a,b) => comparePriority(a.priority, b.priority)
  );

  const [remove] = useRemoveTaskMutation();

  const onClickRemove = async (task: Task) => {
    const deleted = await remove({
      variables: {
        input: {
          uuid: task.uuid
        }
      }
    });
    if (onRemoveTask && deleted.data?.taskRemove) {
      onRemoveTask(deleted.data.taskRemove);
    }
  }

  const onChangePriority = (t: Task) => (priorityUuid: string) => {
    console.log(`onchangeprior`, t, priorityUuid);
    if (onUpdateTask) onUpdateTask({
      uuid: t.uuid,
      priorityUuid: priorityUuid
    });
  }

  return (
    <ol>
      {ordered.map(t => (
        <Item key={t.uuid}>
          <span className="description">{t.description}</span>
          <PrioritySelect
            priorities={priorities}
            initialSelected={t.priority?.uuid}
            onChange={onChangePriority(t)}
          />
          <button className='remove' onClick={() => onClickRemove(t)}>Remove</button>
        </Item>
      ))}
    </ol>
  );
}