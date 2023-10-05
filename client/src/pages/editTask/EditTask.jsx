import { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink, useParams } from "react-router-dom";

function EditTask() {
  const [name, setName] = useState(""); 
  const [completed, setCompleted] = useState(false); 
  const { id } = useParams(); 

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json', 
        };

        const response = await axios.get(`http://localhost:8000/api/v1/tasks/${id}`, { headers });

        const taskData = response.data.data.task;
        setName(taskData.name);
        setCompleted(taskData.completed);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      await axios.patch(`http://localhost:8000/api/v1/tasks/${id}`, { name, completed }, { headers });

    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="container">
      <form className="single-task-form" onSubmit={handleEdit}>
        <h4>Edit Task</h4>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="task-edit-name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            className="task-edit-completed"
            checked={completed} 
            onChange={(e) => setCompleted(e.target.checked)} 
          />
        </div>
        <button type="submit" className="block btn task-edit-btn">Edit</button>
        <div className="form-alert"></div>
      </form>
      <NavLink className="btn back-link" to="/">Back to tasks</NavLink>
    </div>
  );
}

export default EditTask;
