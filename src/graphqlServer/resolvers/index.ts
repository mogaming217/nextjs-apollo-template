import { Resolvers } from 'types/generated/serverGraphql'
import { User } from './entity/user'
import { mutationResolvers } from './mutation'
import { queryResolvers } from './query'
import { DateTimeType } from './scalars/dateTime'

export const resolvers: Resolvers = {
  DateTime: new DateTimeType(),
  Query: queryResolvers,
  Mutation: mutationResolvers,

  // Entity

  User,
}
