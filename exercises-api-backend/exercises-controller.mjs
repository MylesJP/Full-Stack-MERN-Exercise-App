import "dotenv/config";
import express from "express";
import * as exercises from "./exercises-model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
app.post("/exercises", (req, res) => {
    exercises
        .createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then((exercise) => {
            res.status(201).json(exercise);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error: "Failed to add exercise. Ensure all fields are filled out." });
        });
});

// RETRIEVE controller ****************************************************
// GET exercises by ID
app.get("/exercises/:_id", (req, res) => {
    const exerciseId = req.params._id;
    exercises
        .findExerciseById(exerciseId)
        .then((exercise) => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: "Exercise not found" });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ Error: "Request to retrieve exercise failed" });
        });
});

// GET exercises filtered by name
app.get("/exercises", (req, res) => {
    let filter = {};
    exercises
        .findExercises(filter, "", 0)
        .then((exercises) => {
            res.send(exercises);
        })
        .catch((error) => {
            console.error(error);
            res.send({ Error: "Request to retrieve exercises failed" });
        });
});

// DELETE Controller ******************************
app.delete("/exercises/:_id", (req, res) => {
    exercises
        .deleteById(req.params._id)
        .then((deletedCount) => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Exercise not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send({ error: "Request to delete an exercise failed" });
        });
});

// UPDATE controller ************************************
app.put("/exercises/:_id", (req, res) => {
    if (req.body.reps > 0 && req.body.weight > 0) {
        exercises
            .replaceExercise(
                req.params._id,
                req.body.name,
                req.body.reps,
                req.body.weight,
                req.body.unit,
                req.body.date
            )

            .then((numUpdated) => {
                if (numUpdated === 1) {
                    res.json({
                        _id: req.params._id,
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        unit: req.body.unit,
                        date: req.body.date,
                    });
                } else {
                    res.status(404).json({ Error: "Exercise not found." });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(400).json({ Error: "Request to update an exercise failed." });
            });
    } else {
        res.status(400).json({ Error: "Make sure weight and reps are greater than 0." });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
