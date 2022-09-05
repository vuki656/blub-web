import { zodResolver } from '@hookform/resolvers/zod'
import {
    Alert,
    Button,
    Modal,
    Notification,
    SimpleGrid,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core'
import {
    IconInfoCircle,
    IconPencil,
} from '@tabler/icons'
import {
    getCookie,
    setCookie,
} from 'cookies-next'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import {
    GetPostsDocument,
    useCreatePostMutation,
} from '../../graphql/types.generated'
import {
    COOKIE_POST_DATE,
    extractFormFieldErrors,
    GoogleAnalytics,
    useBoolean,
} from '../../utils'

import type { PostFormType } from './CreatePost.types'
import { postValidation } from './CreatePost.validation'

export const CreatePost: React.FunctionComponent = () => {
    const router = useRouter()

    const [isOpen, openActions] = useBoolean()

    const postDate = getCookie(COOKIE_POST_DATE)?.toString()
    const isBlocked = dayjs().isBefore(postDate)

    const [createPostMutation, { loading }] = useCreatePostMutation({
        onCompleted: () => {
            openActions.setFalse()

            setCookie(
                COOKIE_POST_DATE,
                dayjs().endOf('day')
                    .toISOString(),
                { maxAge: 86_400 }
            )

            GoogleAnalytics.trackEvent('create_post', { category: 'engagement' })
        },
        refetchQueries: [{
            query: GetPostsDocument,
            variables: {
                args: {
                    skip: Number(router.query.skip),
                },
            },
        }],
    })

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<PostFormType>({
        defaultValues: {
            email: '',
            text: '',
        },
        resolver: zodResolver(postValidation),
    })

    const onSubmit = async (formValue: PostFormType) => {
        await createPostMutation({
            variables: {
                input: {
                    text: formValue.text,
                },
            },
        })

        reset()
    }

    const onCancel = () => {
        openActions.setFalse()

        reset()
    }

    return (
        <>
            <Button
                data-cy="post-button"
                leftIcon={<IconPencil />}
                onClick={openActions.setTrue}
                variant="light"
            >
                Post
            </Button>
            <Modal
                centered={true}
                onClose={openActions.setFalse}
                opened={isOpen}
                size="lg"
                title="Make a post"
            >
                <Stack>
                    {isBlocked ? (
                        <Notification
                            data-cy="already-posted-notification"
                            disallowClose={true}
                            sx={{
                                border: 'none',
                                boxShadow: 'none',
                            }}
                            title="Hey, you already posted today."
                        >
                            Come back tomorrow to post again.
                        </Notification>
                    ) : null}
                    <Textarea
                        {...register('text')}
                        {...extractFormFieldErrors(formState.errors.text)}
                        data-cy="text-input-field"
                        autosize={true}
                        label="Text"
                        minRows={10}
                        placeholder="What's on your mind"
                        required={true}
                    />
                    <TextInput
                        {...register('email')}
                        {...extractFormFieldErrors(formState.errors.email)}
                        data-cy="email-input-field"
                        description="Not required. Used to contact you regarding the giveaway."
                        label="Email"
                        placeholder="Your email address"
                    />
                    <Alert
                        color="yellow"
                        icon={<IconInfoCircle size={16} />}
                        title="Giveaway Details"
                    >
                        Every two weeks we reward the post with the most reactions with 100$.
                        The winner is contacted by email if they leave it.
                        If that person didn't leave an email,
                        the next post with an email will be picked.
                    </Alert>
                    <SimpleGrid cols={2}>
                        <Button
                            onClick={onCancel}
                            variant="default"
                            data-cy="cancel-submit-post-button"
                        >
                            Cancel
                        </Button>
                        <Button
                            data-cy="submit-post-button"
                            disabled={isBlocked}
                            loading={loading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Post
                        </Button>
                    </SimpleGrid>
                </Stack>
            </Modal>
        </>
    )
}
