// Example: GenreFilter component
import React from 'react';

type GenreFilterProps = {
  genres: string[];
  selected: string[];
  onChange: (genres: string[]) => void;
};

const GenreFilter = ({ genres, selected, onChange }: GenreFilterProps) => (
  <div className="flex flex-wrap gap-2">
    {genres.map(genre => (
      <button
        key={genre}
        className={`btn btn-sm ${selected.includes(genre) ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => {
          if (selected.includes(genre)) {
            onChange(selected.filter(g => g !== genre));
          } else {
            onChange([...selected, genre]);
          }
        }}
        aria-pressed={selected.includes(genre)}
      >
        {genre}
      </button>
    ))}
  </div>
);

export default GenreFilter;
