import {
    Field,
    InputType,
} from 'type-graphql'

@InputType()
export class CreatePostInput {
    @Field(() => String)
    public text: string
}
