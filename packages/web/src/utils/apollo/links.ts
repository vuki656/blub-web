import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'
import getConfig from 'next/config'

import { COOKIE_NAME } from '../constants'

const httpLink = createHttpLink({
    uri: getConfig().publicRuntimeConfig.API_URL,
})

const authLink = setContext(() => {
    const token = getCookie(COOKIE_NAME)

    return {
        headers: {
            authorization: token ?? '',
        },
    }
})

export const link = authLink.concat(httpLink)
