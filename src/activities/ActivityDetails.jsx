// This component will be a page for details about a specific activity.
import { use, useEffect, useState } from "react";
import { deleteActivity, fetchActivityByID } from "../api/activities";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

// This component will render the activity name, description, and creator name.
// Information will be fetched from the API
// The activity ID will be a dynamic segment, the compenent will get the ID from useParams.

export default function ActivityDetails() {
  const { activityId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [activityName, setActivityName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadActivity() {
      try {
        const activity = await fetchActivityByID(activityId);
        setActivityName(activity.name);
        setActivityDescription(activity.description);
        setCreatorID(activity.creatorId);
      } catch (e) {
        setError(e.message);
      }
    }
    loadActivity();
  }, [activityId]);

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, activityId);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Activity Details for ID: {activityId}</h2>
      {activityName && <p>Name: {activityName}</p>}
      {activityDescription && <p>Description: {activityDescription}</p>}
      {creatorID && <p>Creator: {creatorID}</p>}
      {token && <button onClick={tryDelete}>Delete</button>}

      {token && <button onClick={tryDelete}>Delete Activity</button>}
    </div>
  );
}
