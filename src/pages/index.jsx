import { Box, Heading, Stack, SimpleGrid, Text } from '@chakra-ui/react'
import { GiGorilla } from 'react-icons/gi'
import { FcTimeline, FcInTransit, FcFactory, FcDeployment, FcElectronics } from 'react-icons/fc';

export default function Home() {
  return (
    <Flex height="100vh" bg={mode('blue.800', 'gray.800')} overflow="hidden" sx={{ '--sidebar-width': '16rem' }}>
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Box
            as="a"
            href="#"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{
              bg: 'whiteAlpha.200',
            }}
            whiteSpace="nowrap"
          >
            <UserInfo name="Esther Collins" email="esther-colls@chakra.com" />
          </Box>
          <ScrollArea pt="5" pb="6">
            <SidebarLink
              display={{
                base: 'block',
                lg: 'none',
              }}
              mb="2"
              icon={<BsSearch />}
            >
              Search
            </SidebarLink>
            <Stack pb="6">
              <SidebarLink icon={<BsFillFolderFill />}>Projects</SidebarLink>
              <SidebarLink icon={<BsTerminalFill />}>Console</SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Team</NavSectionTitle>
              {data.users.map((user, index) => (
                <SidebarLink
                  key={index}
                  avatar={<Avatar size="xs" name={user.name} src={user.image} />}
                >
                  {user.name}
                </SidebarLink>
              ))}
            </Stack>
            <Stack>
              <NavSectionTitle>Resources</NavSectionTitle>
              <SidebarLink>Documentation</SidebarLink>
              <SidebarLink href={data.github} target="_blank">
                GitHub
              </SidebarLink>
            </Stack>
          </ScrollArea>
        </Box>
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
