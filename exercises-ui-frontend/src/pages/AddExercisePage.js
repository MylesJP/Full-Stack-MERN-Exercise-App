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
                <h2>Add to the collection</h2>
                <p>Paragraph about this page.</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <fieldset>
                        <legend>Which exercise are you adding?</legend>
                        <label for="title">Exercise name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            required
                        />

                        <label for="reps">Number of reps</label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="Reps"
                            onChange={(e) => setReps(e.target.value)}
                            id="reps"
                            required
                        />

                        <label for="weight">Weight</label>
                        <input
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                            required
                        />

                        <label for="unit">Unit</label>
                        <input
                            type="text"
                            placeholder="Unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            id="unit"
                            required
                        />

                        <label for="date">Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date" required />

                        <label for="submit">
                            <button type="submit" onClick={addExercise} id="submit">
                                Add
                            </button>{" "}
                            to the collection
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
};

export default AddExercisePage;
