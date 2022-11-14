import { z } from 'zod'

const MIN_TEXT_LENGTH = 4
const MAX_TEXT_LENGTH = 15_000

const MIN_EMAIL_LENGTH = 4
const MAX_EMAIL_LENGTH = 100

export const contestValidation = z.object({
    email: z
        .string()
        .min(MIN_EMAIL_LENGTH, `Has to be more than ${MIN_EMAIL_LENGTH} characters`)
        .max(MAX_EMAIL_LENGTH, `Can't be longer than ${MAX_EMAIL_LENGTH} characters`)
        .refine((email) => {
            if (email.length > 0 && !email.includes('@')) {
                return false
            }

            return true
        }, { message: 'Must be a valid email.' })
        .optional(),
    text: z
        .string()
        .min(MIN_TEXT_LENGTH, `Has to be more than ${MIN_TEXT_LENGTH} characters`)
        .max(MAX_TEXT_LENGTH, `Can't be longer than ${MAX_TEXT_LENGTH} characters`),
})
