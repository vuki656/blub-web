import type { NextPage } from 'next'
import NextHead from 'next/head'

import { Home } from '../modules'

const HomePage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Blub: Home
                </title>
            </NextHead>
            <Home />
        </>
    )
}

export default HomePage
