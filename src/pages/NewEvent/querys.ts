
import { gql } from "@apollo/client";


export const GET_USERS = gql`
query getUsers {
  getUsers {
    id
    username
  }
}
`

export const GET_LOCATIONS = gql`
query getLocations {
  getLocations {
    id
    name
  }
}
`

export const ADD_EVENT = gql`
mutation addEvent($title: String!,$desc:String,$date:String,$user_id:ID,$location_id:ID) {
  addEvent(
    data: {
      title: $title
      desc: $desc
      date: $date
      user_id: $user_id
      location_id: $location_id
    }
  ) {
    id
    title
  }
}
`