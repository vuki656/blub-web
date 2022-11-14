import {
    ActionIcon,
    Group,
    Input,
    Modal,
    Stack,
} from '@mantine/core'
import {
    IconCopy,
    IconLink,
} from '@tabler/icons'
import {
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'next-share'
import { event } from 'nextjs-google-analytics'

import type { SocialShareProps } from './SocialShare.types'

const DOMAIN = 'https://blubtalk.com/posts/'
const HASHTAG = '#blub #confess #whatsonyourmind'

export const SocialShare = (props: SocialShareProps) => {
    const {
        dialogTitle,
        id,
        isOpen,
        linkTitle: title,
        onClose,
    } = props

    const onGoogleAnalyticsTrack = (label: string) => {
        return () => {
            event('share', {
                category: 'engagement',
                label,
            })
        }
    }

    const onCopy = () => {
        void navigator.clipboard.writeText(DOMAIN + id)

        onGoogleAnalyticsTrack('URL Copy')
    }

    return (
        <Modal
            centered={true}
            onClose={onClose}
            opened={isOpen}
            title={dialogTitle ?? 'Share'}
        >
            <Stack>
                <Group spacing={10}>
                    <WhatsappShareButton
                        onClick={onGoogleAnalyticsTrack('WhatsApp')}
                        title={title}
                        url={DOMAIN + id}
                    >
                        <WhatsappIcon
                            round={true}
                            size={32}
                        />
                    </WhatsappShareButton>
                    <TwitterShareButton
                        onClick={onGoogleAnalyticsTrack('Twitter')}
                        title={title}
                        url={DOMAIN + id}
                    >
                        <TwitterIcon
                            round={true}
                            size={32}
                        />
                    </TwitterShareButton>
                    <RedditShareButton
                        onClick={onGoogleAnalyticsTrack('Reddit')}
                        title={title}
                        url={DOMAIN + id}
                    >
                        <RedditIcon
                            round={true}
                            size={32}
                        />
                    </RedditShareButton>
                    <TelegramShareButton
                        onClick={onGoogleAnalyticsTrack('Telegram')}
                        title={title}
                        url={DOMAIN + id}
                    >
                        <TelegramIcon
                            round={true}
                            size={32}
                        />
                    </TelegramShareButton>
                    <FacebookShareButton
                        hashtag={HASHTAG}
                        onClick={onGoogleAnalyticsTrack('Facebook')}
                        quote={title}
                        url={DOMAIN + id}
                    >
                        <FacebookIcon
                            round={true}
                            size={32}
                        />
                    </FacebookShareButton>
                </Group>
                <Input
                    disabled={true}
                    icon={<IconLink size={16} />}
                    rightSection={(
                        <ActionIcon
                            color="blue"
                            variant="default"
                        >
                            <IconCopy
                                onClick={onCopy}
                                size={18}
                            />
                        </ActionIcon>
                    )}
                    value={DOMAIN + id}
                />
            </Stack>
        </Modal>
    )
}
