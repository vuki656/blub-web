import { faker } from '@faker-js/faker'
import { container } from 'tsyringe'

import { orm } from '../../../../shared/orm'
import {
    PostFactory,
    VoteFactory,
} from '../../factories'
import {
    CREATE_POST,
    CREATE_VOTE,
} from '../../graphql/mutations'
import { POSTS } from '../../graphql/queries/Post.gql'
import type {
    CreatePostMutation,
    CreatePostMutationVariables,
    CreateVoteMutation,
    CreateVoteMutationVariables,
    PostsQuery,
    PostsQueryVariables,
} from '../../types/generated'
import { VoteTypeEnum } from '../../types/generated'
import {
    executeOperation,
    wipeDatabase,
} from '../../utils'

describe('Post resolver', () => {
    let postFactory: PostFactory
    let voteFactory: VoteFactory

    beforeAll(() => {
        postFactory = container.resolve(PostFactory)
        voteFactory = container.resolve(VoteFactory)
    })

    beforeEach(async () => {
        await wipeDatabase()
    })

    afterAll(async () => {
        await wipeDatabase()
    })

    describe('when posts query is called', () => {
        it('should return paginated posts', async () => {
            const existingPosts = await postFactory.createAmount(60)

            const [findResponse] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 0,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.posts.list).toHaveLength(50)
            expect(findResponse.data?.posts.total).toBe(existingPosts.length)
        })

        it('should return properly paginated posts', async () => {
            const existingPosts = await postFactory.createAmount(60)

            const [findResponse] = await executeOperation<
                PostsQuery,
                PostsQueryVariables
            >({
                query: POSTS,
                variables: {
                    args: {
                        skip: 50,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.posts.list).toHaveLength(10)
            expect(findResponse.data?.posts.total).toBe(existingPosts.length)
        })
    })

    describe('when createPost mutation is called', () => {
        it('should create a post', async () => {
            const TEXT = faker.lorem.paragraphs()

            const [findResponse] = await executeOperation<
                CreatePostMutation,
                CreatePostMutationVariables
            >({
                query: CREATE_POST,
                variables: {
                    input: {
                        email: faker.internet.email(),
                        text: TEXT,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.createPost.post).toMatchObject({
                text: TEXT,
            })
        })
    })

    describe('when createVote mutation is called', () => {
        it('should create a vote', async () => {
            const USER_ID = faker.datatype.uuid()

            const existingPost = await postFactory.createOne()

            const [findResponse] = await executeOperation<
                CreateVoteMutation,
                CreateVoteMutationVariables
            >({
                query: CREATE_VOTE,
                variables: {
                    input: {
                        postId: existingPost.id,
                        type: VoteTypeEnum.Positive,
                        userId: USER_ID,
                    },
                },
            })

            const post = await orm.post.findFirst({
                select: {
                    votes: {
                        select: {
                            type: true,
                            userId: true,
                        },
                    },
                },
                where: {
                    id: existingPost.id,
                },
            })

            expect(findResponse.errors).toBeUndefined()

            expect(post?.votes[0]).toMatchObject({
                type: VoteTypeEnum.Positive,
                userId: USER_ID,
            })

            expect(findResponse.data?.createVote?.vote).toMatchObject({
                type: VoteTypeEnum.Positive,
                userId: USER_ID,
            })
        })

        it('should return null if user already voted on a post', async () => {
            const USER_ID = faker.datatype.uuid()

            const existingVote = await voteFactory.createOne({
                value: {
                    userId: USER_ID,
                },
            })

            const post = await orm.post.findFirstOrThrow({
                where: {
                    votes: {
                        some: {
                            id: existingVote.id,
                        },
                    },
                },
            })

            const [findResponse] = await executeOperation<
                CreateVoteMutation,
                CreateVoteMutationVariables
            >({
                query: CREATE_VOTE,
                variables: {
                    input: {
                        postId: post.id,
                        type: VoteTypeEnum.Positive,
                        userId: USER_ID,
                    },
                },
            })

            expect(findResponse.errors).toBeUndefined()
            expect(findResponse.data?.createVote).toBeNull()
        })
    })
})
