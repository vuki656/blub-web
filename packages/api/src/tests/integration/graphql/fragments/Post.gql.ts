import { gql } from 'apollo-server'

import { VOTES_PAYLOAD } from './Votes.gql'

export const POST_PAYLOAD = gql`
    fragment PostPayload on PostType {
        id
        text
        createdAt
        votes {
            ...VotesPayload
        }
        userVote
    }
    ${VOTES_PAYLOAD}
`
