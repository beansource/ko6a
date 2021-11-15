import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { HiChevronRight } from 'react-icons/hi'

export const NavBreadcrumb = props => (
  <Breadcrumb
    fontSize="sm"
    {...props}
    separator={<Box as={HiChevronRight} color="gray.400" fontSize="md" top="2px" pos="relative" />}
  >
    <BreadcrumbItem color="inherit">
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem color="inherit">
      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
)