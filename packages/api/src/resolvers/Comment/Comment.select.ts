import type { Prisma } from '@prisma/client'

const makeCommentSelect = <TSelect extends Prisma.CommentSelect>(
    select: Prisma.Subset<TSelect, Prisma.CommentSelect>,
): TSelect => {
    return select
}

export const POST_DEFAULT_SELECT = () => {
    return makeCommentSelect({
        createdAt: true,
        id: true,
        content: true,
    })
}
