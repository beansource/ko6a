import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { HiChevronRight } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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

  const firstBreadcrumb = breadcrumbs?.length >= 1 && breadcrumbs[0]?.href
  const shouldShowBreadcrumbSeparator = firstBreadcrumb !== '/'
  const separator = shouldShowBreadcrumbSeparator && (
    <Box as={HiChevronRight} color="gray.400" fontSize="md" top="2px" pos="relative" />
  )

  if (props.results) {
    const path = props?.results?.path?.split('/')
    const owner = props?.results?.repo?.project?.name
    return (
      <Breadcrumb
        fontSize="sm"
        {...props}
        separator={separator}
      >
        <BreadcrumbItem color="inherit">
          <BreadcrumbLink href="/projects">
            projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem color="inherit">
          <BreadcrumbLink href={`/projects/${owner}`}>
            {owner}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {path.map((item, idx) => {
          return (
            <BreadcrumbItem color="inherit" key={idx}>
              <BreadcrumbLink>
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
        <BreadcrumbItem color="inherit" isCurrentPage>
          <BreadcrumbLink>
            results 🥳
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb
      fontSize="sm"
      {...props}
      separator={separator}
    >
      {breadcrumbs?.map((item, idx) => {
        return (
          <BreadcrumbItem color="inherit" isCurrentPage={item.name == breadcrumbs[breadcrumbs.length - 1].name} key={idx}>
            <Link href={item.href} passHref>
              <BreadcrumbLink>
                {item.name}
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}