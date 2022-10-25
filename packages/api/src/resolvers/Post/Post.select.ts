import type { Prisma } from '@prisma/client'

import { VOTE_DEFAULT_SELECT } from '../Vote'

const makePostSelect = <TSelect extends Prisma.PostSelect>(
    select: Prisma.Subset<TSelect, Prisma.PostSelect>,
): TSelect => {
    return select
}

// TODO: what with this
export const POST_DEFAULT_SELECT = () => {
    return makePostSelect({
        createdAt: true,
        id: true,
        text: true,
        votes: {
            select: VOTE_DEFAULT_SELECT(),
            where: {
                isDeleted: false,
            },
        },
    })
}
