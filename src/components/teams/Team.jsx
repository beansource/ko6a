import { useState } from 'react'
import { VStack, Box, Text, Flex, Input, Button, Spacer, Link, Divider,
  FormControl, FormLabel, FormErrorMessage, Stack, StackDivider, Select, useToast } from '@chakra-ui/react'
import PageSpinner from '@components/PageSpinner'
import { Formik, Form, Field } from 'formik'
import { useTeammates, useTeam, useUser, useTeams } from '@hooks'
import { $fetch } from 'ohmyfetch'
import { useSWRConfig } from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const Team = ({ teamName }) => {
  const router = useRouter()
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const { data:session } = useSession()

  const { teammates, isLoading: isTeammatesLoading, isError: isTeammatesError } = useTeammates(teamName)
  const { team, isLoading: isTeamLoading, isError: isTeamError } = useTeam(teamName)
  const { user, isLoading: isUserLoading, isError: isUserError } = useUser(session.user.login)
  const { teams, isLoading: isTeamsLoading, isError: isTeamsError } = useTeams(session.user.login)

  const [name, setName] = useState(null)
  const [defaultTeam, setDefaultTeam] = useState(null)
  const handleNameChange = event => setName(event.target.value)
  const handleDefaultChange = event => setDefaultTeam(event.target.value)

  const onNameSave = event => {
    if (name && name != team.name) {
      $fetch(`/api/teams/${team.name}`, {
        method: 'PUT',
        body: JSON.stringify({ name })
      })
      .then(res => {
        mutate(`/api/users/${session.user.login}`)
        mutate(`/api/users/${session.user.login}/teams`)
        router.push(`/team/${name}`)
      })
      .catch(e => {
        toast({
          title: "Could not update team",
          description: `Failed to change team name`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
      })
    }
  }

  const onDefaultSave = event => {
    if (defaultTeam && defaultTeam != user.defaultTeam) {
      $fetch(`/api/users/${session.user.login}`, {
        method: 'PUT',
        body: JSON.stringify({ defaultTeam })
      })
      .then(res => {
        mutate(`/api/users/${session.user.login}`)
      })
      .catch(e => {
        toast({
          title: "Could not update team",
          description: `Failed to update default team`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
      })
    }
  }

  if (isTeammatesLoading || isTeamLoading || isUserLoading || isTeamsLoading) {
    return <PageSpinner />
  }
  else if (isTeammatesError || isTeamError || isUserError || isTeamsError) {
    console.log("🚀 ~ file: Team.jsx ~ line 22 ~ Team ~ {isTeammatesError,isTeamError,isUserError}", JSON.stringify({isTeammatesError,isTeamError, isUserError}))
    return 'scawy'
  }
  else {
    if (name === null) setName(team.name)
    if (defaultTeam === null) setDefaultTeam(user.defaultTeam)
    
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        $fetch(`/api/teams/${team.name}/members`, {
          method: 'PUT',
          body: JSON.stringify(values)
        })
        .then(res => {
          toast({
            title: "Team updated 🚀",
            description: `${values.ghLogin} has been successfully added to ${team.name}!`,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right"
          })
          setSubmitting(false)
          mutate(`/api/teams/${team.name}/members`)
        })
        .catch(e => {
          toast({
            title: "Could not update team",
            description: `Failed to add ${values.ghLogin} to ${team.name}!`,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right"
          })
          console.log("🚀 ~ file: Team.jsx ~ line 30 ~ onSubmit ~ e", e)
          setSubmitting(false)
        })
    }

    const removeMember = member => {
      $fetch(`/api/teams/${team.name}/members`, {
        method: 'DELETE',
        body: JSON.stringify({ ghLogin: member.ghLogin })
      })
      .then(res => {
        toast({
          title: "Team updated 🚀",
          description: `${member.ghLogin} has been successfully removed from ${team.name}!`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
        mutate(`/api/teams/${team.name}/members`)
      })
      .catch(e => {
        toast({
          title: "Could not update team",
          description: `Failed to remove ${member.ghLogin} from ${team.name}!`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
        console.log("🚀 ~ file: Team.jsx ~ line 52 ~ e", e)
      })
    }

    return (
      <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
        <VStack w="full" align="left">
          <SettingsCard onSave={onNameSave}>
            <Text fontWeight="bold" fontSize="1.25rem" mb="1rem">Team Name</Text>
            <Text mb=".75rem" color="gray.700">Used to identify your Team on the ko6a Dashboard</Text>
            <Input value={name} onChange={handleNameChange}/>
          </SettingsCard>
          <SettingsCard>
            <Text fontWeight="bold" fontSize="1.25rem" mb="1rem">Team Members</Text>
            <Text mb=".75rem" color="gray.700">Registered members of your team</Text>
            {teammates && teammates.map(teammate => (
              <Flex
                flexDirection="row"
                align="center"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p="6"
                mb=".5rem"
              >
                <Box>
                  <Text fontWeight="semibold">{teammate.name}</Text>
                  <Link href={`https://github.com/${teammate.ghLogin}`}>@{teammate.ghLogin}</Link>
                </Box>
                <Spacer />
                <Button 
                  bg="white" 
                  border="1px" 
                  borderColor="gray.300" 
                  fontWeight="normal" 
                  _hover={{ 
                    bg: "black", 
                    color: "white", 
                    borderColor: "white" 
                  }}
                  onClick={() => removeMember(teammate)}
                >
                  Remove
                </Button>
              </Flex>))}
              <Flex
                bg="gray.50"
                flexDirection="column"
                align="center"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p="6"
                mb=".5rem"
              >
                <Box w="full" textAlign="left" mb=".5rem"><Text fontWeight="bold">Add New</Text></Box>
                <Divider />
                <Box w="full" align="left" mt=".5rem">
                  <Formik initialValues={{}} onSubmit={onSubmit}>
                    {(props) => (
                      <Form w="full">
                        <Flex w="full" flexDirection="row" align="end">
                          <Box w="83%">
                            <FormikField name="ghLogin" label="Github Login" validation={stringIsNotEmpty} />
                          </Box>
                          <Spacer />
                          <Button isLoading={props.isSubmitting} type="submit" colorScheme="blue">
                            Add Member
                          </Button>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Flex>
          </SettingsCard>
          <SettingsCard onSave={onDefaultSave}>
            <Text fontWeight="bold" fontSize="1.25rem" mb="1rem">Default Team</Text>
            <Text mb=".75rem" color="gray.700">The team that will be selected by default when you log in</Text>
            <Select value={defaultTeam} onChange={handleDefaultChange}>
              { teams.map(teamItem => <option value={teamItem.name}>{teamItem.name}</option>)}
            </Select>
          </SettingsCard>
        </VStack> 
      </Stack>
    )
  }
}

const stringIsNotEmpty = (value) => {
  if (!value?.length > 0) {
    return 'Value must not be empty!'
  }
}

const SettingsCard = ({ onSave, children }) => {
  return (
    <Flex
        flexDirection="column"
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Box
          p="6"
        >
          {children}
        </Box>
        <Box 
          py="2"
          px="6"
          w="full"
          h="3.5rem"
          bg="gray.50"
          align="right"
          borderTop="1px"
          borderColor="gray.200"
        >
          {onSave && <Button bg="none" border="1px" borderColor="gray.300" fontWeight="normal" onClick={onSave}>Save</Button>}
        </Box>
      </Flex>
  )
}

function FormikField({ name, label, placeholder, validation }) {
  return (
    <Field name={name} validate={validation}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[field.name] && form.touched[field.name]}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input bg="white" {...field} id={field.name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}