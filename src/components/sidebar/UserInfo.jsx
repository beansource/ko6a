import { Avatar, Box, HStack, Text, useColorModeValue as mode, Spacer } from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'

export const UserInfo = props => {
  const { name, image, email } = props

  return (
    <HStack display="inline-flex" p="3">
      <Avatar bg="none" size="sm" name={name} src={image} />
      <Box lineHeight="1" align="left">
        <Text fontWeight="semibold">{name}</Text>
        <Text fontSize="xs" mt="1" color={mode('whiteAlpha.700', 'gray.400')}>
          {email}
        </Text>
      </Box>
      <Spacer ml="auto" />
      <UpDownIcon />
    </HStack>
  )
}
