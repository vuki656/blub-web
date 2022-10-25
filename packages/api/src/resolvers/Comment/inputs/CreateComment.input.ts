import {
    Field,
    ID,
    InputType,
} from 'type-graphql'

@InputType()
export class CreateCommentInput {
    @Field(() => ID)
    public postId: string

    @Field(() => String)
    public content: string
}
