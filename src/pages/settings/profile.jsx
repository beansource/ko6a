import { Container, FormControl, FormLabel, Heading, HStack, Image, Input, Spacer, Textarea, VStack } from "@chakra-ui/react"
import { useUser } from "@util/hooks"

// todo: implement and re-enable input fields
const ProfileSettings = () => {
  const { user } = useUser()
  const profilePic = user.avatarUrl ?? `https://avatars.dicebear.com/api/jdenticon/${user.name}.svg`

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
              <Input id='name' type='text' value={user.name} isDisabled />
            </FormControl>

            <FormControl w='sm'>
              <FormLabel htmlFor='bio' fontWeight='semibold'>
                Bio
              </FormLabel>
              <Textarea id='bio' isDisabled />
            </FormControl>
          </VStack>
          <Spacer />
          <VStack align='start' pr='10' spacing={0}>
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
    </Container>
  )
}

export default ProfileSettings