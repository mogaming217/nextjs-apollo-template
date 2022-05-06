import { DefaultSeo as DS } from 'next-seo'
import { FC } from 'react'

export const DefaultSeo: FC = () => {
  const serviceName = 'Next.js Apollo Sample'
  return <DS title={serviceName} />
}
