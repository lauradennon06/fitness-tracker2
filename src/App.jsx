import { Routes, Route, Navigate } from "react-router";
import Layout from "./layout/Layout.jsx";
import ActivityDetails from "./activities/ActivityDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import RoutinePage from "./routines/RoutinePage.jsx";
import RoutineDetails from "./routines/RoutineDetails.jsx";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/activities" />} />
        <Route path="activities/:activityId" element={<ActivityDetails />} />
        <Route path="/routines/:routineId" element={<RoutineDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/routines" element={<RoutinePage />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
