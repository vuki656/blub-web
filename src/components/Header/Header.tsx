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

import { CreatePost } from '../CreatePost'

export const Header = () => {
    const theme = useMantineTheme()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <Box
            sx={{
                borderBottom: `1px solid ${colorScheme === 'light' ? theme.colors.gray[3] : theme.colors.gray[8]}`,
                display: 'flex',
                justifyContent: 'space-between',
                padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            }}
        >
            <Group spacing="sm">
                <IconMessageCircle2 color={theme.colors.blue[8]} />
                <Text
                    color={colorScheme === 'light' ? theme.black : theme.white}
                    component={Link}
                    href="/?skip=0"
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
            <Group>
                <CreatePost />
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
