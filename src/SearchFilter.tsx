import { ChangeEvent } from 'react'
import './SearchFilter.css'

function SearchFilter({ onSetFilter }: {
  onSetFilter: (e: string) => void,
}) {
  return (
    <input
      type="text"
      className="search-filter"
      onInput={(e: ChangeEvent<HTMLInputElement>) => onSetFilter(e.target.value)}
      placeholder="filter collections"
    />
  );
}

export default SearchFilter;
