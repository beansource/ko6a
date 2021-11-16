import { Box, useColorModeValue as mode, SimpleGrid } from '@chakra-ui/react'
import useSWR from 'swr'

export const Explorer = props => {
  const { org, repo, children } = props
  try {
    const { data } = useSWR(['/api/github', org, repo], fetcher)
    console.log(data)
  } catch (error) {
    console.log(error)
  }

  return (
    <Box position="relative" p="8">
      <Box fontWeight="bold" maxW="xl">
        {`${org}/${repo}`} 
      </Box>
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.200')}>
        {children}
      </Box>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {data?.data?.map(item => {
          return (
            <Box
            _after={{
              borderImage: "radial-gradient(rgb(0,143,104), rgb(250,224,66)) 1",
              borderRadius: "8px"
            }} sx={{
              borderImage: "radial-gradient(rgb(0,143,104), rgb(250,224,66)) 1",
              borderRadius: "8px"
            }} p="8" w="100%" border="4px">
              {JSON.stringify(item.name)}
            </Box>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

const fetcher = (url, owner, repo) => fetch(url, {
  method: 'POST', 
  body: JSON.stringify({
    owner,
    repo
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json());