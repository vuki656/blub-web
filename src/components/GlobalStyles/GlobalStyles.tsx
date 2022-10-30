import { Global } from '@mantine/core'

export const GlobalStyles = () => {
    return (
        <Global
            styles={{
                '#__next': {
                    height: '100%',
                    width: '100%',
                },
                '@font-face': {
                    fontDisplay: 'fallback',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: 400,
                },
                a: {
                    textDecoration: 'none',
                },
                body: {
                    margin: '0px',
                },
                html: {
                    boxSize: 'border-box',
                    fontSize: '16px',
                },
                'html, body': {
                    fontFamily: 'Montserrat',
                    height: '100%',
                },
                p: {
                    margin: 0,
                },
            }}
        />
    )
}
