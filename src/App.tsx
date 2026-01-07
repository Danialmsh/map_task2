import { useMemo, useState, useEffect } from 'react'
import CityFilter from './components/CityFilter'
import StationList from './components/StationList'
import StationMap from './components/StationMap'
import { useStations } from './hooks/useStations'
import type { Station } from './types/station'
import './App.css'

const normalize = (value: string) => value.trim().toLowerCase()

function App() {
  const { stations, status, error } = useStations()
  const [cityFilter, setCityFilter] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const cityOptions = useMemo(() => {
    const unique = new Set(stations.map((station) => station.city))
    return Array.from(unique).sort((a, b) => a.localeCompare(b))
  }, [stations])

  const filteredStations = useMemo(() => {
    const query = normalize(cityFilter)
    if (!query) return stations
    return stations.filter((station) =>
      station.city.toLowerCase().includes(query),
    )
  }, [stations, cityFilter])

  useEffect(() => {
    if (!selectedId) return
    if (!filteredStations.some((station) => station.id === selectedId)) {
      setSelectedId(null)
    }
  }, [filteredStations, selectedId])

  const selectedStation: Station | null = useMemo(() => {
    if (!selectedId) return null
    return filteredStations.find((station) => station.id === selectedId) ?? null
  }, [filteredStations, selectedId])

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <p className="eyebrow">Germany Rail</p>
          <h1>Station Atlas</h1>
          <p className="subtitle">
            Explore major train stations and zoom into the network by city.
          </p>
        </div>
        <div className="stats">
          <div>
            <span>Total stations</span>
            <strong>{stations.length}</strong>
          </div>
          <div>
            <span>Showing</span>
            <strong>{filteredStations.length}</strong>
          </div>
        </div>
      </header>

      <section className="app__controls">
        <CityFilter
          value={cityFilter}
          options={cityOptions}
          onChange={setCityFilter}
          onClear={() => setCityFilter('')}
        />
        <div className="status">
          {status === 'loading' && <span>Loading stations...</span>}
          {status === 'error' && (
            <span role="alert">Error: {error}</span>
          )}
        </div>
      </section>

      <main className="app__main">
        <StationList
          stations={filteredStations}
          selectedId={selectedId}
          status={status}
          onSelect={setSelectedId}
        />
        <StationMap
          stations={filteredStations}
          selectedStation={selectedStation}
          onSelect={setSelectedId}
        />
      </main>
    </div>
  )
}

export default App
