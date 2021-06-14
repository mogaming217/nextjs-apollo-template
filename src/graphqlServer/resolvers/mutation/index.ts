import { MutationResolvers } from 'types/generated/serverGraphql'

export const mutationResolvers: MutationResolvers = {
  saveUser: (_, args, context) => ({ id: context.userID ?? 'none', name: args.name }),
}
