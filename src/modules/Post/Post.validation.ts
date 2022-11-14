import { z } from 'zod'

const MIN_CONTENT_LENGTH = 4
const MAX_CONTENT_LENGTH = 10_000

export const commentValidation = z.object({
    content: z
        .string()
        .min(MIN_CONTENT_LENGTH, `Has to be more than ${MIN_CONTENT_LENGTH} characters`)
        .max(MAX_CONTENT_LENGTH, `Can't be longer than ${MAX_CONTENT_LENGTH} characters`),
})
