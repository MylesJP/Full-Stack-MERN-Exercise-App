import "dotenv/config";
import express from "express";
import * as movies from "./movies-model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
app.post("/movies", (req, res) => {
    movies
        .createMovie(req.body.title, req.body.year, req.body.language)
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error: "Creation of a document failed due to invalid syntax." });
        });
});

// RETRIEVE controller ****************************************************
// GET movies by ID
app.get("/movies/:_id", (req, res) => {
    const movieId = req.params._id;
    movies
        .findMovieById(movieId)
        .then((movie) => {
            if (movie !== null) {
                res.json(movie);
            } else {
                res.status(404).json({ Error: "Document not found" });
            }
        })
        .catch((error) => {
            res.status(400).json({ Error: "Request to retrieve document failed" });
        });
});

// GET movies filtered by year or language
app.get("/movies", (req, res) => {
    let filter = {};
    // filter by year
    if (req.query.year !== undefined) {
        filter = { year: req.query.year };
    }
    // filter by language
    if (req.query.language !== undefined) {
        filter = { language: req.query.language };
    }
    movies
        .findMovies(filter, "", 0)
        .then((movies) => {
            res.send(movies);
        })
        .catch((error) => {
            console.error(error);
            res.send({ Error: "Request to retrieve documents failed" });
        });
});

// DELETE Controller ******************************
app.delete("/movies/:_id", (req, res) => {
    movies
        .deleteById(req.params._id)
        .then((deletedCount) => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Document not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request to delete a document failed" });
        });
});

// UPDATE controller ************************************
app.put("/movies/:_id", (req, res) => {
    movies
        .replaceMovie(req.params._id, req.body.title, req.body.year, req.body.language)

        .then((numUpdated) => {
            if (numUpdated === 1) {
                res.json({
                    _id: req.params._id,
                    title: req.body.title,
                    year: req.body.year,
                    language: req.body.language,
                });
            } else {
                res.status(404).json({ Error: "Document not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ Error: "Request to update a document failed" });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
