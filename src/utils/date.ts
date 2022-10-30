import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export const formatDate = (date: Date | Dayjs | string | undefined) => {
    return dayjs(date).format('MM.DD.YYYY')
}
