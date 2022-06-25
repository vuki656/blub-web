import {
    Field,
    ObjectType,
} from 'type-graphql'

import { BaseType } from '../../../shared/typegraphql-types'

@ObjectType({ implements: BaseType })
export class PostType extends BaseType {
    @Field(() => String)
    public text: string

    @Field(() => Date)
    public createdAt: Date
}
