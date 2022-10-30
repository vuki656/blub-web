import ReactGA from 'react-ga'

import type { GAInitializeArgs } from './GoogleAnalytics.types'

export class GoogleAnalytics {
    public static initialize(args: GAInitializeArgs) {
        ReactGA.initialize(args.trackingId)
        ReactGA.set({ page: args.page })
        ReactGA.set({ user_id: args.userId })
    }

    public static trackEvent(name: string, options: { category?: string, label?: string, value?: number }) {
        ReactGA.event({
            action: name,
            category: options.category ?? 'Default',
            label: options.label,
            value: options.value,
        })
    }

    public static trackPageView(url: string): void {
        ReactGA.set({ page: url })
        ReactGA.pageview(url)
    }
}
