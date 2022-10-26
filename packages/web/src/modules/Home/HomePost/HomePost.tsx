import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useState } from 'react'

import type { PostType } from '../../../graphql/types.generated'
import {
    useCreateVoteMutation,
    VoteTypeEnum,
} from '../../../graphql/types.generated'
import {
    COOKIE_NAME,
    formatDate,
    GoogleAnalytics,
} from '../../../utils'

import type { HomePostProps } from './HomePost.types'

export const HomePost: React.FunctionComponent<HomePostProps> = (props) => {
    const {
        index,
        value,
    } = props

    const [currentPost, setCurrentPost] = useState(value)

    const userId = getCookie(COOKIE_NAME) as string

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

    const onVote = (post: PostType, voteType: VoteTypeEnum) => {
        if (
            !userId ||
            post.userVote === VoteTypeEnum.Positive ||
            post.userVote === VoteTypeEnum.Negative
        ) {
            return
        }

        void createVoteMutation({
            variables: {
                input: {
                    postId: post.id,
                    type: voteType,
                    userId: userId.toString(),
                },
            },
        })

        setCurrentPost({
            ...post,
            userVote: voteType,
            votes: [
                ...post.votes,
                {
                    id: userId,
                    type: voteType,
                    userId,
                },
            ],
        })
    }

    const positiveVotes = currentPost.votes.filter((vote) => {
        return vote.type === VoteTypeEnum.Positive
    })

    const negativeVotes = currentPost.votes.filter((vote) => {
        return vote.type === VoteTypeEnum.Negative
    })

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
                    {formatDate(currentPost.createdAt)}
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
                            {positiveVotes.length === 0 ? '' : positiveVotes.length}
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
                            {negativeVotes.length === 0 ? '' : negativeVotes.length}
                        </Text>
                        <Text sx={{ paddingLeft: '5px' }}>
                            Dislike
                        </Text>
                    </Button>
                    <Link href={`/posts/${value.id}`}>
                        <a>
                            <Button
                                data-cy="next-button"
                                sx={{ width: '100%' }}
                                variant="default"
                            >
                                {value.comments?.length === 0 ? '' : value.comments?.length}
                                {' '}
                                Comment
                            </Button>
                        </a>
                    </Link>
                </SimpleGrid>
            </Stack>
        </Paper>
    )
}
