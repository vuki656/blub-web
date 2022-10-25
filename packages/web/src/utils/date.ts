import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | Date | string | undefined) => {
    return dayjs(date).format('MM.DD.YYYY')
}
