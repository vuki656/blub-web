import { container } from 'tsyringe'
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import type { ContextType } from '../../shared/typescript-types'

import { PostsArgs } from './args'
import { CreatePostInput } from './inputs'
import { CreatePostPayload } from './payloads'
import { PostService } from './Post.service'
import {
    PostsType,
    PostType,
} from './types'

@Resolver(() => PostType)
export class PostResolver {
    private service = container.resolve(PostService)

    @Query(() => PostsType)
    public async posts(
        @Ctx() context: ContextType,
        @Arg('args', () => PostsArgs) args: PostsArgs,
    ): Promise<PostsType> {
        return this.service.findAll(args, context.userId)
    }

    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Arg('input', () => CreatePostInput) input: CreatePostInput,
        @Ctx() context: ContextType,
    ): Promise<CreatePostPayload> {
        return this.service.createOne(input, context.userId)
    }
}
