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
                <Group spacing="sm">
                    <IconMessageCircle2 color={theme.colors.blue[8]} />
                    <Text
                        size="lg"
                        weight="bold"
                    >
                        Blub
                    </Text>
                </Group>
                <ActionIcon
                    onClick={() => {
                        toggleColorScheme()
                    }}
                    size={30}
                    variant="default"
                >
                    {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
                </ActionIcon>
            </Group>
        </MantineHeader>
    )
}
