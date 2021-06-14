export const makeArrayWritable = <T>(array: readonly T[]): T[] => {
  return array as T[]
}

export function splitArray<T>(array: T[], size: number) {
  const list: T[][] = []
  let i = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const sliced = array.slice(i * size, size * (i + 1))
    if (sliced.length > 0) {
      list.push(sliced)
      i++
    } else {
      break
    }
  }
  return list
}
