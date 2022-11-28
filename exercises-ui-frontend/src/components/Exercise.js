import React from "react";
import { MdDelete, MdEditNote } from "react-icons/md";

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.toLocaleString("en-US").slice(0, 10)}</td>
            <td>
                <MdDelete id="delete-button" onClick={() => onDelete(exercise._id)} />
            </td>
            <td>
                <MdEditNote id="edit-button" onClick={() => onEdit(exercise)} />
            </td>
        </tr>
    );
}

export default Exercise;
