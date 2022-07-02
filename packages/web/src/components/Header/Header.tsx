import {
    ActionIcon,
    Box,
    Group,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core'
import {
    IconMessageCircle2,
    IconMoon,
    IconSun,
} from '@tabler/icons'
import Link from 'next/link'

import { HeaderCreatePost } from './HeaderCreatePost'

export const Header: React.FunctionComponent = () => {
    const theme = useMantineTheme()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <Box
            sx={{
                borderBottom: `1px solid ${theme.colors.gray[3]}`,
                display: 'flex',
                justifyContent: 'space-between',
                padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            }}
        >
            <Link href="/?skip=0">
                <Group
                    spacing="sm"
                    sx={{ cursor: 'pointer' }}
                >
                    <IconMessageCircle2 color={theme.colors.blue[8]} />
                    <Text
                        size="lg"
                        weight="bold"
                    >
                        Blub
                    </Text>
                    <Text
                        color="dimmed"
                        size="sm"
                        sx={{
                            '@media (max-width: 600px)': {
                                display: 'none',
                            },
                        }}
                    >
                        What's on your mind?
                    </Text>
                </Group>
            </Link>
            <Group>
                <HeaderCreatePost />
                <ActionIcon
                    onClick={() => {
                        toggleColorScheme()
                    }}
                    size={30}
                    sx={{
                        height: '36px',
                        width: '36px',
                    }}
                    variant="default"
                >
                    {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                </ActionIcon>
            </Group>
        </Box>
    )
}
