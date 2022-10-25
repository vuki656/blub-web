import { z } from "zod"
import { commentValidation } from "./Post.validation"

export type PostPageQueryVariables = {
    postId: string
}

export type CommentFormType = z.infer<typeof commentValidation>
