import {
    Button,
    Center,
    Group,
    LoadingOverlay,
    Paper,
    SegmentedControl,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import {
    IconClock,
    IconStar,
} from '@tabler/icons'
import { useRouter } from 'next/router'
import {
    useEffect,
    useRef,
    useState,
} from 'react'

import { CreatePost } from '../../components'
import {
    PostsSortEnum,
    useGetPostsQuery,
} from '../../graphql/types.generated'

import { HomePost } from './HomePost'

const PAGINATED_POST_LIST_AMOUNT = 20

export const Home = () => {
    const router = useRouter()

    const [sortDays, setSortDays] = useState<number | null>(null)
    const [sortType, setSortType] = useState(PostsSortEnum.New)

    const { data, loading } = useGetPostsQuery({
        fetchPolicy: 'cache-and-network',
        ssr: false,
        variables: {
            args: {
                days: sortDays,
                skip: Number(router.query.skip),
                sort: sortType,
            },
        },
    })

    const rootRef = useRef<HTMLDivElement>(null)

    const resetPagination = () => {
        void router.push('/?skip=0', undefined, { shallow: true })
    }

    useEffect(() => {
        if (!router.query.skip) {
            resetPagination()
        }
    }, [])

    const onNextPage = async () => {
        await router.push(`/?skip=${Number(router.query.skip) + PAGINATED_POST_LIST_AMOUNT}`)

        rootRef.current?.scrollTo(0, 0)
    }

    const onPreviousPage = async () => {
        await router.push(`/?skip=${Number(router.query.skip) - PAGINATED_POST_LIST_AMOUNT}`)

        rootRef.current?.scrollTo(0, 0)
    }

    const onSortTypeChange = (type: PostsSortEnum) => {
        setSortType(type)

        if (type === PostsSortEnum.New) {
            setSortDays(null)

            resetPagination()
        } else {
            setSortDays(30)

            resetPagination()
        }
    }

    const onSortDaysChange = (days: string) => {
        setSortDays(Number(days))
    }

    const noMorePosts = Number(data?.posts.total) <= (Number(router.query.skip) + PAGINATED_POST_LIST_AMOUNT)

    return (
        <Stack
            ref={rootRef}
            sx={(theme) => ({ // eslint-disable sort-keys-fix/sort-keys-fix
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
                }, // eslint-enable sort-keys-fix/sort-keys-fix
                flex: 1,
                overflow: 'auto',
                position: 'relative',
            })}
        >
            <LoadingOverlay visible={loading} />
            <Group>
                <SegmentedControl
                    data={[
                        {
                            label: (
                                <Center>
                                    <IconClock size={15} />
                                    <Center pl={5}>
                                        New
                                    </Center>
                                </Center>
                            ),
                            value: PostsSortEnum.New,
                        },
                        {
                            label: (
                                <Center>
                                    <IconStar size={15} />
                                    <Center pl={5}>
                                        Popular
                                    </Center>
                                </Center>
                            ),
                            value: PostsSortEnum.Popular,
                        },
                    ]}
                    onChange={onSortTypeChange}
                />
                {sortDays === null ? null : (
                    <SegmentedControl
                        data={[
                            { label: '30 Days', value: '30' },
                            { label: '60 Days', value: '60' },
                            { label: '90 Days', value: '90' },
                            { label: 'All Time', value: '10_000' },
                        ]}
                        onChange={onSortDaysChange}
                    />
                )}
            </Group>
            {data?.posts.list.map((post) => {
                return (
                    <HomePost
                        key={post.id}
                        value={post}
                    />
                )
            })}
            {noMorePosts ? (
                <Paper
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
                        What's on your mind?
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
                    disabled={Number(router.query.skip) - PAGINATED_POST_LIST_AMOUNT < 0}
                    onClick={onPreviousPage}
                    variant="default"
                >
                    Previous
                </Button>
                <Button
                    disabled={noMorePosts}
                    onClick={onNextPage}
                    variant="default"
                >
                    Next
                </Button>
            </SimpleGrid>
        </Stack>
    )
}
