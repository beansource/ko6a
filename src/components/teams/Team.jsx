import { useState } from 'react'
import { VStack, Box, Text, Flex, Input, Button, Spacer, Link, Divider,
  FormControl, FormLabel, FormErrorMessage, Spinner, Stack, StackDivider } from '@chakra-ui/react'
import PageSpinner from '@components/PageSpinner'
import { Formik, Form, Field } from 'formik'
import { useTeammates, useTeam } from '@hooks'
import { $fetch } from 'ohmyfetch'
import { useSWRConfig } from 'swr'

export const Team = ({ teamName }) => {
  const { mutate } = useSWRConfig()
  const { teammates, isLoading: isTeammatesLoading, isError: isTeammatesError } = useTeammates(teamName)
  const { team, isLoading: isTeamLoading, isError: isTeamError } = useTeam(teamName)

  const [name, setName] = useState(team?.name)
  const handleNameChange = event => setName(event.target.value)

  if (isTeammatesLoading || isTeamLoading) {
    return <PageSpinner />
  }
  else if (isTeammatesError || isTeamError) {
    console.log("🚀 ~ file: Team.jsx ~ line 22 ~ Team ~ {isTeammatesError,isTeamError}", {isTeammatesError,isTeamError})
    return 'scawy'
  }
  else {
    if (name != team.name) setName(team.name)
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        $fetch(`/api/teams/${team.name}/members`, {
          method: 'PUT',
          body: JSON.stringify(values)
        })
        .then(res => {
          // TODO: success toast
          setSubmitting(false)
          mutate(`/api/teams/${team.name}/members`)
        })
        .catch(e => {
          // TODO: error toast
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
        // TODO: success toast
        console.log("🚀 ~ file: Team.jsx ~ line 25 ~ onSubmit ~ res", res)
        mutate(`/api/teams/${team.name}/members`)
      })
      .catch(e => {
        // TODO: error toast
        console.log("🚀 ~ file: Team.jsx ~ line 52 ~ e", e)
      })
    }

    return (
      <Stack spacing="8" py="5" px="8" divider={<StackDivider />}>
        <VStack w="full" align="left">
          <SettingsCard>
            <Text fontWeight="bold" fontSize="1.25rem" mb="1rem">Team Name</Text>
            <Text mb=".75rem" color="gray.700">Used to identify your Team on the ko6a Dashboard</Text>
            <Input value={name} onChange={handleNameChange}></Input>
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

const SettingsCard = ({ children }) => {
  return (
    <Flex
        flexDirection="column"
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        mb="2.5rem"
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
          bg="gray.50"
          align="right"
          borderTop="1px"
          borderColor="gray.200"
        >
          <Button bg="none" border="1px" borderColor="gray.300" fontWeight="normal">Save</Button>
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