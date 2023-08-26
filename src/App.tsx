import { Theme, Container, Heading, Text, Section, Link } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useColorScheme } from '@uiw/react-use-colorscheme'
import { useEffect } from 'react'

import background from './assets/bg.svg'

import '@radix-ui/themes/styles.css'
import '@unocss/reset/tailwind.css'

import Members from './components/members'
import Repos from './components/repos'

const queryClient = new QueryClient()

const App = () => {
  const colorScheme = useColorScheme()

  useEffect(() => {
    document.body.classList.toggle('dark', colorScheme === 'dark')
  }, [colorScheme])

  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="cyan"
        grayColor="slate"
        panelBackground="translucent"
        radius="full"
      >
        <Container px="4" py="8" style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          minHeight: '100vh'
        }}>
          <Section py="8" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <Heading align="center" size="8">
              <Text color="orange">!mportant</Text>
              <Text color="cyan" style={{ fontStyle: 'italic' }}>Import</Text>
            </Heading>
            <Heading align="center" size="4" weight="medium">
              <Text>personal organization for </Text>
              <Link href="https://github.com/kwaa">@kwaa</Link>
            </Heading>
          </Section>
          <Section py="8">
            <Members />
          </Section>
          <Section py="8">
            <Repos />
          </Section>
        </Container>
      </Theme>
    </QueryClientProvider>
  )
}

export default App
