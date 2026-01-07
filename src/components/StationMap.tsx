import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Station } from '../types/station'

type StationMapProps = {
  stations: Station[]
  selectedStation: Station | null
  onSelect: (id: number) => void
}

const germanyCenter: [number, number] = [51.1657, 10.4515]

const createIcon = (active: boolean) =>
  L.divIcon({
    className: 'station-icon',
    html: `<div class="station-dot${
      active ? ' station-dot--active' : ''
    }"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  })

const MapFocus = ({ station }: { station: Station | null }) => {
  const map = useMap()

  useEffect(() => {
    if (!station) return
    map.flyTo([station.lat, station.lng], 13, { duration: 0.9 })
  }, [map, station])

  return null
}

const StationMap = ({ stations, selectedStation, onSelect }: StationMapProps) => {
  const defaultIcon = useMemo(() => createIcon(false), [])
  const activeIcon = useMemo(() => createIcon(true), [])

  return (
    <section className="map-card">
      <MapContainer
        className="map-card__map"
        center={germanyCenter}
        zoom={6}
        scrollWheelZoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={station.id === selectedStation?.id ? activeIcon : defaultIcon}
            eventHandlers={{
              click: () => onSelect(station.id),
            }}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              <span>{station.city}</span>
            </Popup>
          </Marker>
        ))}
        <MapFocus station={selectedStation} />
      </MapContainer>
      <div className="map-card__legend">
        <span className="legend-dot" />
        Station markers update with your filter.
      </div>
    </section>
  )
}

export default StationMap
