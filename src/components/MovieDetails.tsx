
import React, { useEffect ,useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useSelector} from 'react-redux';
import {  fetchPopularMovies } from '../Redux/movieSlice'; 
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ListGroup from 'react-bootstrap/ListGroup';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { Card } from 'react-bootstrap';
import LoadingSkeleton from './LoadingSkeleton';
import axios from 'axios';

interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
}
function MovieDetail() {
  const { id } = useParams<{ id: any; }>(); 
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [cast, setCast] = useState<CastMember[]>([]);
  const movie = useSelector((state: RootState) => state.movies.popular.find((m: { id: number; }) => m.id === +id));
// console.log(movie,'2')
const TMDB_API_KEY =  '2c8b8adce87c3a752033b91ed38b38a9';


  useEffect(() => {
    const timer = setTimeout(() => {
    dispatch(fetchPopularMovies()); 
    setIsLoading(false); 
  }, 1000);
  return () => clearTimeout(timer);
  }, [dispatch, id]);


  useEffect(() => {
    if (movie) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
        )
        .then((response) => {
          setCast(response.data.cast);
        })
        .catch((error) => {
          console.error('Error fetching cast:', error);
        });
    }
  }, [id, movie]);
console.log(cast,'00')
  if (isLoading) {
    return <LoadingSkeleton />
  }
  if (!movie) {
    return <div>No data available.</div>;
  }

  const handleGoBack = (e: any) => {
    e.preventDefault();
    history(-1); 
  };

  return (
<>
<div onClick={handleGoBack} className='go-back'>
        <AiOutlineArrowLeft size={23} title='Back'/>
     </div>
    <Card style={{ width: '25rem' }}>
    <Card.Img   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    <Card.Body>
      <Card.Title>Title:{movie.title}</Card.Title>
      
    </Card.Body>
    <ListGroup className="list-group-flush">
    <ListGroup.Item><h4>Overview: </h4>{movie.overview}</ListGroup.Item>
      <ListGroup.Item>Release Date: {movie.release_date}</ListGroup.Item>
      <ListGroup.Item>Rating: {movie.vote_average}</ListGroup.Item>
      <ListGroup.Item>Vote Count: {movie.vote_count}</ListGroup.Item>
    </ListGroup>
        </Card>
   
  <h3>Cast</h3>
<div className="d-flex flex-wrap">
  {cast.map((member) => (
    <div key={member.id} className="cast-member card m-2 p-2">
      {member.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
          alt={member.name}
          className="card-img-top"
        />
      )}
      <div className="card-body">
        <p className="card-text">{member.name}</p>
      </div>
    </div>
  ))}
</div>
</>
  );
}

export default MovieDetail;
