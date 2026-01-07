type CityFilterProps = {
  value: string
  options: string[]
  onChange: (value: string) => void
  onClear: () => void
}

const CityFilter = ({ value, options, onChange, onClear }: CityFilterProps) => {
  return (
    <div className="filter">
      <label htmlFor="city-input">Filter by city</label>
      <div className="filter__input">
        <input
          id="city-input"
          name="city"
          type="text"
          placeholder="Start typing a city..."
          list="city-options"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {value && (
          <button type="button" className="ghost" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <datalist id="city-options">
        {options.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
    </div>
  )
}

export default CityFilter
