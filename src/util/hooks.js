import useSWR from 'swr'

const fetcher = async url => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

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

export const useTeams = id => {
  const { data, error } = useSWR(`/api/users/${id}/teams`, fetcher)

  return {
    teams: data,
    isLoading: !error && !data,
    isError: error
  }
}