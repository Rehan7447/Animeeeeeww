// Example: FavoriteButton component
import React from 'react';

const FavoriteButton = ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => (
  <button
    className={`btn ${isFavorite ? 'btn-secondary' : 'btn-outline'}`}
    onClick={onClick}
    aria-pressed={isFavorite}
  >
    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
  </button>
);

export default FavoriteButton;
