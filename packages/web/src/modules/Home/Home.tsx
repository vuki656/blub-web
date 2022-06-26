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
            style={{
                overflow: 'auto',
                paddingLeft: '30%',
                paddingRight: '30%',
                paddingTop: '10px',
            }}
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
                                <Button fullWidth={true} variant='default'>
                                    Disagree
                                </Button>
                                <Button fullWidth={true} variant='default'>
                                    Agree
                                </Button>
                            </SimpleGrid>
                        </Stack>
                    </Paper>
                )
            })}
        </Stack>
    )
}
