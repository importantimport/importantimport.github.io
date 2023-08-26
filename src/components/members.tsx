import { Card, Flex, Avatar, Box, Text, Heading, Link } from '@radix-ui/themes'
import { useQuery } from 'react-query'
import { Masonry } from 'masonic'

/** https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28#list-public-organization-members */
type PublicMember = {
  login: string
}

/** https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user--parameters */
type User = {
  login: string,
  name?: string,

  html_url: string,

  avatar_url?: string,
  bio?: string,
}

const Members = () => {
  const { isLoading, data } = useQuery<PublicMember[]>('publicMembers', () =>
    fetch(
      'https://api.github.com/orgs/importantimport/public_members',
      { headers: { 'Accept': 'application/vnd.github+json' } }
    ).then(res => res.json())
  )

  if (isLoading) return <Text>Loading...</Text>
  // if (error) return <Text>An error has occurred: {error.message}</Text>

  return (
    <Flex gap="4" direction="column">
      <Heading weight="medium" color="gray">Members</Heading>
      <Masonry
        items={data!}
        columnGutter={16}
        columnWidth={320}
        render={Member}
      />
    </Flex>
  )
}

const Member = ({ data: { login } }: { data: { login: string } }) => {
  const { data } = useQuery<User>(`user_${login}`, () =>
    fetch(
      `https://api.github.com/users/${login}`,
      { headers: { 'Accept': 'application/vnd.github+json' } }
    ).then(res => res.json())
  )

  return (
    <Card asChild size="3" style={{
      width: '100%'
    }}>
      <Link href={data?.html_url}>
        <Flex gap="4" align="start">
          <Avatar
            size="5"
            src={data?.avatar_url}
            radius="full"
            fallback="T"
          />
          <Box>
            <Heading size="5" weight="medium">
              {data?.name ?? data?.login}
            </Heading>
            <Text size="2" color="gray">
              {data?.bio}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Card>
  )
}

export default Members
