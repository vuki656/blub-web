import { z } from 'zod'

export const postValidation = z.object({
    text: z
        .string()
        .min(1, 'Has to be more than 4 characters')
        .max(15_000, 'Can\'t be longer than 15000 characters'),
})
