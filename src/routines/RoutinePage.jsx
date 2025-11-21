import { useEffect, useState } from "react";
import { getRoutines } from "../api/routines";

import RoutineList from "./RoutineList";
import RoutineForm from "./RoutineForm";

export default function RoutinePage() {
  const [routines, setRoutines] = useState([]);

  const syncRoutines = async () => {
    try {
      const data = await getRoutines();
      setRoutines(data);
    } catch (error) {
      console.error("Failed to fetch routines:", error);
    }
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      <RoutineList routines={routines} syncRoutines={syncRoutines} />
      <RoutineForm syncRoutines={syncRoutines} />
    </>
  );
}
