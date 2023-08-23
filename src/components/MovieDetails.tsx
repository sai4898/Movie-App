
import React, { useEffect ,useState} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchPopularMovies } from '../Redux/movieSlice'; 
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ListGroup from 'react-bootstrap/ListGroup';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { Card } from 'react-bootstrap';
import LoadingSkeleton from './LoadingSkeleton';



function MovieDetail() {
  const { id } = useParams<{ id: any; }>(); 
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const movie = useSelector((state: RootState) => state.movies.popular.find((m) => m.id === +id));
// console.log(movie,'2')

  useEffect(() => {
    const timer = setTimeout(() => {
    dispatch(fetchPopularMovies()); 
    setIsLoading(false); 
  }, 1000);
  return () => clearTimeout(timer);
  }, [dispatch, id]);

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
</>
  );
}

export default MovieDetail;
