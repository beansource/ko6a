import { Text } from '@chakra-ui/react'
import * as React from 'react'

export const NavSectionTitle = (props) => (
  <Text
    casing="uppercase"
    fontSize="xs"
    fontWeight="semibold"
    letterSpacing="wide"
    paddingStart="3"
    color="gray.400"
    {...props}
  />
)