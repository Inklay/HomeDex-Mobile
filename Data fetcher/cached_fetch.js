import { fetchBuilder, FileSystemCache } from 'node-fetch-cache'

let fetchCache

export async function getFetch (URL) {
  if (fetchCache === undefined) {
    const weekTimeMS = 7 * 24 * 60 * 60 * 1000
    fetchCache = fetchBuilder.withCache(new FileSystemCache({ cacheDirectory: './cache', ttl: weekTimeMS }))
  }
  return await fetchCache(URL)
}
