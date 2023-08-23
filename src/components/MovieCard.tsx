
import React from 'react';
import { Link } from 'react-router-dom';
interface MovieCardProps {
  title: string;
  imageUrl: string;
  overview: string;
  id:any
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl, overview , id}) => {
  return (
    <div className="card">
       <a href={`/movie/${id}`} className='card-link'>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title text-dark">Movie : {title}</h5>
        <p className="card-text">{overview}</p>
      </div>
      </a>
    </div>
  );
};

export default MovieCard;
