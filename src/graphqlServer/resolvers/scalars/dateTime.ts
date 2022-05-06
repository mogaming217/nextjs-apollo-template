import { GraphQLScalarType } from 'graphql'

export class DateTimeType extends GraphQLScalarType<Date, string> {
  constructor() {
    super({
      name: 'DateTime',
      description: 'ISO8601 formatted string(ex: `2014-10-10T13:50:40+09:00`)',
      serialize(value) {
        if (value instanceof Date) return value.toISOString()
        throw new Error(`incompatible type(${typeof value}) returned in serialize of DateTime`)
      },
      parseValue(value) {
        if (typeof value !== 'string') throw new Error(`incompatible type (${typeof value}) in parse of DateTime`)
        return new Date(value) // Convert incoming string to Date
      },
    })
  }
}
