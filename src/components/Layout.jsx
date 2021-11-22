import { Avatar, Box, Flex, Stack, Button, Link, useColorModeValue as mode } from '@chakra-ui/react'
import { BsFillFolderFill, BsSearch, BsTerminalFill } from 'react-icons/bs'

import { data } from '../_data';
import { MobileMenuButton } from '../components/MobileMenuButton'
import { NavBreadcrumb } from '../components/NavBreadcrumb'
import { NavSectionTitle } from '../components/NavSectionTitle'
import { ScrollArea } from '../components/ScrollArea'
import { SearchInput } from '../components/SearchInput'
import { SidebarLink } from '../components/SidebarLink'
import { useMobileMenuState } from '../components/useMobileMenuState'
import { UserInfo } from '../components/UserInfo'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getViewer, getFollowers } from '../utils/githubApi';
import { useToken } from '../utils/hooks';

export default function Layout({ children }) {
  const router = useRouter();

  const { isOpen, toggle } = useMobileMenuState();
  const token = useToken();
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();

  const githubLogin = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20repo`;

  useEffect(async () => {
    if (router?.query?.token) {
      window.localStorage.setItem('ko6aToken', router.query.token);
      router.push('/');
    }
    getViewerData();
    if (token && !followers) {
      const { viewer } = await getFollowers(token);
      setFollowers(viewer.followers.nodes);
    }
  });

  const getViewerData = async () => {
    if (window.localStorage.getItem('ko6aToken') && !user) {
      if (!window.localStorage.getItem('ko6aViewer')) {
        const { viewer } = await getViewer(window.localStorage.getItem('ko6aToken'));
        window.localStorage.setItem('ko6aViewer', JSON.stringify(viewer));
        setUser(viewer);
      }
      else {
        const viewer = JSON.parse(window.localStorage.getItem('ko6aViewer'));
        setUser(viewer);
      }
    }
  };

  return token ? (
    <Flex
      height="100vh"
      bg={mode('blue.800', 'gray.800')}
      overflow="hidden"
      sx={{
        '--sidebar-width': '16rem',
      }}
    >
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
            <UserInfo name={user ? user.name : 'Loading...'} email={user ? user.email : ''} image={user ? user.avatarUrl : null} />
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
              <SidebarLink icon={<BsFillFolderFill />} href="/projects">
                Projects
              </SidebarLink>
              <SidebarLink icon={<BsTerminalFill />}>Console</SidebarLink>
            </Stack>
            <Stack pb="6">
              <NavSectionTitle>Team</NavSectionTitle>
              {followers?.map((follower, index) => (
                <SidebarLink
                  key={index}
                  avatar={<Avatar size="xs" name={follower.name} src={follower.avatarUrl} />}
                >
                  {follower.name}
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
      <Box
        flex="1"
        p={{
          base: '0',
          md: '6',
        }}
        marginStart={{
          md: 'var(--sidebar-width)',
        }}
        position="relative"
        left={isOpen ? 'var(--sidebar-width)' : '0'}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg={mode('white', 'gray.700')}
          height="100%"
          pb="6"
          rounded={{
            md: 'lg',
          }}
        >
          <Flex direction="column" height="full">
            <Flex w="full" py="4" justify="space-between" align="center" px="10">
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb slug={router?.query?.slug} />
              </Flex>
              <SearchInput />
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
              {children}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  ) : (
    <Flex direction="row" width="100vw" height="100vh" align="center" justify="center" 
      bg={mode('blue.800', 'gray.800')}>
      <Link href={githubLogin}>
        <Button>Login</Button>
      </Link>
    </Flex>
  )}