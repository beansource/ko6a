import { Avatar, Box, HStack, Text, useColorModeValue as mode, Spacer } from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'

export const UserInfo = props => {
  const { name, image, email } = props

  return (
    <HStack display="inline-flex" p="3" maxW="100%">
      <Avatar bg="none" size="sm" name={name} src={image} />
      <Box lineHeight="1" align="left" w="70%" >
        <Text fontWeight="semibold" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">{name}</Text>
        <Text fontSize="xs" mt="1" color={mode('whiteAlpha.700', 'gray.400')} textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
          {email}
        </Text>
      </Box>
      <UpDownIcon />
    </HStack>
  )
}
