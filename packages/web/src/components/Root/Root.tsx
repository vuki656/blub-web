import {
    Box,
    Stack,
    useMantineTheme,
} from '@mantine/core'

import { Header } from '../Header'

import type { RootProps } from './Root.types'

export const Root: React.FunctionComponent<RootProps> = (props) => {
    const { children } = props

    const theme = useMantineTheme()

    return (
        <Stack
            spacing={0}
            sx={{
                display: 'flex',
                height: '100%',
            }}
        >
            <Header />
            <Box
                sx={{
                    backgroundColor: theme.colorScheme === 'dark'
                        ? theme.colors.dark?.[8]
                        : theme.colors.gray?.[0],
                    display: 'flex',
                    flex: 1,
                    height: '100%',
                    overflowX: 'hidden',
                    width: '100%',
                    zIndex: 1,
                }}
            >
                {children}
            </Box>
        </Stack>
    )
}
