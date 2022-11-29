import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditExercisePage = ({ exercise }) => {
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.toLocaleString("en-US").slice(0, 10));

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
            alert("Edit successful.");
        } else {
            const errMessage = await response.json();
            alert(`Update failed. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <h2>Edit an Exercise</h2>
                <p>Edit the selected exercise below.</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <fieldset>
                        <label for="title">Name</label>
                        <input
                            type="text"
                            placeholder={name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                        />

                        <label for="reps">Reps</label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="Reps"
                            onChange={(e) => setReps(e.target.value)}
                            id="reps"
                            min="1"
                        />

                        <label for="weight">Weight/Time</label>
                        <input
                            type="number"
                            placeholder="Reps"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                            min="1"
                        />

                        <label for="unit">Unit</label>
                        <select
                            type="text"
                            placeholder="Unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            id="unit"
                        >
                            <option value="" selected></option>
                            <option value="lb">lb</option>
                            <option value="kg">kg</option>
                            <option value="min">min</option>
                            <option value="km">km</option>
                            <option value="mi">mi</option>
                            <option value="count">count</option>
                        </select>

                        <label for="date">Date</label>
                        <input
                            type="text"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            id="date"
                        />

                        <label for="submit">
                            <button onClick={editExercise} id="submit">
                                Save
                            </button>{" "}
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
};
export default EditExercisePage;
