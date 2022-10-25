import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

import {
    useCreateVoteMutation,
    useGetPostQuery,
    VoteTypeEnum,
} from '../../graphql/types.generated'
import {
    COOKIE_NAME,
    GoogleAnalytics,
} from '../../utils'

import type { PostPageQueryVariables } from './Post.types'

export const Post = () => {
    const router = useRouter()

    const query = router.query as PostPageQueryVariables

    const userId = getCookie(COOKIE_NAME)

    const [createVoteMutation] = useCreateVoteMutation({
        onCompleted: (response) => {
            GoogleAnalytics.trackEvent(
                'vote',
                {
                    category: 'engagement',
                    label: response.createVote?.vote.type.toString(),
                }
            )
        },
    })

    const { data, refetch } = useGetPostQuery({
        fetchPolicy: 'network-only', // TODO: check if it can be done without this 
        variables: {
            args: {
                id: query.postId,
            },
        },
    })

    const post = data?.post

    const onVote = (type: VoteTypeEnum) => {
        return async () => {
            if (!userId || !post?.id) {
                return
            }

            await createVoteMutation({
                variables: {
                    input: {
                        postId: post.id,
                        type,
                        userId: userId.toString(),
                    },
                },
            })

            refetch()
        }
    }

    return (
        <Paper
            p="md"
            shadow="xs"
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
            <Paper
                p="md"
                shadow="xs"
            >
                <Stack>
                    <Text
                        color="dimmed"
                        size="sm"
                    >
                        {dayjs(post?.createdAt).format('MM.DD.YYYY')}
                    </Text>
                    <Text>
                        {post?.text}
                    </Text>
                    <SimpleGrid cols={2}>
                        <Button
                            fullWidth={true}
                            onClick={onVote(VoteTypeEnum.Positive)}
                            sx={(theme) => ({
                                borderColor: post?.userVote === VoteTypeEnum.Positive ? theme.colors.blue[4] : '',
                            })}
                            variant="default"
                        >
                            <Text>
                                {post?.votes.positive.length === 0 ? '' : post?.votes.positive.length}
                            </Text>
                            <Text sx={{ paddingLeft: '5px' }}>
                                Like
                            </Text>
                        </Button>
                        <Button
                            fullWidth={true}
                            onClick={onVote(VoteTypeEnum.Negative)}
                            sx={(theme) => ({
                                borderColor: post?.userVote === VoteTypeEnum.Negative ? theme.colors.blue[4] : '',
                            })}
                            variant="default"
                        >
                            <Text>
                                {post?.votes.negative.length === 0 ? '' : post?.votes.negative.length}
                            </Text>
                            <Text sx={{ paddingLeft: '5px' }}>
                                Dislike
                            </Text>
                        </Button>
                    </SimpleGrid>
                </Stack>
            </Paper>
        </Paper>
    )
}
