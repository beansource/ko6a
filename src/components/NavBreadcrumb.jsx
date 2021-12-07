import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { HiChevronRight } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const NavBreadcrumb = props => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()

      const routerPath = linkPath.map((path, i) => {
        return {
          name: path,
          href: '/' + linkPath.slice(0, i + 1).join('/')
        }
      })

      setBreadcrumbs(routerPath)
    }
  }, [router])

  return (
    <Breadcrumb
      fontSize="sm"
      {...props}
      separator={<Box as={HiChevronRight} color="gray.400" fontSize="md" top="2px" pos="relative" />}
    >
       <BreadcrumbItem color="inherit">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs?.map((item, i) => {
        return (
          <BreadcrumbItem color="inherit" isCurrentPage={item.name == breadcrumbs[breadcrumbs.length - 1].name}>
            <BreadcrumbLink href={item.href}>
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}