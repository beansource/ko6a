import { useUser } from "@util/hooks"
import { useState } from "react"
import {
  Button, Container, FormControl, FormLabel, Heading, HStack, Image, Input, Spacer, Textarea, VStack,
  useToast
} from "@chakra-ui/react"

const ProfileSettings = () => {
  const toast = useToast()
  const { user, mutateUser } = useUser()
  
  const [name, setName] = useState(user?.name)
  const [bio, setBio] = useState(user?.bio)
  
  const userHasChanges = (name !== user?.name) || (bio !== user?.bio)
  const handleNameChange = e => setName(e.target.value)
  const handleBioChange = e => setBio(e.target.value)

  const profilePic = user.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${user.name}.svg`

  const updateProfile = () => {
    fetch(`/api/users/${user.ghLogin}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        bio
      })
    }).then(res => {
      if (res.ok) {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully 🎉',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
        mutateUser({ ...user, name })
      } else {
        toast({
          title: 'Error updating profile',
          description: 'An error occurred while updating your profile.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      }
    })
  }

  return (
    <Container maxW='4xl'>
      <Heading as='h2' fontSize='24px' mb='4'>
        Profile
      </Heading>
      <VStack align='start' w='full'>
        <HStack w='full' align='start'>
          <VStack spacing='6'>
            <FormControl w='sm'>
              <FormLabel htmlFor='name' fontWeight='semibold'>
                Name
              </FormLabel>
              <Input id='name' type='text' value={name} onChange={handleNameChange} />
            </FormControl>

            <FormControl w='sm'>
              <FormLabel htmlFor='bio' fontWeight='semibold'>
                Bio
              </FormLabel>
              <Textarea id='bio' value={bio} onChange={handleBioChange} />
            </FormControl>
          </VStack>
          <Spacer />
          <VStack align='start' spacing={0}>
            <FormLabel htmlFor='profilePicture' fontWeight='semibold'>
              Profile picture
            </FormLabel>
            <Image
              width='200' height='200' borderRadius={'50%'}
              src={profilePic}
            />
          </VStack>
        </HStack>
      </VStack>
      <HStack w='full' pt='20' >
        <Spacer />
        <Button
          size='sm' variant='outline' colorScheme='green' isDisabled={!userHasChanges}
          onClick={updateProfile}
        >
          Update
        </Button>
      </HStack>
    </Container>
  )
}

export default ProfileSettings