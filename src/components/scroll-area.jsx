import { Box, useColorModeValue as mode } from '@chakra-ui/react'

export const ScrollArea = props => (
  <Box
    overflowY="auto"
    height="80vh"
    minH="px"
    maxH="full"
    {...props}
    sx={{
      '&::-webkit-scrollbar-track': {
        bg: 'transparent',
      },
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        bg: mode('blue.600', 'gray.700'),
        borderRadius: '20px',
      },
    }}
  />
)