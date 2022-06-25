import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'

import type { CreatePostInput } from './inputs'
import type { CreatePostPayload } from './payloads'
import { POST_DEFAULT_SELECT } from './Post.select'
import type { PostType } from './types'

@singleton()
export class PostService {
    public async findAll(): Promise<PostType[]> {
        return orm.post.findMany({
            select: POST_DEFAULT_SELECT(),
            where: {
                isDeleted: false,
            },
        })
    }

    public async createOne(input: CreatePostInput): Promise<CreatePostPayload> {
        const createdPost = await orm.post.create({
            data: {
                text: input.text,
            },
            select: POST_DEFAULT_SELECT(),
        })

        return {
            post: createdPost,
        }
    }
}
