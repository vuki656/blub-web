import type { z } from 'zod'

import type { contestValidation } from './Contest.validation'

export type ContestFormType = z.infer<typeof contestValidation>
