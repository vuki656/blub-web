import { zodResolver } from '@hookform/resolvers/zod'
import {
    ActionIcon,
    Button,
    Center,
    Checkbox,
    CopyButton,
    Group,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
    Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
    IconBrandInstagram,
    IconBrandTiktok,
    IconCheck,
    IconCopy,
} from '@tabler/icons'
import Link from 'next/link'
import { event } from 'nextjs-google-analytics'
import * as React from 'react'
import {
    Controller,
    useForm,
} from 'react-hook-form'
import { v4 } from 'uuid'

import { SocialShare } from '../../components'
import { useCreatePostMutation } from '../../graphql/types.generated'
import { extractFormFieldErrors } from '../../utils'

import type { ContestFormType } from './Contest.types'
import { contestValidation } from './Contest.validation'

export const Contest = () => {
    const [isSocialShareOpen, setIsSocialShareOpen] = useDisclosure(false)

    const {
        control,
        formState,
        handleSubmit,
        register,
        reset,
    } = useForm<ContestFormType>({
        defaultValues: {
            contestId: v4(),
            copyContestIdConfirmation: false,
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
    })

    const onSubmit = (formValue: ContestFormType) => {
        void createPostMutation({
            variables: {
                input: {
                    contestId: formValue.contestId,
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
                        save the contest ID.
                    </Text>
                    <Text>
                        We post the winner on Instagram and TikTok.
                        {' '}
                        <br />
                        {' '}
                        Follow us:
                    </Text>
                    <Group>
                        <Link href="https://www.tiktok.com/@blubtalk">
                            <IconBrandTiktok />
                        </Link>
                        <Link href="https://www.instagram.com/blubtalk/">
                            <IconBrandInstagram />
                        </Link>
                    </Group>
                    <Textarea
                        {...register('text')}
                        {...extractFormFieldErrors(formState.errors.text)}
                        autosize={true}
                        label="Text"
                        minRows={10}
                        placeholder="What's on your mind?"
                        required={true}
                    />
                    <Controller
                        control={control}
                        name="contestId"
                        render={({ field }) => {
                            return (
                                <TextInput
                                    label="Contest ID"
                                    readOnly={true}
                                    rightSection={(
                                        <CopyButton
                                            timeout={2000}
                                            value={field.value}
                                        >
                                            {({ copied, copy }) => (
                                                <Tooltip
                                                    label={copied ? 'Copied' : 'Copy'}
                                                    position="right"
                                                    withArrow={true}
                                                >
                                                    <ActionIcon
                                                        color={copied ? 'teal' : 'gray'}
                                                        onClick={copy}
                                                    >
                                                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                    )}
                                    value={field.value}
                                />
                            )
                        }}
                    />
                    <Checkbox
                        {...register('copyContestIdConfirmation')}
                        {...extractFormFieldErrors(formState.errors.copyContestIdConfirmation)}
                        label="I have saved/screenshotted the contest ID"
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
