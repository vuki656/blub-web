import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import { getCookie } from 'cookies-next'
import dayjs from 'dayjs'
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
import { COOKIE_NAME } from '../../../utils'

import type { HomePostProps } from './HomePost.types'

export const HomePost: React.FunctionComponent<HomePostProps> = (props) => {
    const { value } = props

    const [currentPost, setCurrentPost] = useState(value)

    const userId = getCookie(COOKIE_NAME)

    const [createVoteMutation] = useCreateVoteMutation()

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
            const vote = {
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
                    {dayjs(currentPost.createdAt).format('HH:MM DD.MM.YYYY')}
                </Text>
                <Text>
                    {currentPost.text}
                </Text>
                <SimpleGrid cols={2}>
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            onVote(currentPost, VoteTypeEnum.Positive)
                        }}
                        sx={(theme) => ({
                            borderColor: currentPost.userVote === VoteTypeEnum.Positive ? theme.colors.blue[4] : '',
                        })}
                        variant="default"
                    >
                        {`${currentPost.votes.positive.length === 0 ? '' : currentPost.votes.positive.length} Agree`}
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={() => {
                            onVote(currentPost, VoteTypeEnum.Negative)
                        }}
                        sx={(theme) => ({
                            borderColor: currentPost.userVote === VoteTypeEnum.Negative ? theme.colors.blue[4] : '',
                        })}
                        variant="default"
                    >
                        {`${currentPost.votes.negative.length === 0 ? '' : currentPost.votes.negative.length} Disagree`}
                    </Button>
                </SimpleGrid>
            </Stack>
        </Paper>

    )
}
