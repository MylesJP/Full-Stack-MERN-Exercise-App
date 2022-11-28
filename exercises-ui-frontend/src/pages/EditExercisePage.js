import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditExercisePage = ({ exercise }) => {
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
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
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <h2>Edit an exercise in the collection</h2>
                <p>Paragraph about this page.</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <fieldset>
                        <legend>Which exercise are you adding?</legend>
                        <label for="title">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            required
                        />

                        <label for="reps">Reps</label>
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

                        <label for="weight">Weight/Time</label>
                        <input
                            type="number"
                            placeholder=""
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
                            <button onClick={editExercise} id="submit">
                                Save
                            </button>{" "}
                            updates to the collection
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
};
export default EditExercisePage;
