import type { Station } from '../types/station'

const API_URL =
  'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw'

const toNumber = (value: unknown) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number.parseFloat(value)
  return Number.NaN
}

export const fetchStations = async (
  signal?: AbortSignal,
): Promise<Station[]> => {
  const response = await fetch(API_URL, { signal })
  if (!response.ok) {
    throw new Error(`Failed to load stations (${response.status})`)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error('Invalid stations payload')
  }

  return data
    .map((item) => {
      if (typeof item !== 'object' || item === null) {
        return null
      }
      const record = item as Record<string, unknown>
      const lat = toNumber(record.lat)
      const lng = toNumber(record.lng)
      const id = Number(record.id)

      if (
        Number.isNaN(lat) ||
        Number.isNaN(lng) ||
        Number.isNaN(id) ||
        typeof record.name !== 'string' ||
        typeof record.city !== 'string'
      ) {
        return null
      }

      return {
        id,
        name: record.name,
        city: record.city,
        lat,
        lng,
      } satisfies Station
    })
    .filter((station): station is Station => station !== null)
}
