import type { z } from 'zod'

import type { commentValidation } from './Post.validation'

export type PostPageQueryVariables = {
    postId: string
}

export type CommentFormType = z.infer<typeof commentValidation>
