import { container } from 'tsyringe'
import {
    Arg,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'

import { CreatePostInput } from './inputs'
import { CreatePostPayload } from './payloads'
import { PostService } from './Post.service'
import { PostType } from './types'

@Resolver(() => PostType)
export class PostResolver {
    private service = container.resolve(PostService)

    @Query(() => [PostType])
    public async posts(): Promise<PostType[]> {
        return this.service.findAll()
    }

    @Mutation(() => CreatePostPayload)
    public async createPost(
        @Arg('input', () => CreatePostInput) input: CreatePostInput,
    ): Promise<CreatePostPayload> {
        return this.service.createOne(input)
    }
}
