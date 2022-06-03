import { useContext, useState } from 'react'
import { Formik, Form } from 'formik'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import FormikField from '@components/forms/formik-field'
import { TeamContext } from '@components/contexts/team-context'
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, 
  Stack, HStack, Spacer, Text
} from '@chakra-ui/react'

export default function NewProject({ isOpen, onOpen, onClose }) {
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const { currentTeam } = useContext(TeamContext)
  const [projectNameValue, setProjectNameValue] = useState('')
  
  const trimmedProjectName = projectNameValue.trim()
  const projectNameIncludesSpaces = trimmedProjectName.includes(' ')
  const formattedProjectName = projectNameIncludesSpaces ? trimmedProjectName.replaceAll(' ', '-') : trimmedProjectName
  
  const onSubmit = (values, { setSubmitting }) => {
    const projectValues = {
      ...values,
      name: formattedProjectName
    }
    $fetch(`/api/teams/${currentTeam}/projects`, {
      method: 'POST',
      body: JSON.stringify({ ...projectValues, currentTeam }),
    })
      .then(r => {
        setSubmitting(false)
        onClose()
        mutate(`/api/teams/${currentTeam}/projects`)
        toast({
          title: "Project created 🚀",
          description: `${formattedProjectName} has been successfully created!`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
      })
      .catch(() => {
        setSubmitting(false)
        console.log('Issue creating project :(')
      })
  }

  const stringIsNotEmpty = value => {
    if (!value?.length > 0) {
      return 'Value must not be empty!'
    }
  }

  const validateProjectName = value => {
    setProjectNameValue(value)
    return stringIsNotEmpty(value)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Project</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Formik initialValues={{}} onSubmit={onSubmit}>
            {(props) => (
              <Form>
                <Stack spacing='2'>
                  <FormikField name="name" label="Project name" validation={validateProjectName} />
                  <FormikField name="description" label="Description" validation={stringIsNotEmpty} />
                  {projectNameIncludesSpaces && 
                    <Text>
                      Project will be saved as {formattedProjectName}
                    </Text>
                  }
                  <HStack>
                    <Spacer />
                    <Button isLoading={props.isSubmitting} type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </HStack>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}
