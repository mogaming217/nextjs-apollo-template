import { Box, Heading, Link, Spacer, VStack } from '@chakra-ui/layout'
import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'
import { useUserQuery } from 'types/generated/clientGraphql'

const Page: NextPage = () => {
  const { data } = useUserQuery({ variables: { id: 'sampleID' } })

  return (
    <Box>
      <VStack maxW="5xl" w="full" spacing="8" mx="auto">
        <Heading>Hello Next.js Apollo Sample!</Heading>

        <Spacer marginTop={2} />
        <VStack spacing="2">
          <Heading as="h2" size="md">
            リンク集
          </Heading>
          <NextLink href="/api/graphql">
            <Link>GraphQL Playground</Link>
          </NextLink>
        </VStack>

        <Spacer mt="2" />
        {data && <Box>GraphQLから取得したデータ: {JSON.stringify(data.user)}</Box>}
      </VStack>
    </Box>
  )
}

export default Page
