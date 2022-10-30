import type { NextPage } from 'next'
import NextHead from 'next/head'

import { Post } from '../../modules'

const PostPage: NextPage = () => {
    return (
        <>
            <NextHead>
                <title>
                    Blub: Post
                </title>
            </NextHead>
            <Post />
        </>
    )
}

export default PostPage
