import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

import { VoteTypeEnum } from '../enums'

@InputType()
export class CreateVoteInput {
    @Field(() => String)
    public userId: string

    @Field(() => ID)
    public postId: string

    @Field(() => VoteTypeEnum)
    public type: VoteTypeEnum
}
