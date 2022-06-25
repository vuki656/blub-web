import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { NotificationsProvider } from '@mantine/notifications'
import { getCookie } from 'cookies-next'
import withApollo from 'next-with-apollo'
import NextApp from 'next/app'
import Head from 'next/head'

import {
    GlobalStyles,
    ThemeRoot,
} from '../components'
import introspectionGeneratedTS from '../graphql/introspection.generated.json'
import introspectionGeneratedJSON from '../graphql/types.generated'
import type { AppProps } from '../utils'
import {
    COOKIE_COLORSCHEME_NAME,
    link,
} from '../utils'

const App = (props: AppProps) => {
    const {
        Component,
        apollo,
        colorScheme,
        pageProps,
    } = props

    return (
        <>
            <Head>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <ThemeRoot colorScheme={colorScheme}>
                <NotificationsProvider>
                    <GlobalStyles />
                    <ApolloProvider client={apollo}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </NotificationsProvider>
            </ThemeRoot>
        </>
    )
}

App.getInitialProps = async (appProps: any) => {
    const initialProps = await NextApp.getInitialProps(appProps)

    return {
        ...initialProps,
        colorScheme: getCookie(COOKIE_COLORSCHEME_NAME, appProps.ctx) ?? 'light',
    }
}

export default withApollo((client) => {
    const typesPolicies = introspectionGeneratedTS.__schema.types
        .filter((type) => {
            return type.kind === 'OBJECT'
        })
        .map((type) => {
            return [type.name, { merge: true }]
        })

    const cache = new InMemoryCache({
        possibleTypes: introspectionGeneratedJSON.possibleTypes,
        typePolicies: Object.fromEntries(typesPolicies),
    })

    if (client.initialState) {
        cache.restore(client.initialState)
    }

    return new ApolloClient({
        cache,
        link,
        ssrMode: typeof window === 'undefined',
    })
}, { getDataFromTree })(App)
