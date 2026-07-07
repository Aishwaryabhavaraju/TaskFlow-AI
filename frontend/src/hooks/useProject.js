import { useDispatch, useSelector } from "react-redux";

import {
  setLoading,
  setProjects,
  setCurrentProject,
  addProject,
  updateProject,
  removeProject,
  setError,
} from "../redux/slices/projectSlice";

import * as projectService from "../services/projectService";

export default function useProject() {
  const dispatch = useDispatch();

  const project = useSelector(
    (state) => state.project
  );

  const fetchProjects = async (
    workspaceId
  ) => {
    try {
      dispatch(setLoading(true));

      const data =
        await projectService.getProjects(
          workspaceId
        );

      dispatch(
        setProjects(data.projects || [])
      );

    } catch (error) {

      dispatch(
        setError(error.message)
      );

    } finally {

      dispatch(setLoading(false));

    }
  };

  const createNewProject = async (projectData) => {
  try {
    dispatch(setLoading(true));

    const data = await projectService.createProject(projectData);

    dispatch(addProject(data.project));

    return {
      success: true,
      project: data.project,
    };
  } catch (error) {
    dispatch(setError(error.message));

    return {
      success: false,
      message: error.message,
    };
  } finally {
    dispatch(setLoading(false));
  }
};

const fetchProject = async (projectId) => {
  try {
    dispatch(setLoading(true));

    const data =
      await projectService.getProject(projectId);

    dispatch(setCurrentProject(data.project));

    return data.project;

  } catch (error) {

    dispatch(setError(error.message));

    return null;

  } finally {

    dispatch(setLoading(false));

  }
};

const editProject = async (projectId, projectData) => {
  try {
    dispatch(setLoading(true));

    const data = await projectService.updateProject(
      projectId,
      projectData
    );

    dispatch(updateProject(data.project));
    dispatch(setCurrentProject(data.project));

    return {
      success: true,
      project: data.project,
    };
  } catch (error) {
    dispatch(setError(error.message));

    return {
      success: false,
      message: error.message,
    };
  } finally {
    dispatch(setLoading(false));
  }
};

const archiveCurrentProject = async (
  projectId
) => {
  try {

    dispatch(setLoading(true));

    const data =
      await projectService.archiveProject(
        projectId
      );

    dispatch(updateProject(data.project));
    dispatch(setCurrentProject(data.project));

    return {
      success: true,
    };

  } catch (error) {

    dispatch(setError(error.message));

    return {
      success: false,
      message: error.message,
    };

  } finally {

    dispatch(setLoading(false));

  }
};

const restoreCurrentProject = async (
  projectId
) => {
  try {

    dispatch(setLoading(true));

    const data =
      await projectService.restoreProject(
        projectId
      );

    dispatch(updateProject(data.project));
    dispatch(setCurrentProject(data.project));

    return {
      success: true,
    };

  } catch (error) {

    dispatch(setError(error.message));

    return {
      success: false,
      message: error.message,
    };

  } finally {

    dispatch(setLoading(false));

  }
};

const deleteCurrentProject = async (
  projectId
) => {
  try {

    dispatch(setLoading(true));

    await projectService.deleteProject(
      projectId
    );

    dispatch(removeProject(projectId));

    return {
      success: true,
    };

  } catch (error) {

    dispatch(setError(error.message));

    return {
      success: false,
      message: error.message,
    };

  } finally {

    dispatch(setLoading(false));

  }
};
  return {
    ...project,
    fetchProjects,
    createNewProject,
    fetchProject,
    editProject,
    archiveCurrentProject,
    restoreCurrentProject,
    deleteCurrentProject,
  };
}