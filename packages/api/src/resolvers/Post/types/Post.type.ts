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
    public negative: VoteType[]

    @Field(() => [VoteType])
    public positive: VoteType[]
}

@ObjectType({ implements: BaseType })
export class PostType extends BaseType {
    @Field(() => Date)
    public createdAt: Date

    @Field(() => String)
    public text: string

    @Field(() => VoteTypeEnum, { nullable: true }) // eslint-disable-next-line type-graphql/invalid-decorated-type
    public userVote: PrismaVoteType | null

    @Field(() => VotesType)
    public votes: VotesType
}
