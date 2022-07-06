import type { z } from 'zod'

import type { postValidation } from './CreatePost.validation'

export type PostFormType = z.infer<typeof postValidation>
