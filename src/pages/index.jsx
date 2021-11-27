import { Box, Heading, Stack, SimpleGrid, Text } from '@chakra-ui/react'
import { GiGorilla } from 'react-icons/gi'
import { FcTimeline, FcInTransit, FcFactory, FcDeployment, FcElectronics } from 'react-icons/fc'

export default function Home() {
  return (
    <>
      <Heading size="md" fontWeight="extrabold" mb="6">
        Vision
      </Heading>
      <Box flex="1" borderWidth="3px" borderStyle="dashed" rounded="xl" p="16">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY={{ base: '8', md: '14' }}>
          <Feature title="Strength attributes" icon={<GiGorilla />}>
            Gorillas are stronger than 20 adult humans combined, can lift 10x their body weight, and
            run 25mph
          </Feature>
          <Feature title="Bring your own tests" icon={<FcInTransit />}>
            Collaboratively write your tests on GitHub, run them in k6ba
          </Feature>
          <Feature title="Let ko6a do the work" icon={<FcFactory />}>
            No dependencies or requirements necessary to start performance testing
          </Feature>
          <Feature title="Developer experience" icon={<FcDeployment />}>
            Deployment for local dev or cloud is instant with a Dockerfile requiring just a few params
          </Feature>
          <Feature title='Built on modern tech' icon={<FcElectronics />}>
            ko6a, Next.js, Docker, and k6 combined to create a modern tech experience
          </Feature>
          <Feature title="Feature-rich product roadmap" icon={<FcTimeline />}>
            Data visualization, stats, automatic test scheduling, and more to come 👀
          </Feature>
        </SimpleGrid>
      </Box>
    </>
  )
}

export const Feature = props => {
  const { title, children, icon } = props
  return (
    <Stack spacing={{ base: '3', md: '6' }} direction={{ base: 'column', md: 'row' }}>
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box>{children}</Box>
      </Stack>
    </Stack>
  )
}