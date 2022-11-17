import React from 'react';
import MovieList from '../components/MovieList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setMovie }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [movies, setMovies] = useState([]);

    // RETRIEVE the list of movies
    const loadMovies = async () => {
        const response = await fetch('/movies');
        const movies = await response.json();
        setMovies(movies);
    } 
    

    // UPDATE a movie
    const onEditMovie = async movie => {
        setMovie(movie);
        history.push("/edit-movie");
    }


    // DELETE a movie  
    const onDeleteMovie = async _id => {
        const response = await fetch(`/movies/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/movies');
            const movies = await getResponse.json();
            setMovies(movies);
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the movies
    useEffect(() => {
        loadMovies();
    }, []);

    // DISPLAY the movies
    return (
        <>
            <article>
                <h2>List of Movies</h2>
                <p>Paragraph about this page.</p>
                <MovieList 
                    movies={movies} 
                    onEdit={onEditMovie} 
                    onDelete={onDeleteMovie} 
                />
            </article>
        </>
    );
}

export default HomePage;