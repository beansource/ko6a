import { useSession } from 'next-auth/react'
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

const useTeammates = name => {
  const { data, error } = useSWR(name && `/api/teams/${name}/members`, fetcher)

  return {
    teammates: data,
    isLoading: !error && !data,
    isError: error
  }
}

const useTeam = id => {
  const { data, error } = useSWR(id && `/api/teams/${id}`, fetcher)

  return {
    team: data,
    isLoading: !error && !data,
    isError: error
  }
}

const useUser = id => {
  const { data: session } = useSession()

  const userId = id || session?.user?.login || undefined
  const { data, error } = useSWR(`/api/users/${userId}`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

const useTeams = id => {
  const { data, error } = useSWR(id && `/api/users/${id}/teams`, fetcher)

  return {
    teams: data,
    isLoading: !error && !data,
    isError: error
  }
}

export {
  useTeammates,
  useTeam,
  useUser,
  useTeams
}
