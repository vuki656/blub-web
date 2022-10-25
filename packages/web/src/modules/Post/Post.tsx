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
import dayjs from 'dayjs'
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
        fetchPolicy: 'network-only', // TODO: check if it can be done without this
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

            // TODO: update cache stead of refetch
            refetch()
        }
    }

    // TODO: wrap form in <form> to comply
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
                    placeholder="What's on your mind"
                    required={true}
                    sx={{ width: '100%' }}
                />
                <Button
                    fullWidth={false}
                    loading={loading}
                    onClick={handleSubmit(onSubmit)}
                >
                    Post
                </Button>
            </Paper>
        </Stack>
    )
}
