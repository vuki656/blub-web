import {
    Button,
    LoadingOverlay,
    SimpleGrid,
    Stack,
} from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useGetPostsQuery } from '../../graphql/types.generated'

import { HomePost } from './HomePost'

const ID = "posts-list"

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

    useEffect(() => {
        if (!router.query.skip) {
            void router.push('/?skip=0', undefined, { shallow: true })
        }
    }, [])

    const onNextPage = async () => {
        await router.push(`/?skip=${Number(router.query.skip) + 50}`)

        document.getElementById(ID)?.scroll(0, 0)
    }

    const onPreviousPage = async () => {
        await router.push(`/?skip=${Number(router.query.skip) - 50}`)

        document.getElementById(ID)?.scroll(0, 0)
    }

    return (
        <Stack
            id={ID}
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
            <LoadingOverlay visible={loading} />
            {data?.posts.list.map((post) => {
                return (
                    <HomePost
                        key={post.id}
                        value={post}
                    />
                )
            })}
            <SimpleGrid cols={2}>
                <Button
                    disabled={Number(router.query.skip) - 50 < 0}
                    onClick={onPreviousPage}
                    variant="default"
                >
                    Previous
                </Button>
                <Button
                    disabled={Number(data?.posts.total) <= (Number(router.query.skip) + 50)}
                    onClick={onNextPage}
                    variant="default"
                >
                    Next
                </Button>
            </SimpleGrid>
        </Stack>
    )
}
