import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Center,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { event } from 'nextjs-google-analytics'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { SocialShare } from '../../components'
import {
    GetPostsDocument,
    useCreatePostMutation,
} from '../../graphql/types.generated'
import { extractFormFieldErrors } from '../../utils'

import type { ContestFormType } from './Contest.types'
import { contestValidation } from './Contest.validation'

export const Contest = () => {
    const router = useRouter()

    const [isSocialShareOpen, setIsSocialShareOpen] = useDisclosure(false)

    const {
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<ContestFormType>({
        defaultValues: {
            email: '',
            text: '',
        },
        resolver: zodResolver(contestValidation),
    })

    const [createPostMutation, { data, loading }] = useCreatePostMutation({
        onCompleted: () => {
            event('create_contest_post', { category: 'engagement' })

            reset()

            setIsSocialShareOpen.open()
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

    const onSubmit = (formValue: ContestFormType) => {
        void createPostMutation({
            variables: {
                input: {
                    email: formValue.email,
                    text: formValue.text,
                },
            },
        })
    }

    return (
        <>
            <Center
                p={30}
                sx={{ width: '100%' }}
            >
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
                        position: 'relative',
                    })}
                >
                    <Title order={1}>
                        Contest
                    </Title>
                    <Text>
                        Every two weeks we reward the most popular post (likes + dislikes) with
                        {' '}
                        <strong>
                            100$
                        </strong>
                        .
                    </Text>
                    <Text>
                        All you have to do is create a post by entering your story and
                        your email so we can contact you if you win and that's it.
                    </Text>
                    <Text sx={{ fontWeight: 'bold' }}>
                        Your email will only be used to contact you if you win
                        {' '}
                        and
                        {' '}
                        <u>
                            will never be made public.
                        </u>
                    </Text>
                    <Textarea
                        {...register('text')}
                        {...extractFormFieldErrors(formState.errors.text)}
                        autosize={true}
                        label="Text"
                        minRows={10}
                        placeholder="What's on your mind?"
                        required={true}
                    />
                    <TextInput
                        {...register('email')}
                        {...extractFormFieldErrors(formState.errors.email)}
                        label="Email"
                        placeholder="Your email so we can contact you if you win"
                        withAsterisk={true}
                    />
                    <Button
                        loading={loading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </Stack>
            </Center>
            <SocialShare
                dialogTitle="Share with your friends to get more reactions"
                id={data?.createPost.post.id}
                isOpen={isSocialShareOpen}
                linkTitle={data?.createPost.post.text ?? 'Blub post'}
                onClose={setIsSocialShareOpen.close}
            />
        </>
    )
}
