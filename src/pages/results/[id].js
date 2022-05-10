import { useRouter } from 'next/router'
import { Container } from '@chakra-ui/react'
import useSWR from 'swr'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function Result({ ...props }) {
  const router = useRouter()
  const { id } = router?.query

  const { data, error } = useSWR(`/api/results/${id}`)

  if (error) {
    console.log(error)
  }

  return (
    <Container maxW="container.lg">
      <SyntaxHighlighter language="shell" wrapLines="true" wrapLongLines="true">
        {JSON.stringify(data?.data?.data)}
      </SyntaxHighlighter>
    </Container>
  )
}