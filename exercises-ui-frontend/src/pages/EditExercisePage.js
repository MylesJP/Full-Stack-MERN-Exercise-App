import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditExercisePage = ({ exercise }) => {
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

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
                        <label for="title">Exercise name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                        />

                        <label for="reps">Number of reps</label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="Reps"
                            onChange={(e) => setReps(e.target.value)}
                            id="reps"
                        />

                        <label for="weight">Weight</label>
                        <input
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                        />

                        <label for="unit">Unit</label>
                        <input
                            type="text"
                            placeholder="Unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            id="unit"
                        />

                        <label for="date">Date</label>
                        <input
                            type="date"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            id="date"
                        />

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
