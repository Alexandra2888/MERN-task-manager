import { useState, useEffect } from "react";
import axios from 'axios';

import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Line} from "react-icons/ri";


function Task() {
  const [name, setName] = useState(""); 
  const [tasks, setTasks] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 



  const deleteTask = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      await axios.delete(`http://localhost:8000/api/v1/tasks/${id}`, {
        headers,
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(
        'http://localhost:8000/api/v1/tasks',
        { name: name }, 
        { headers }
      );
  
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setName("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json', 
        };
  
       
        const response = await axios.get('http://localhost:8000/api/v1/tasks', { headers });
        console.log(response);
  
        const fetchedTasks = response.data.data.tasks;
        setTasks(fetchedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);

  return (
    <section>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            className="task-input"
            placeholder="e.g. wash dishes"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn submit-btn">
            Submit
          </button>
        </div>
        <div className="form-alert"></div>
      </form>
      <section className="tasks-container">
        {isLoading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <div className="tasks">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
             <FaEdit/>   {task.name} <RiDeleteBin6Line onClick={() => deleteTask(task._id)}/>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Task;
