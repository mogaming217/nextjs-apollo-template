import { ApolloError } from 'apollo-server-micro'

export class ConditionError extends ApolloError {
  constructor(message: string) {
    super(message, 'INVALID_CONDITION')

    Object.defineProperty(this, 'name', { value: 'ConditionError' })
  }
}
