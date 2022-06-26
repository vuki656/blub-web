import { faker } from '@faker-js/faker'
import { orm } from '../../shared/orm'

const remove = orm.post.deleteMany()

const create = orm.post.createMany({
    data: [...new Array(150)].map(() => {
        return {
            text: faker.lorem.sentences(),
        }
    })
})

export const post = [remove, create]
