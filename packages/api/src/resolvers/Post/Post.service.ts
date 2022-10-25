import { singleton } from 'tsyringe'

import { orm } from '../../shared/orm'
import { VoteTypeEnum } from '../Vote'

import type { PostsArgs } from './args'
import type { CreatePostInput } from './inputs'
import type { CreatePostPayload } from './payloads'
import type { PostsType } from './types'

@singleton()
export class PostService {
    public async createOne(input: CreatePostInput, userId: string): Promise<CreatePostPayload> {
        const createdPost = await orm.post.create({
            data: {
                email: input.email,
                text: input.text,
            },
            select: {
                comments: {
                    select: {
                        id: true,
                    },
                },
                createdAt: true,
                id: true,
                text: true,
                votes: {
                    select: {
                        id: true,
                        type: true,
                        userId: true,
                    },
                },
            },
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
                commentCount: createdPost.comments.length,
                userVote,
                votes,
            },
        }
    }

    public async findAll(args: PostsArgs, userId: string): Promise<PostsType> {
        const posts = await orm.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                comments: {
                    select: {
                        id: true,
                    },
                },
                createdAt: true,
                id: true,
                text: true,
                votes: {
                    select: {
                        id: true,
                        type: true,
                        userId: true,
                    },
                },
            },
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
                commentCount: post.comments.length,
                userVote,
                votes,
            }
        })

        return {
            list,
            total,
        }
    }
}
