import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    SimpleGrid,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import {
    GetPostsDocument,
    useCreatePostMutation,
} from '../../../graphql/types.generated'
import {
    extractFormFieldErrors,
    useBoolean,
} from '../../../utils'

import type { PostFormType } from './HeaderCreatePost.types'
import { postValidation } from './HeaderCreatePost.validation'

export const HeaderCreatePost: React.FunctionComponent = () => {
    const router = useRouter()

    const [isOpen, openActions] = useBoolean()

    const [createPostMutation, { loading }] = useCreatePostMutation({
        onCompleted: () => {
            openActions.setFalse()
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
                    email: formValue.email,
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
                    <Textarea
                        {...register('text')}
                        {...extractFormFieldErrors(formState.errors.text)}
                        autosize={true}
                        label="Text"
                        minRows={10}
                        placeholder="What's on your mind"
                        required={true}
                    />
                    <TextInput
                        {...register('email')}
                        {...extractFormFieldErrors(formState.errors.email)}
                        description="Used to contact you regarding the giveaway. Not required."
                        label="Email"
                        placeholder="Your email address"
                    />
                    <SimpleGrid cols={2}>
                        <Button
                            onClick={onCancel}
                            variant="default"
                        >
                            Cancel
                        </Button>
                        <Button
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
