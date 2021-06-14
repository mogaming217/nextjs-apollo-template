import { dataSources } from 'graphqlServer/resolvers/datasources'

export type PartialCustomContext = {
  _ensured?: boolean
  userID?: string
}

export type CustomContext = PartialCustomContext & {
  dataSources: ReturnType<typeof dataSources>
}
