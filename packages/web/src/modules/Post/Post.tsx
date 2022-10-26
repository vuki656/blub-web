import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
} from '@mantine/core'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

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
    GoogleAnalytics,
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

    const { data, refetch } = useGetPostQuery({
        variables: {
            args: {
                id: query.postId,
            },
        },
    })

    const [createCommentMutation, { loading }] = useCreateCommentMutation({
        onCompleted: () => {
            reset()

            void refetch()

            GoogleAnalytics.trackEvent(
                'vote',
                {
                    category: 'engagement',
                    label: 'comment',
                }
            )
        },
    })

    const [createVoteMutation] = useCreateVoteMutation({
        onCompleted: (response) => {
            void refetch()

            GoogleAnalytics.trackEvent(
                'vote',
                {
                    category: 'engagement',
                    label: response.createVote?.vote.type.toString(),
                }
            )
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

    const positiveVotes = data?.post.votes.filter((vote) => {
        return vote.type === VoteTypeEnum.Positive
    })

    const negativeVotes = data?.post.votes.filter((vote) => {
        return vote.type === VoteTypeEnum.Negative
    })

    return (
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
            <Link href="/">
                <a>
                    <Button
                        fullWidth={false}
                        variant="default"
                    >
                        Back
                    </Button>
                </a>
            </Link>
            <Paper
                p="md"
                shadow="xs"
            >
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
                        loading={loading}
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
    )
}
