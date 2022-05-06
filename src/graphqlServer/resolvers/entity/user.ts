import { UserResolvers } from 'types/generated/serverGraphql'

export const User: UserResolvers = {
  name: parent => `${parent.id} name`,
  createdAt: () => new Date(),
}
