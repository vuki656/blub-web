import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Notification,
    SimpleGrid,
    Stack,
    Textarea,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import {
    getCookie,
    setCookies,
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

            setCookies(
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
                        autosize={true}
                        label="Text"
                        minRows={10}
                        placeholder="What's on your mind"
                        required={true}
                    />
                    <SimpleGrid cols={2}>
                        <Button
                            onClick={onCancel}
                            variant="default"
                        >
                            Cancel
                        </Button>
                        <Button
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
