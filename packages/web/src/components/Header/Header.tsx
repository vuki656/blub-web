import {
    ActionIcon,
    Group,
    Header as MantineHeader,
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
        <MantineHeader height={60}>
            <Group
                position="apart"
                px={20}
                sx={{ height: '100%' }}
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
            </Group>
        </MantineHeader>
    )
}
