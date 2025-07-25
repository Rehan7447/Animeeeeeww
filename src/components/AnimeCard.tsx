// Example: AnimeCard component
import React from 'react';

type AnimeCardProps = {
  title: string;
  imageUrl: string;
  onClick?: () => void;
};

const AnimeCard = ({ title, imageUrl, onClick }: AnimeCardProps) => (
  <div className="rounded shadow hover:shadow-lg transition cursor-pointer" onClick={onClick}>
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t" />
    <div className="p-2 text-center font-semibold">{title}</div>
  </div>
);

export default AnimeCard;
