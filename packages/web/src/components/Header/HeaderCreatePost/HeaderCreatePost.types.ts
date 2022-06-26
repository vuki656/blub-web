import type { z } from 'zod'

import type { postValidation } from './HeaderCreatePost.validation'

export type PostFormType = z.infer<typeof postValidation>
