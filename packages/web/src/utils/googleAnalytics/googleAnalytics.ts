import getConfig from 'next/config'

export class GoogleAnalytics {
    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
    public static trackPageView(url: string): void {
        const { publicRuntimeConfig } = getConfig()

        window.gtag?.('config', publicRuntimeConfig.GA_TRACKING_ID, {
            page_path: url,
        })
    }

    // https://developers.google.com/analytics/devguides/collection/gtagjs/events
    public static trackEvent(name: string, options: { category?: string, label?: string, value?: number }) {
        window.gtag?.('event', name, {
            event_category: options.category,
            event_label: options.label,
            value: options.value,
        })
    }

    // https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id?hl=en#set_user_id
    public static trackUser(userId: string | undefined) {
        window?.gtag('set', { user_id: userId })
    }
}

