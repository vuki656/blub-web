import type { VoteType as PrismaVoteType } from '@prisma/client'
import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'
import { VoteType } from '../../Vote'
import { VoteTypeEnum } from '../../Vote/enums'

@ObjectType()
export class VotesType {
    @Field(() => [VoteType])
    public positive: VoteType[]

    @Field(() => [VoteType])
    public negative: VoteType[]
}

@ObjectType({ implements: BaseType })
export class PostType extends BaseType {
    @Field(() => String)
    public text: string

    @Field(() => Date)
    public createdAt: Date

    @Field(() => VotesType)
    public votes: VotesType

    @Field(() => VoteTypeEnum, { nullable: true })
    public userVote: PrismaVoteType | null
}
