import { useFindPersonQuery } from '@elevatorian/graphql'

export interface HomeProps {
  //...
}

export const Home: React.FC<HomeProps> = () => {
  // fetch data
  const { data, loading, error } = useFindPersonQuery({
    variables: { id: '2' }
  });

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  if (error) {
    return (
      <p>Error! {error.message}</p>
    )
  }

  return (
    <p>Welcome {data?.person?.name}!</p>
  )
}