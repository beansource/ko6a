import { Formik, Form, Field } from 'formik'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, 
  Stack, Input, FormControl, FormLabel, FormErrorMessage, HStack, Spacer
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'

export default function NewTeam({ isOpen, onOpen, onClose }) {
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const { data: session } = useSession()
  
  const onSubmit = (values, { setSubmitting }) => {
    $fetch('/api/teams', {
      method: 'POST',
      body: JSON.stringify({ ...values, ghLogin: session.user.login }),
    })
      .then(r => {
        toast({
          title: "Team created 🚀",
          description: `${values.name} has been successfully created!`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
        setSubmitting(false)
        onClose()
        mutate('/api/teams')
        mutate(`/api/users/${session.user.login}/teams`)
      })
      .catch(() => {
        toast({
          title: "Could not create team 🚀",
          description: `Failed to create ${values.name}`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
        setSubmitting(false)
        console.log('Issue creating team :(')
      })
  }

  const stringIsNotEmpty = (value) => {
    if (!value?.length > 0) {
      return 'Value must not be empty!'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Team</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Formik initialValues={{}} onSubmit={onSubmit}>
            {(props) => (
              <Form>
                <Stack spacing='2'>
                  <FormikField name="name" label="Team name" validation={stringIsNotEmpty} />
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

function FormikField({ name, label, placeholder, validation, hidden }) {
  return (
    <Field name={name} validate={validation} type={hidden ? 'hidden' : null}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[field.name] && form.touched[field.name]}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input {...field} id={field.name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
