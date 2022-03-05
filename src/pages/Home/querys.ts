
import { gql } from "@apollo/client";

const EventFragment = gql`
fragment EventFragment on Event{
  id
      title
      desc
      date
      participant {
        user {
          username
        }
      }
}
`

export const EVENTS = gql`
  query getEvents {
    getEvents {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export const EVENT_SUBS = gql`
  subscription getEvents {
    eventCreated {
      ...EventFragment
    }
  }
  ${EventFragment}
`;