import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import { VoteTypeEnum } from '../Vote'

import type { PostsArgs } from './args'
import type { CreatePostInput } from './inputs'
import type { CreatePostPayload } from './payloads'
import { POST_DEFAULT_SELECT } from './Post.select'
import type { PostsType } from './types'

@singleton()
export class PostService {
    public async findAll(args: PostsArgs, userId: string): Promise<PostsType> {
        const posts = await orm.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: POST_DEFAULT_SELECT(),
            skip: args.skip,
            take: 50,
            where: {
                isDeleted: false,
            },
        })

        const total = await orm.post.count({
            where: {
                isDeleted: false,
            },
        })

        const list = posts.map((post) => {
            const userVote = post.votes.find((vote) => {
                return vote.userId === userId
            })?.type ?? null

            const votes = {
                negative: post.votes.filter((vote) => {
                    return vote.type === VoteTypeEnum.NEGATIVE
                }),
                positive: post.votes.filter((vote) => {
                    return vote.type === VoteTypeEnum.POSITIVE
                }),
            }

            return {
                ...post,
                userVote,
                votes,
            }
        })

        return {
            list,
            total,
        }
    }

    public async createOne(input: CreatePostInput, userId: string): Promise<CreatePostPayload> {
        const createdPost = await orm.post.create({
            data: {
                text: input.text,
            },
            select: POST_DEFAULT_SELECT(),
        })

        const userVote = createdPost.votes.find((vote) => {
            return vote.userId === userId
        })?.type ?? null

        const votes = {
            negative: createdPost.votes.filter((vote) => {
                return vote.type === VoteTypeEnum.NEGATIVE
            }),
            positive: createdPost.votes.filter((vote) => {
                return vote.type === VoteTypeEnum.POSITIVE
            }),
        }

        return {
            post: {
                ...createdPost,
                userVote,
                votes,
            },
        }
    }
}
