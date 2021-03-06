import { useContext, useRef } from 'react'
import { Formik, Form } from 'formik'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import FormikField from '@components/forms/formik-field'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalCloseButton, Stack, HStack, Spacer
} from '@chakra-ui/react'
import { TeamContext } from '@components/contexts/team-context'

export default function NewRepo({ isOpen, onClose }) {
  const toast = useToast()
  const initialRef = useRef(null)
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const  { project } = router?.query
  const { currentTeam } = useContext(TeamContext)
  
  const onSubmit = (values, { setSubmitting }) => {
    $fetch(`/api/teams/${currentTeam}/projects/${project}/repos`, {
      method: 'POST',
      body: JSON.stringify({ ...values }),
    })
      .then(() => {
        setSubmitting(false)
        onClose()
        mutate(`/api/teams/${currentTeam}/projects/${project}`)
        toast({
          title: "Repo added ✨",
          description: `${values.repo} has been successfully added to ${project}!`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right"
        })
      })
      .catch(err => {
        setSubmitting(false)
        toast({
          title: "Issue adding repo",
          description: `There was an issue adding the repo, ${err}`,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right"
        })
      })
  }

  const stringIsNotEmpty = (value) => {
    if (!value?.length > 0) {
      return 'Value must not be empty!'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Project</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Formik initialValues={{}} onSubmit={onSubmit}>
            {(props) => (
              <Form>
                <Stack spacing='2'>
                  <FormikField name="owner" label="Repo owner (user/org)" validation={stringIsNotEmpty} focus={initialRef} />
                  <FormikField name="repo" label="The repo name" validation={stringIsNotEmpty} />
                  <FormikField name="description" label="Description" validation={stringIsNotEmpty} />
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
