import { z } from 'zod'

const MIN_TEXT_LENGTH = 4
const MAX_TEXT_LENGTH = 15_000

export const postValidation = z.object({
    text: z
        .string()
        .min(MIN_TEXT_LENGTH, `Has to be more than ${MIN_TEXT_LENGTH} characters`)
        .max(MAX_TEXT_LENGTH, 'Can\'t be longer than 15 000 characters'),
})
