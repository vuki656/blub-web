import { AppShell } from '@mantine/core'

import { Header } from '../Header'

import type { RootProps } from './Root.types'

export const Root: React.FunctionComponent<RootProps> = (props) => {
    const { children } = props

    return (
        <AppShell
            header={<Header />}
            padding="md"
            styles={(theme) => ({
                body: {
                    height: '100%',
                },
                main: {
                    display: 'flex',
                    main: {
                        backgroundColor: theme.colorScheme === 'dark'
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                    },
                    overflow: 'hidden',
                    padding: 0,
                    zIndex: 1,
                },
                root: {
                    height: '100%',
                },
            })}
        >
            {children}
        </AppShell>
    )
}
