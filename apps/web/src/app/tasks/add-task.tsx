import { Task, useAddTaskMutation } from '@ukol/graphql';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

export interface AddTaskProps {
  onAddTask?: (task: Task) => void
}

const Spinner = styled.progress`
  :indeterminate {
    width: 20px
  }
`

export const AddTask: React.FC<AddTaskProps> = (props) => {
  const { onAddTask } = props;
  const { handleSubmit, register } = useForm();

  const [save, { loading }] = useAddTaskMutation();

  const onSubmit = async (form: any) => {
    console.log(`data`, JSON.stringify(form));
    const task = await save({ variables: { input: { description: form["desc"] }}});
    console.log(`task added`, task);
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
        <button type='submit'>Save</button>
        {loading && <Spinner style={{ margin: '0 0 0 8px' }} />}
      </form>
    </div>
  );
}