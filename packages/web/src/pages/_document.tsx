import { createGetInitialProps } from '@mantine/next'
import getConfig from 'next/config'
import Document, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'
import Script from 'next/script'

const getInitialProps = createGetInitialProps()

const { publicRuntimeConfig } = getConfig()

export default class _Document extends Document {
    static getInitialProps = getInitialProps

    render() {
        return (
            <Html>
                <Head>
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
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.GA_TRACKING_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = (window.dataLayer || []);

                                function gtag() {
                                    dataLayer.push(arguments);
                                }

                                gtag('js', new Date());

                                gtag('config', '${publicRuntimeConfig.GA_TRACKING_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                        id="gtag-init"
                        strategy="afterInteractive"
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
