import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'

export const TeamContext = createContext()

export const TeamProvider = ({ children, defaultTeam }) => {
  const router = useRouter()
  const [currentTeam, setCurrentTeam] = useState(defaultTeam)

  useEffect(() => {
    const storedTeam = window.sessionStorage.getItem('currentTeam')
    if (storedTeam && storedTeam != currentTeam) {
      setCurrentTeam(storedTeam)
    }
  }, [])

  const handleTeamSwitch = newTeam => {
    const tempTeam = currentTeam
    setCurrentTeam(newTeam)
    window.sessionStorage.setItem('currentTeam', newTeam)
    if (newTeam != tempTeam) {
      router.push('/')
    }
  }

  const state = {
    currentTeam, handleTeamSwitch
  }

  return (
    <TeamContext.Provider value={state}>
      {children}
    </TeamContext.Provider>
  )
}