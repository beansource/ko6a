import { Center } from '@chakra-ui/react'
import { useUser } from '@util/hooks'

const TeamSettingsHome = () => {
const { user } = useUser()
console.log("🚀 ~ file: index.jsx ~ line 6 ~ TeamSettingsHome ~ user", user)
  
  return (
    <Center h='100vh'>
      This shall list all teams you are a member of
    </Center>
  )
}

export default TeamSettingsHome