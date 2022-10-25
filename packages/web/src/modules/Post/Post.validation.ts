import { z } from 'zod'

export const commentValidation = z.object({
    content: z
        .string()
        .min(4, 'Has to be more than 4 characters')
        .max(10_000, 'Can\'t be longer than 10 000 characters'),
})
