import { z } from 'zod'

export const postValidation = z.object({
    email: z
        .string()
        .max(100, 'Can\'t be longer than 100 characters')
        .refine((email) => { // eslint-disable-next-line sonarjs/prefer-single-boolean-return
            if (email.length > 0 && !email.includes('@')) {
                return false
            }

            return true
        }, { message: 'Must be a valid email.' })
        .optional(),
    text: z
        .string()
        .min(1, 'Has to be more than 4 characters')
        .max(15_000, 'Can\'t be longer than 15000 characters'),
})
