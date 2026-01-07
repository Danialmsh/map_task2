import { useEffect, useState } from 'react'
import { fetchStations } from '../services/stations'
import type { Station } from '../types/station'

type Status = 'idle' | 'loading' | 'success' | 'error'

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadStations = async () => {
      setStatus('loading')
      setError(null)
      try {
        const result = await fetchStations(controller.signal)
        setStations(result)
        setStatus('success')
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Unknown error')
        setStatus('error')
      }
    }

    loadStations()

    return () => controller.abort()
  }, [])

  return { stations, status, error }
}
