import type { NextPage } from 'next'
import NextHead from 'next/head'

import { Post } from '../../modules'

const PostPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Post
                </title>
            </NextHead>
            <Post />
        </>
    )
}

export default PostPage
