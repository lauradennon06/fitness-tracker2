import { use, useEffect, useState } from "react";
import { deleteRoutine } from "../api/routines";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getRoutines } from "../api/routines";

// This component will render the routine name, goal, and creator name.
// Information will be fetched from the API
// The routine ID will be a dynamic segment, the compenent will get the ID from useParams.

export default function RoutineDetails() {
  const { routineId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [creatorID, setCreatorID] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRoutine() {
      try {
        const routines = await getRoutines();
        const routine = routines.find((r) => r.id === Number(routineId));

        if (!routine) {
          setError("Routine not found");
          return;
        }

        setRoutineName(routine.name);
        setRoutineGoal(routine.goal);
        setCreatorID(routine.creatorId);
      } catch (e) {
        setError(e.message);
      }
    }
    loadRoutine();
  }, [routineId]);

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteRoutine(token, routineId);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Routine Details for ID: {routineId}</h2>
      {routineName && <p>Name: {routineName}</p>}
      {routineGoal && <p>Goal: {routineGoal}</p>}
      {creatorID && <p>Creator: {creatorID}</p>}
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
