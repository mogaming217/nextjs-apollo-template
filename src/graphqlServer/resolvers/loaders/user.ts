import DataLoader from 'dataloader'
import { User } from 'types/generated/serverGraphql'

export const userLoader = new DataLoader<string, User>(
  async userIDs => {
    return Promise.resolve(userIDs.map(id => ({ id, name: `${id} name` })))
  },
  { cache: false }
)
