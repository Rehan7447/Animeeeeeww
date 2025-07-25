// Example: SearchBar component
import React from 'react';

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
};

const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => (
  <form
    className="flex gap-2"
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search anime..."
      className="input input-bordered flex-1"
      aria-label="Search anime"
    />
    <button type="submit" className="btn btn-primary">Search</button>
  </form>
);

export default SearchBar;
