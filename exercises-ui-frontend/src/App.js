// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';

// Define the function that renders the content in routes using State.
function App() {

  const [movie, setMovie] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Collection of Movies</h1>
            <p>This app uses MERN.</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setMovie={setMovie} />
            </Route>

            <Route path="/add-movie">
              <AddMoviePage />
            </Route>
            
            <Route path="/edit-movie">
              <EditMoviePage movie={movie} />
            </Route>
          </main>

          <footer>
            <p>Copyright statement</p>
          </footer>

      </Router>
    </>
  );
}

export default App;