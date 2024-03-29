import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    LoadingOverlay,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShare } from '@tabler/icons'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { event } from 'nextjs-google-analytics'
import { useForm } from 'react-hook-form'

import { SocialShare } from '../../components'
import {
    useCreateCommentMutation,
    useCreateVoteMutation,
    useGetPostQuery,
    VoteTypeEnum,
} from '../../graphql/types.generated'
import {
    COOKIE_NAME,
    extractFormFieldErrors,
    formatDate,
} from '../../utils'

import type {
    CommentFormType,
    PostPageQueryVariables,
} from './Post.types'
import { commentValidation } from './Post.validation'

export const Post = () => {
    const router = useRouter()

    const query = router.query as PostPageQueryVariables

    const userId = getCookie(COOKIE_NAME)

    const [isSocialShareOpen, setIsSocialShareOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<CommentFormType>({
        defaultValues: {
            content: '',
        },
        resolver: zodResolver(commentValidation),
    })

    const { data, loading: getPostLoading, refetch } = useGetPostQuery({
        variables: {
            args: {
                id: query.postId,
            },
        },
    })

    const post = data?.post

    const [createCommentMutation, { loading: createCommentLoading }] = useCreateCommentMutation({
        onCompleted: () => {
            reset()

            void refetch()

            event('comment', {
                category: 'engagement',
                label: 'comment',
            })
        },
    })

    const [createVoteMutation] = useCreateVoteMutation({
        onCompleted: (response) => {
            void refetch()

            event('vote', {
                category: 'engagement',
                label: response.createVote?.vote.type.toString(),
            })
        },
    })

    const onVote = (type: VoteTypeEnum) => {
        return () => {
            if (!userId || !post?.id || post.userVote) {
                return
            }

            void createVoteMutation({
                variables: {
                    input: {
                        postId: post.id,
                        type,
                    },
                },
            })
        }
    }

    const onSubmit = (formValues: CommentFormType) => {
        if (!post) {
            return
        }

        void createCommentMutation({
            variables: {
                input: {
                    content: formValues.content,
                    postId: post.id,
                },
            },
        })
    }

    const positiveVotes = post?.votes.filter((vote) => {
        return vote.type === VoteTypeEnum.Positive
    })

    const negativeVotes = post?.votes.filter((vote) => {
        return vote.type === VoteTypeEnum.Negative
    })

    return (
        <>
            <Stack
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
                })}
            >
                <Button
                    component={Link}
                    fullWidth={false}
                    href="/"
                    variant="default"
                >
                    Back
                </Button>
                <Paper
                    p="md"
                    shadow="xs"
                    sx={{ position: 'relative' }}
                >
                    <LoadingOverlay visible={getPostLoading} />
                    <Stack>
                        <Text
                            color="dimmed"
                            size="sm"
                        >
                            {formatDate(post?.createdAt)}
                        </Text>
                        <Text>
                            {post?.text}
                        </Text>
                        <SimpleGrid
                            breakpoints={[
                                { cols: 3, maxWidth: 1000, spacing: 'md' },
                                { cols: 2, maxWidth: 650, spacing: 'sm' },
                            ]}
                            cols={3}
                        >
                            <Button
                                fullWidth={true}
                                onClick={onVote(VoteTypeEnum.Positive)}
                                sx={(theme) => ({
                                    borderColor: post?.userVote === VoteTypeEnum.Positive ? theme.colors.blue[4] : '',
                                })}
                                variant="default"
                            >
                                <Text>
                                    {positiveVotes?.length === 0 ? '' : positiveVotes?.length}
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
                                    {negativeVotes?.length === 0 ? '' : negativeVotes?.length}
                                </Text>
                                <Text sx={{ paddingLeft: '5px' }}>
                                    Dislike
                                </Text>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Paper
                        p="md"
                        shadow="xs"
                        sx={(theme) => ({
                            alignItems: 'flex-end',
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: theme.spacing.md,
                        })}
                    >
                        <Textarea
                            {...register('content')}
                            {...extractFormFieldErrors(formState.errors.content)}
                            autosize={true}
                            label="Comment"
                            minRows={5}
                            placeholder="What's on your mind?"
                            required={true}
                            sx={{ width: '100%' }}
                        />
                        <Button
                            fullWidth={false}
                            loading={createCommentLoading}
                            type="submit"
                        >
                            Post
                        </Button>
                    </Paper>
                </form>
                <Stack>
                    {post?.comments?.map((comment) => {
                        return (
                            <Paper
                                key={comment.id}
                                p="md"
                                shadow="xs"
                            >
                                <Stack spacing={10}>
                                    <Text
                                        color="dimmed"
                                        size="sm"
                                    >
                                        {formatDate(comment.createdAt)}
                                    </Text>
                                    <Text>
                                        {comment.content}
                                    </Text>
                                </Stack>
                            </Paper>
                        )
                    })}
                </Stack>
            </Stack>
            <SocialShare
                id={post?.id ?? ''}
                isOpen={isSocialShareOpen}
                linkTitle={post?.text ?? ''}
                onClose={setIsSocialShareOpen.close}
            />
        </>
    )
}
