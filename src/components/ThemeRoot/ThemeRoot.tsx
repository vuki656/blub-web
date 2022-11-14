import type { ColorScheme } from '@mantine/core'
import {
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { setCookie } from 'cookies-next'
import { useState } from 'react'

import { COOKIE_COLORSCHEME_NAME } from '../../utils'

import type { ThemeRootProps } from './ThemeRoot.types'

const THIRTY_DAYS_IN_SECONDS = 2_592_000

export const ThemeRoot = (props: ThemeRootProps) => {
    const {
        children,
        colorScheme,
    } = props

    const [currentColorScheme, setCurrentColorScheme] = useState<ColorScheme>(colorScheme)

    const toggleColorScheme = (newColorScheme?: ColorScheme) => {
        let nextColorScheme = newColorScheme

        if (!nextColorScheme) {
            nextColorScheme = currentColorScheme === 'dark' ? 'light' : 'dark'
        }

        setCurrentColorScheme(nextColorScheme)

        setCookie(COOKIE_COLORSCHEME_NAME, nextColorScheme, { maxAge: THIRTY_DAYS_IN_SECONDS })
    }

    return (
        <ColorSchemeProvider
            colorScheme={currentColorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{
                    colorScheme: currentColorScheme,
                    fontFamily: 'montserrat',
                }}
                withGlobalStyles={true}
                withNormalizeCSS={true}
            >
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    )
}
