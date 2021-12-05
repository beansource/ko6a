import { Avatar, Box, HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'

export const UserInfo = props => {
  const { name, image, email } = props
  return (
    <HStack display="inline-flex" p="3">
      <Avatar size="sm" name={name} src={image} />
      <Box lineHeight="1" align="left">
        <Text fontWeight="semibold">{name}</Text>
        <Text fontSize="xs" mt="1" color={mode('whiteAlpha.700', 'gray.400')}>
          {email}
        </Text>
      </Box>
    </HStack>
  )
}
