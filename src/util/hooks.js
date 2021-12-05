import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useTeammates = name => {
  const { data, error } = useSWR(`/api/teams/${name}/members`, fetcher)

  return {
    teammates: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const useTeam = id => {
  const { data, error } = useSWR(`/api/teams/${id}`, fetcher)

  return {
    team: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const useUser = id => {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}