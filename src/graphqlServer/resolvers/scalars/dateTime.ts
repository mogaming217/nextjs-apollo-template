import { GraphQLScalarType } from 'graphql'

export class DateTimeType extends GraphQLScalarType {
  constructor() {
    super({
      name: 'DateTime',
      description: 'ISO8601 formatted string(ex: `2014-10-10T13:50:40+09:00`)',
      serialize(value: Date) {
        return value.toISOString()
      },
      parseValue(value) {
        return new Date(value) // Convert incoming string to Date
      },
    })
  }
}
