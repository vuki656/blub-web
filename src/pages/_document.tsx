import { createGetInitialProps } from '@mantine/next'
import Document, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
    static getInitialProps = getInitialProps

    render() {
        return (
            <Html>
                <Head>
                    <link
                        crossOrigin="anonymous"
                        href="https://fonts.gstatic.com"
                        rel="preconnect"
                    />
                    <link
                        crossOrigin="anonymous"
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="/apple-touch-icon.png"
                        rel="apple-touch-icon"
                        sizes="180x180"
                    />
                    <link
                        href="/favicon-32x32.png"
                        rel="icon"
                        sizes="32x32"
                        type="image/png"
                    />
                    <link
                        href="/favicon-16x16.png"
                        rel="icon"
                        sizes="16x16"
                        type="image/png"
                    />
                    <link
                        href="/site.webmanifest"
                        rel="manifest"
                    />
                    <link
                        color="#5bbad5"
                        href="/safari-pinned-tab.svg"
                        rel="mask-icon"
                    />
                    <meta
                        content="#ffffff"
                        name="theme-color"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
