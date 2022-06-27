import type { VoteType as PrismaVoteType } from '@prisma/client'
import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'
import { VoteTypeEnum } from '../enums'

@ObjectType({ implements: BaseType })
export class VoteType extends BaseType {
    @Field(() => String)
    public userId: string

    @Field(() => VoteTypeEnum)
    public type: PrismaVoteType
}