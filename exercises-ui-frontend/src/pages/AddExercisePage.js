import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch("/exercises", {
            method: "post",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <h2>Add an Exercise</h2>
                <p>Add a weight, bodyweight, or cardio exercise below.</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <fieldset>
                        <label for="name" class="name-flex">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            required
                        />

                        <label for="reps" class="reps-flex">
                            Reps
                        </label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="Reps"
                            onChange={(e) => setReps(e.target.value)}
                            id="reps"
                            required
                            default="1"
                            min="1"
                        />

                        <label for="weight" class="weight-flex">
                            Weight/Time
                        </label>
                        <input
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                            required
                            default="1"
                            min="1"
                        />

                        <label for="unit" class="unit-flex">
                            Unit
                        </label>
                        <select
                            type="text"
                            placeholder="Unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            id="unit"
                            required
                        >
                            <option value="lb" selected>
                                lb
                            </option>
                            <option value="kg">kg</option>
                            <option value="min">min</option>
                            <option value="km">km</option>
                            <option value="mi">mi</option>
                            <option value="count">count</option>
                        </select>

                        <label for="date" class="date-flex">
                            Date
                        </label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date" required />

                        <label for="submit">
                            <button type="submit" onClick={addExercise} id="submit">
                                Add
                            </button>
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
};

export default AddExercisePage;
