import type { Station } from '../types/station'

type StationListProps = {
  stations: Station[]
  selectedId: number | null
  status: 'idle' | 'loading' | 'success' | 'error'
  onSelect: (id: number) => void
}

const StationList = ({
  stations,
  selectedId,
  status,
  onSelect,
}: StationListProps) => {
  return (
    <section className="panel">
      <header className="panel__header">
        <h2>Stations</h2>
        <span className="panel__count">{stations.length}</span>
      </header>
      <div className="panel__body">
        {status === 'loading' && <p className="panel__message">Loading...</p>}
        {status === 'error' && (
          <p className="panel__message">Unable to load stations.</p>
        )}
        {status === 'success' && stations.length === 0 && (
          <p className="panel__message">No stations match this filter.</p>
        )}
        <ul className="station-list">
          {stations.map((station) => (
            <li key={station.id}>
              <button
                type="button"
                className={
                  station.id === selectedId
                    ? 'station-card station-card--active'
                    : 'station-card'
                }
                onClick={() => onSelect(station.id)}
              >
                <div>
                  <strong>{station.name}</strong>
                  <span>{station.city}</span>
                </div>
                <span className="station-card__cta">View</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default StationList
