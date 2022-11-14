import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShare } from '@tabler/icons'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { event } from 'nextjs-google-analytics'
import { useState } from 'react'

import { SocialShare } from '../../../components'
import type { PostType } from '../../../graphql/types.generated'
import {
    useCreateVoteMutation,
    VoteTypeEnum,
} from '../../../graphql/types.generated'
import {
    COOKIE_NAME,
    formatDate,
} from '../../../utils'

import type { HomePostProps } from './HomePost.types'

export const HomePost = (props: HomePostProps) => {
    const { value } = props

    const [currentPost, setCurrentPost] = useState(value)
    const [isSocialShareOpen, setIsSocialShareOpen] = useDisclosure(false)

    const userId = getCookie(COOKIE_NAME) as string

    const [createVoteMutation] = useCreateVoteMutation({
        onCompleted: (response) => {
            event('vote', {
                category: 'engagement',
                label: response.createVote?.vote.type.toString(),
            })
        },
    })

    const onVote = (post: PostType, voteType: VoteTypeEnum) => {
        if (!userId || post.userVote) {
            return
        }

        void createVoteMutation({
            variables: {
                input: {
                    postId: post.id,
                    type: voteType,
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
        <>
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
                    <SimpleGrid
                        breakpoints={[
                            { cols: 4, maxWidth: 1000, spacing: 'md' },
                            { cols: 2, maxWidth: 950, spacing: 'sm' },
                        ]}
                        cols={4}
                    >
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
                            <Text>
                                {positiveVotes.length === 0 ? '' : positiveVotes.length}
                            </Text>
                            <Text sx={{ paddingLeft: '5px' }}>
                                Like
                            </Text>
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
                            <Text>
                                {negativeVotes.length === 0 ? '' : negativeVotes.length}
                            </Text>
                            <Text sx={{ paddingLeft: '5px' }}>
                                Dislike
                            </Text>
                        </Button>
                        <Button
                            component={Link}
                            href={`/posts/${value.id}`}
                            sx={{ width: '100%' }}
                            variant="default"
                        >
                            {value.comments?.length === 0 ? '' : value.comments?.length}
                            {' '}
                            Comment
                        </Button>
                        <Button
                            onClick={setIsSocialShareOpen.open}
                            variant="default"
                        >
                            <IconShare size={20} />
                        </Button>
                    </SimpleGrid>
                </Stack>
            </Paper>
            <SocialShare
                id={value.id}
                isOpen={isSocialShareOpen}
                linkTitle={value.text}
                onClose={setIsSocialShareOpen.close}
            />
        </>
    )
}
