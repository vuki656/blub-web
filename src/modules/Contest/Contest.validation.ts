import { z } from 'zod'

const MIN_TEXT_LENGTH = 4
const MAX_TEXT_LENGTH = 15_000

export const contestValidation = z.object({
    contestId: z.string(),
    copyContestIdConfirmation: z
        .boolean()
        .refine((value) => { // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
            return value === true
        }, { message: 'You must confirm that you have saved/screenshotted the contest ID' }),
    text: z
        .string()
        .min(MIN_TEXT_LENGTH, `Has to be more than ${MIN_TEXT_LENGTH} characters`)
        .max(MAX_TEXT_LENGTH, `Can't be longer than ${MAX_TEXT_LENGTH} characters`),
})
