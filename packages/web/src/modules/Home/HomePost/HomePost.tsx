import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useState } from 'react'
import { v4 as UUID } from 'uuid'

import type {
    PostType,
    VoteType,
} from '../../../graphql/types.generated'
import {
    useCreateVoteMutation,
    VoteTypeEnum,
} from '../../../graphql/types.generated'
import {
    COOKIE_NAME,
    GoogleAnalytics,
} from '../../../utils'

import type { HomePostProps } from './HomePost.types'

// TODO: comment count in button
export const HomePost: React.FunctionComponent<HomePostProps> = (props) => {
    const {
        index,
        value,
    } = props

    const [currentPost, setCurrentPost] = useState(value)

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

    const onVote = (post: PostType, type: VoteTypeEnum) => {
        if (!userId || Boolean(post.userVote)) {
            return
        }

        void createVoteMutation({
            variables: {
                input: {
                    postId: post.id,
                    type,
                    userId: userId.toString(),
                },
            },
        })

        setCurrentPost((previousState) => {
            const vote: VoteType = {
                id: UUID(),
                type,
                userId: userId.toString(),
            }

            const negativeVotes: VoteType[] = type === VoteTypeEnum.Negative
                ? [...previousState.votes.negative, vote]
                : previousState.votes.negative

            const positiveVotes: VoteType[] = type === VoteTypeEnum.Positive
                ? [...previousState.votes.positive, vote]
                : previousState.votes.positive

            return {
                ...previousState,
                userVote: type,
                votes: {
                    negative: negativeVotes,
                    positive: positiveVotes,
                },
            }
        })
    }

    const votes = currentPost.votes

    return (
        <Paper
            p="md"
            shadow="xs"
        >
            <Stack>
                <Text
                    color="dimmed"
                    size="sm"
                >
                    {dayjs(currentPost.createdAt).format('MM.DD.YYYY')}
                </Text>
                <Text>
                    {currentPost.text}
                </Text>
                <SimpleGrid cols={3}>
                    <Button
                        data-cy={`agree-button-${index}`}
                        fullWidth={true}
                        onClick={() => {
                            onVote(currentPost, VoteTypeEnum.Positive)
                        }}
                        sx={(theme) => ({
                            borderColor: currentPost.userVote === VoteTypeEnum.Positive ? theme.colors.blue[4] : '',
                        })}
                        variant="default"
                    >
                        <Text data-cy={`positive-vote-count-${index}`}>
                            {votes.positive.length === 0 ? '' : votes.positive.length}
                        </Text>
                        <Text sx={{ paddingLeft: '5px' }}>
                            Like
                        </Text>
                    </Button>
                    <Button
                        data-cy={`disagree-button-${index}`}
                        fullWidth={true}
                        onClick={() => {
                            onVote(currentPost, VoteTypeEnum.Negative)
                        }}
                        sx={(theme) => ({
                            borderColor: currentPost.userVote === VoteTypeEnum.Negative ? theme.colors.blue[4] : '',
                        })}
                        variant="default"
                    >
                        <Text data-cy={`negative-vote-count-${index}`}>
                            {votes.negative.length === 0 ? '' : votes.negative.length}
                        </Text>
                        <Text sx={{ paddingLeft: '5px' }}>
                            Dislike
                        </Text>
                    </Button>
                    <Link href={`/posts/${value.id}`}>
                        <a>
                            <Button
                                data-cy="next-button"
                                variant="default"
                                sx={{ width: '100%' }}
                            >
                                {value.commentCount === 0 ? '' : value.commentCount} Comment
                            </Button>
                        </a>
                    </Link>
                </SimpleGrid>
            </Stack>
        </Paper>

    )
}
