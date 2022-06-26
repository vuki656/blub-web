import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import { orm } from '../../shared/orm'

const remove = orm.post.deleteMany()

const create = orm.post.createMany({
    data: [...new Array(130)].map(() => {
        return {
            createdAt: faker.date.between(
                dayjs()
                    .subtract(90, 'days')
                    .toDate(),
                dayjs().toDate()
            ),
            text: faker.lorem.sentences(),
        }
    }),
})

export const post = [remove, create]
