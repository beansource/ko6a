import { usePrisma } from '@prismaClient'

const getUsers = async () => {
  const { user } = usePrisma()
  return user.findMany({ where: {}, orderBy: { name: 'desc' } })
}

const setupNewUser = async (githubLogin, userName) => {
  const { user, team, teamMember } = usePrisma()
  const ghLogin = githubLogin,
        defaultTeam = githubLogin,
        name = userName ?? githubLogin

  const newUser = await user.create({ data: { ghLogin, name, defaultTeam }})
  const { id: newTeamId } = await team.create({ data: { name: defaultTeam }})
  await teamMember.create({ data: { teamId: newTeamId, userId: newUser.id }})

  return newUser
}

export {
  getUsers,
  setupNewUser
}