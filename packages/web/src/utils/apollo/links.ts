import { createHttpLink } from '@apollo/client'
import getConfig from 'next/config'

const httpLink = createHttpLink({
    uri: getConfig().publicRuntimeConfig.API_URL,
})

export const link = httpLink
