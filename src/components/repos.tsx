import { Link, Card, Flex, Box, Text, Heading } from '@radix-ui/themes'
import { useQuery } from 'react-query'
import { Masonry } from 'masonic'

/** https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories */
type Repo = {
  name: string
  description?: string

  html_url: string
}

const Repos = () => {
  const { isLoading, data } = useQuery<Repo[]>('repos', () =>
    fetch(
      'https://api.github.com/orgs/importantimport/repos',
      { headers: { 'Accept': 'application/vnd.github+json' } }
    ).then(res => res.json())
  )

  if (isLoading) return <Text>Loading...</Text>
  // if (error) return <Text>An error has occurred: {error.message}</Text>

  return (
    <Flex gap="4" direction="column">
      <Heading weight="medium" color="gray">Repos</Heading>
      <Masonry
        items={data!}
        columnGutter={16}
        columnWidth={320}
        render={Repo}
      />
    </Flex>
  )
}

const Repo = ({ data }: { data: Repo }) =>
(
  <Card asChild size="3" style={{
    width: '100%'
  }}>
    <Link href={data.html_url}>
      {/* <Flex gap="4" align="start"> */}
      <Box>
        <Heading size="5" weight="medium">
          {data?.name}
        </Heading>
        <Text size="2" color="gray">
          {data?.description}
        </Text>
      </Box>
      {/* </Flex> */}
    </Link>
  </Card>
)

export default Repos
