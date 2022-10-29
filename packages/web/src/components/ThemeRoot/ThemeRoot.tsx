import type { ColorScheme } from '@mantine/core'
import {
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { setCookie } from 'cookies-next'
import { useState } from 'react'

import { COOKIE_COLORSCHEME_NAME } from '../../utils'

import type { ThemeRootProps } from './ThemeRoot.types'

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

        setCookie(COOKIE_COLORSCHEME_NAME, nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
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
