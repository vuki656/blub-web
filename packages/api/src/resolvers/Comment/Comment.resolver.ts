import { container } from 'tsyringe'
import {
    Arg,
    Mutation,
    Resolver,
} from 'type-graphql'

import { PostService } from './Comment.service'
import { CreateCommentInput } from './inputs'
import { CreateCommentPayload } from './payloads'
import { CommentType } from './types'

@Resolver(() => CommentType)
export class CommentResolver {
    private service = container.resolve(PostService)

    @Mutation(() => CreateCommentPayload)
    public async createPost(
        @Arg('input', () => CreateCommentInput) input: CreateCommentInput,
    ): Promise<CreateCommentPayload> {
        return this.service.createOne(input)
    }
}
