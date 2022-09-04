import {
    Button,
    LoadingOverlay,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import { useRouter } from 'next/router'
import {
    useEffect,
    useRef,
} from 'react'

import { CreatePost } from '../../components'
import { useGetPostsQuery } from '../../graphql/types.generated'

import { HomePost } from './HomePost'

export const Home: React.FunctionComponent = () => {
    const router = useRouter()

    const { data, loading } = useGetPostsQuery({
        ssr: false,
        variables: {
            args: {
                skip: Number(router.query.skip),
            },
        },
    })

    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!router.query.skip) {
            void router.push('/?skip=0', undefined, { shallow: true })
        }
    }, [])

    const onNextPage = async () => {
        await router.push(`/?skip=${Number(router.query.skip) + 50}`)

        rootRef.current?.scrollTo(0, 0)
    }

    const onPreviousPage = async () => {
        await router.push(`/?skip=${Number(router.query.skip) - 50}`)

        rootRef.current?.scrollTo(0, 0)
    }

    const noMorePosts = Number(data?.posts.total) <= (Number(router.query.skip) + 50)

    return (
        <Stack
            ref={rootRef}
            data-cy="post-list"
            sx={(theme) => ({
                '@media (max-width: 600px)': {
                    padding: theme.spacing.sm,
                },
                '@media (min-width: 1251px) and (max-width: 2000px)': {
                    padding: `${theme.spacing.sm}px 30%`,
                },
                '@media (min-width: 2001px)': {
                    padding: `${theme.spacing.sm}px 35%`,
                },
                '@media (min-width: 601px) and (max-width: 850px)': {
                    padding: `${theme.spacing.sm}px 15%`,
                },
                '@media (min-width: 851px) and (max-width: 1250px)': {
                    padding: `${theme.spacing.sm}px 20%`,
                },
                flex: 1,
                overflow: 'auto',
            })}
        >
            {/* // TODO: fix */}
            {/* <LoadingOverlay visible={loading} /> */}
            {data?.posts.list.map((post, index) => {
                return (
                    <HomePost
                        key={post.id}
                        value={post}
                        index={index}
                    />
                )
            })}
            {noMorePosts ? (
                <Paper
                    data-cy="post-hint"
                    sx={(theme) => ({
                        alignItems: 'center',
                        boxShadow: theme.shadows.xs,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: theme.spacing.md,
                        rowGap: theme.spacing.md,
                    })}
                >
                    <Text align="center">
                        Whats on your mind?
                        {' '}
                        Make an
                        {' '}
                        <strong>
                            anonymous
                        </strong>
                        {' '}
                        post.
                    </Text>
                    <CreatePost />
                </Paper>
            ) : null}
            <SimpleGrid cols={2}>
                <Button
                    disabled={Number(router.query.skip) - 50 < 0}
                    onClick={onPreviousPage}
                    variant="default"
                    data-cy="previous-button"
                >
                    Previous
                </Button>
                <Button
                    disabled={noMorePosts}
                    data-cy="next-button"
                    onClick={onNextPage}
                    variant="default"
                >
                    Next
                </Button>
            </SimpleGrid>
        </Stack>
    )
}
