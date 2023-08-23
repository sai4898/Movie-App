import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import PageNotFound from './components/PageNotFound';
import MovieDetails from './components/MovieDetails';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Searchbar />
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/404' element={<PageNotFound />} />
       </Routes>
       
       </BrowserRouter>

    </div>
  );
}

export default App;
