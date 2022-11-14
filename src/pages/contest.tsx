import type { NextPage } from 'next'
import NextHead from 'next/head'

import { Contest } from '../modules/Contest/Contest'

const ContestPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Contest
                </title>
            </NextHead>
            <Contest />
        </>
    )
}

export default ContestPage
