import { singleton } from "tsyringe";
import { orm } from "../../shared/orm";
import { CreateCommentInput } from "./inputs/CreateComment.input";
import { CreateCommentPayload } from "./payloads";

@singleton()
export class PostService {
    public async createOne(input: CreateCommentInput): Promise<CreateCommentPayload> {
        const comment = await orm.comment.create({
            data: {
                content: input.content,
                post: {
                    connect: {
                        id: input.postId,
                    }
                }
            }
        })

        return {
            comment,
        }
    }

}
