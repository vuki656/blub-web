import { Stack } from '@mantine/core'

import { useGetPostsQuery } from '../../graphql/types.generated'

import { HomePost } from './HomePost'

export const Home: React.FunctionComponent = () => {
    const { data } = useGetPostsQuery({
        ssr: false,
    })

    return (
        <Stack
            sx={(theme) => ({
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
                },
                flex: 1,
                overflow: 'auto',
            })}
        >
            {data?.posts.map((post) => {
                return (
                    <HomePost
                        key={post.id}
                        value={post}
                    />
                )
            })}
        </Stack>
    )
}
