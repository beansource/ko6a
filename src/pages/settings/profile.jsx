import { useState } from 'react'
import { useUser } from '@util/hooks'
import { Button, Container, FormControl, FormLabel, Heading, HStack, Avatar, Input, Spacer, 
  Textarea, VStack, useToast } from '@chakra-ui/react'

const ProfileSettings = () => {
  const toast = useToast()
  const { user, mutateUser } = useUser()
  
  const [name, setName] = useState(user?.name)
  const [bio, setBio] = useState(user?.bio)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const userHasChanges = (name !== user?.name) || (bio !== user?.bio)
  const handleNameChange = e => setName(e.target.value)
  const handleBioChange = e => setBio(e.target.value)

  const profilePic = user.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${user.ghLogin}.svg`

  const updateProfile = () => {
    setIsUpdating(true)
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
          duration: 4000,
          isClosable: true,
          position: 'top-right'
        })
        mutateUser({ ...user, name })
      } else {
        toast({
          title: 'Error updating profile',
          description: 'An error occurred while updating your profile.',
          status: 'error',
          duration: 7000,
          isClosable: true,
          position: 'top-right'
        })
      }
      setIsUpdating(false)
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
              Photo
            </FormLabel>
            <Avatar showBorder='true' size='2xl' src={profilePic} />
          </VStack>
        </HStack>
      </VStack>
      <HStack pt='20'>
        <Button
          size='sm' colorScheme='green'
          isDisabled={!userHasChanges} isLoading={isUpdating}
          onClick={updateProfile}
        >
          Update
        </Button>
      </HStack>
    </Container>
  )
}

export default ProfileSettings