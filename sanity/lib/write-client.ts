import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'

export const writeCLient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
  // Set to false if statically generating pages, using ISR or tag-based revalidation
})

if(!writeCLient.config().token) {
    throw new Error('Missing SANITY_WRITE_TOKEN')
}
