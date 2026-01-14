import './FilterButtons.css';

function FilterButtons({ activeFilter, onFilterChange, showDeleted = true }) {
  const base = ['All', 'Active', 'Inactive'];
  const filters = showDeleted ? [...base, 'Deleted'] : base;

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;



