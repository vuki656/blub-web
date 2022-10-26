import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import {
    getCookie,
    setCookie,
} from 'cookies-next'
import withApollo from 'next-with-apollo'
import NextApp from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { v4 as UUID } from 'uuid'

import {
    GlobalStyles,
    Root,
    ThemeRoot,
} from '../components'
import introspectionGeneratedTS from '../graphql/introspection.generated.json'
import introspectionGeneratedJSON from '../graphql/types.generated'
import type { AppProps } from '../utils'
import {
    COOKIE_COLORSCHEME_NAME,
    COOKIE_NAME,
    GoogleAnalytics,
    link,
} from '../utils'

const App = (props: AppProps) => {
    const {
        Component,
        apollo,
        colorScheme,
        pageProps,
    } = props

    const router = useRouter()

    const userId = getCookie(COOKIE_NAME)

    useEffect(() => {
        GoogleAnalytics.trackUser(userId?.toString())

        router.events.on('routeChangeComplete', GoogleAnalytics.trackPageView)
        router.events.on('hashChangeComplete', GoogleAnalytics.trackPageView)

        return () => {
            router.events.off('routeChangeComplete', GoogleAnalytics.trackPageView)
            router.events.off('hashChangeComplete', GoogleAnalytics.trackPageView)
        }
    }, [router.events])

    return (
        <>
            <Head>
                <meta
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    name="viewport"
                />
            </Head>
            <ThemeRoot colorScheme={colorScheme}>
                <GlobalStyles />
                <ApolloProvider client={apollo}>
                    <Root>
                        <Component {...pageProps} />
                    </Root>
                </ApolloProvider>
            </ThemeRoot>
        </>
    )
}

App.getInitialProps = async (appProps: any) => {
    const userId = getCookie(
        COOKIE_NAME,
        {
            req: appProps.ctx.req,
            res: appProps.ctx.res
        }
    )

    if (!userId) {
        setCookie(
            COOKIE_NAME,
            UUID(),
            {
                maxAge: 2_147_483_647, // 10 Years in seconds but browser caps at 1 year
                req: appProps.ctx.req,
                res: appProps.ctx.res,
            }
        )
    }

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
