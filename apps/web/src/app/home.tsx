import { useFindPersonQuery } from '@ukol/graphql'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { environment } from '../environments/environment';

export interface HomeProps {
  //...
}

export const Home: React.FC<HomeProps> = () => {
  const [ id, setId ] = useState('');

  // fetch data
  const { data, loading, error } = useFindPersonQuery({
    variables: { uuid: id }
  });

  const { data: apiData, error: apiError, isLoading: apiLoading } = useQuery(['api'], () =>
    fetch(environment.api).then(res => res.json())
  );

  return (
    <>
      <form>
        <input type='text' value={id} onChange={(e) => setId(e.target.value)}/>
      </form>
      <div>
        <p>GQL</p>
        <p>data: {JSON.stringify(data?.person)}</p>
        <p>loading: {loading}</p>
        <p>error: {JSON.stringify(error)}</p>
      </div>
      <div>
        <p>API</p>
        <p>data: {JSON.stringify(apiData)}</p>
        <p>loading: {apiLoading}</p>
        <p>error: {JSON.stringify(apiError)}</p>
      </div>
    </>
  )
}