import { Stack } from 'expo-router'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const apikey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY
const client = new ApolloClient({
    uri: 'https://zeunitz.us-east-a.ibm.stepzen.net/api/soft-sparrow/graphql',
    headers: {'Authorization':`apikey ${apikey}` },
    cache: new InMemoryCache()
})

export default function RootLayout() {
    return (
        <ApolloProvider client={client}>
            <Stack>
                <Stack.Screen name='index' options={{title: 'Exercises'}} />
            </Stack>
        </ApolloProvider>

    )
}