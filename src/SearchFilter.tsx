import './SearchFilter.css'

function SearchFilter({ onSetFilter }) {
  return (
    <input
      type="text"
      className="search-filter"
      onInput={e => onSetFilter(e.target.value)}
      placeholder="filter collections"
    />
  );
}

export default SearchFilter;
