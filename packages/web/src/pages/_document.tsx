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
                    {/* <Script */}
                    {/*     dangerouslySetInnerHTML={{ */}
                    {/*         __html: ` */}
                    {/*             window.smartlook||(function(d) { */}
                    {/*             var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0]; */}
                    {/*             var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript'; */}
                    {/*             c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c); */}
                    {/*             })(document); */}
                    {/*             smartlook('init', '2d082e293d45cfb54a5bce4c8f0680af60c56404', { region: 'eu' }); */}
                    {/*         `, */}
                    {/*     }} */}
                    {/*     id="smartlook-init" */}
                    {/*     strategy="afterInteractive" */}
                    {/* /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
