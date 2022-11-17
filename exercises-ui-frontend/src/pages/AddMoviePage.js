import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddMoviePage = () => {

    const [title, setTitle]       = useState('');
    const [year, setYear]         = useState('');
    const [language, setLanguage] = useState('');
    
    const history = useHistory();

    const addMovie = async () => {
        const newMovie = { title, year, language };
        const response = await fetch('/movies', {
            method: 'post',
            body: JSON.stringify(newMovie),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the movie!");
        } else {
            alert(`Failed to add movie, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add to the collection</h2>
            <p>Paragraph about this page.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which movie are you adding?</legend>
                    <label for="title">Movie title</label>
                    <input
                        type="text"
                        placeholder="Title of the movie"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        id="title" />
                    
                    <label for="year">Year released</label>
                    <input
                        type="number"
                        value={year}
                        placeholder="Year of the movie"
                        onChange={e => setYear(e.target.value)} 
                        id="year" />

                    <label for="language">Language</label>
                    <input
                        type="text"
                        placeholder="Primary language of the movie"
                        value={language}
                        onChange={e => setLanguage(e.target.value)} 
                        id="language" />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addMovie}
                        id="submit"
                    >Add</button> to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddMoviePage;