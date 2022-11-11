import { Priority, Task, useAddTaskMutation } from '@ukol/graphql';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { PrioritySelect } from './select-priority';

export interface AddTaskProps {
  priorities: Priority[];
  onAddTask?: (task: Task) => void;
}

const Spinner = styled.progress`
  :indeterminate {
    width: 20px
  }
`

export const AddTask: React.FC<AddTaskProps> = (props) => {
  const { priorities, onAddTask } = props;
  const { handleSubmit, register } = useForm();
  const [ priority, setPriority ] = useState<string>(priorities[0]?.uuid);

  const [ save, { loading } ] = useAddTaskMutation();

  const onSubmit = async (form: any) => {
    const task = await save({
      variables: {
        input: {
          description: form["desc"],
          priorityId: priority,
        }
      }
    });
    if (onAddTask && task.data?.taskAdd) onAddTask(task.data?.taskAdd);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='desc'>Task Description</label>
        <br/>
        <input
          id='desc'
          type='text'
          placeholder='description'
          {...register('desc', {
            required: 'a description is required'
          })}
        />
        <PrioritySelect
            priorities={priorities}
            initialSelected={priority}
            onChange={uuid => setPriority(uuid)}
          />
        <button type='submit'>Save</button>
        {loading && <Spinner style={{ margin: '0 0 0 8px' }} />}
      </form>
    </div>
  );
}