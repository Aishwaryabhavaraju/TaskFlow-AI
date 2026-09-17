import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import taskService from "../services/taskService";

import {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setLoading,
  setError,
} from "../redux/slices/taskSlice";

import socket from "../socket/socket";

export default function useTask() {
  const dispatch = useDispatch();

  const { tasks, loading, error } = useSelector(
    (state) => state.tasks
  );

  // ----------------------------
  // Fetch Tasks
  // ----------------------------

  const fetchTasks = async (projectId) => {
    dispatch(setLoading(true));

    try {
      const data = await taskService.getTasks(projectId);
      dispatch(setTasks(data.tasks || data.data || []));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ----------------------------
  // Create Task
  // ----------------------------

  const createNewTask = async (payload) => {
    dispatch(setLoading(true));

    try {
      const data = await taskService.createTask(payload);
      const createdTask = data.task || data.data || data;

      if (createdTask && createdTask._id) {
        dispatch(addTask(createdTask));
        socket.emit("taskCreated", createdTask);
      }

      return createdTask;
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ----------------------------
  // Edit Task
  // ----------------------------

  const editTask = async (id, payload) => {
    dispatch(setLoading(true));

    try {
      const data = await taskService.updateTask(id, payload);
      const updated = data.task || data.data || data;

      dispatch(updateTask(updated));
      socket.emit("taskUpdated", updated);

      return updated;
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ----------------------------
  // Move Task
  // ----------------------------

  const moveTask = async (taskId, status) => {
    try {
      const data = await taskService.updateTaskStatus(taskId, status);
      const moved = data.task || data.data || data;

      dispatch(updateTask(moved));
      socket.emit("taskMoved", moved);
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  // ----------------------------
  // Delete Task
  // ----------------------------

  const deleteExistingTask = async (id) => {
    dispatch(setLoading(true));

    try {
      await taskService.deleteTask(id);
      dispatch(removeTask(id));
      socket.emit("taskDeleted", id);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ----------------------------
  // Listen for socket events
  // ----------------------------

  useEffect(() => {
    socket.on("taskCreated", (task) => {
      dispatch(addTask(task));
    });

    socket.on("taskUpdated", (task) => {
      dispatch(updateTask(task));
    });

    socket.on("taskMoved", (task) => {
      dispatch(updateTask(task));
    });

    socket.on("taskDeleted", (id) => {
      dispatch(removeTask(id));
    });

    socket.on("taskScheduleUpdated", (task) => {
      dispatch(updateTask(task));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskMoved");
      socket.off("taskDeleted");
      socket.off("taskScheduleUpdated");
    };
  }, [dispatch]);

  return {
    tasks,
    loading,
    error,

    fetchTasks,
    createNewTask,
    editTask,
    moveTask,
    deleteExistingTask,
  };
}
