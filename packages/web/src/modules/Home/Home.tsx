import {
    Button,
    Paper,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core'
import dayjs from 'dayjs'

import { useGetPostsQuery } from '../../graphql/types.generated'

export const Home: React.FunctionComponent = () => {
    const { data } = useGetPostsQuery()

    return (
        <Stack
            sx={(theme) => ({
                '@media (max-width: 600px)': {
                    padding: theme.spacing.sm,
                },
                '@media (min-width: 601px) and (max-width: 850px)': {
                    padding: `${theme.spacing.sm}px 15%`
                },
                '@media (min-width: 851px) and (max-width: 1250px)': {
                    padding: `${theme.spacing.sm}px 20%`
                },
                '@media (min-width: 1251px) and (max-width: 2000px)': {
                    padding: `${theme.spacing.sm}px 30%`
                },
                '@media (min-width: 2001px)': {
                    padding: `${theme.spacing.sm}px 35%`
                },
                flex: 1,
                overflow: 'auto',
            })}
        >
            {data?.posts.map((post) => {
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
                                {dayjs(post.createdAt).format('HH:MM DD.MM.YYYY')}
                            </Text>
                            <Text>
                                {post.text}
                            </Text>
                            <SimpleGrid cols={2}>
                                <Button
                                    fullWidth={true}
                                    variant="default"
                                >
                                    Agree
                                </Button>
                                <Button
                                    fullWidth={true}
                                    variant="default"
                                >
                                    Disagree
                                </Button>
                            </SimpleGrid>
                        </Stack>
                    </Paper>
                )
            })}
        </Stack>
    )
}
