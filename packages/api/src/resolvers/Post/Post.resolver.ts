import { container } from 'tsyringe'
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import type { ContextType } from '../../shared/typescript-types'

import { CreatePostInput } from './inputs'
import { CreatePostPayload } from './payloads'
import { PostService } from './Post.service'
import { PostType } from './types'

@Resolver(() => PostType)
export class PostResolver {
    private service = container.resolve(PostService)

    @Query(() => [PostType])
    public async posts(
        @Ctx() context: ContextType,
    ): Promise<PostType[]> {
        return this.service.findAll(context.userId)
    }

    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Arg('input', () => CreatePostInput) input: CreatePostInput,
        @Ctx() context: ContextType,
    ): Promise<CreatePostPayload> {
        return this.service.createOne(input, context.userId)
    }
}
