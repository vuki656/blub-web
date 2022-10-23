import { gql } from 'apollo-server'

import { VOTE_PAYLOAD } from './Vote.gql'

export const VOTES_PAYLOAD = gql`
    fragment VotesPayload on VotesType {
        positive {
            ...VotePayload
        }
        negative {
            ...VotePayload
        }
    }
    ${VOTE_PAYLOAD}
`
