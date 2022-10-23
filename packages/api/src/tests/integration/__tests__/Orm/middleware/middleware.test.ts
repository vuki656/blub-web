import { container } from 'tsyringe'

import { orm } from '../../../../../shared/orm'
import { PostFactory } from '../../../factories'
import { wipeDatabase } from '../../../utils'

describe('Orm middleware', () => {
    let postFactory: PostFactory

    beforeAll(() => {
        postFactory = container.resolve(PostFactory)
    })

    beforeEach(async () => {
        await wipeDatabase()
    })

    afterAll(async () => {
        await wipeDatabase()
    })

    describe('when `delete` is called', () => {
        it('should soft delete the entity', async () => {
            const existingPost = await postFactory.createOne()

            await orm.post.delete({
                where: {
                    id: existingPost.id,
                },
            })

            const foundPost = await orm.post.findFirst({
                where: {
                    id: existingPost.id,
                    isDeleted: true,
                },
            })

            expect(foundPost).not.toBeNull()
        })
    })

    describe('when `findUnique` is called', () => {
        it('should find if the entity is not soft deleted', async () => {
            const existingPost = await postFactory.createOne()

            await orm.post.delete({
                where: {
                    id: existingPost.id,
                },
            })

            const foundPost = await orm.post.findUnique({
                where: {
                    id: existingPost.id,
                },
            })

            expect(foundPost).toBeNull()
        })
    })

    describe('when `findMany` is called', () => {
        it('should find only non soft deleted entities', async () => {
            const POST_COUNT = 10

            const existingPosts = await postFactory.createAmount(POST_COUNT)

            await orm.post.delete({
                where: {
                    id: existingPosts[0]?.id,
                },
            })

            const foundPosts = await orm.post.findMany({
                orderBy: {
                    id: 'asc',
                },
            })

            expect(foundPosts).toHaveLength(POST_COUNT - 1)
        })

        it('should sort the list by ids', async () => {
            await postFactory.createAmount(5)

            const foundPosts = await orm.post.findMany()

            const sortedPosts = [...foundPosts].sort((a, b) => {
                if (a.id > b.id) {
                    return 1
                }

                return -1
            })

            const areSorted = foundPosts.every((post, index) => {
                return post.id === sortedPosts[index]?.id
            })

            expect(areSorted).toBe(true)
        })
    })

    describe('when `count` is called', () => {
        it('should find only count non soft deleted entities', async () => {
            const POST_COUNT = 10

            const existingPosts = await postFactory.createAmount(POST_COUNT)

            await orm.post.delete({
                where: {
                    id: existingPosts[0]?.id,
                },
            })

            const foundPostCount = await orm.post.count()

            expect(foundPostCount).toBe(POST_COUNT - 1)
        })
    })
})
