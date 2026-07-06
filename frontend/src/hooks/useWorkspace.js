import { useDispatch, useSelector } from "react-redux";

import {
  setLoading,
  setWorkspaces,
  setCurrentWorkspace,
  setError,
} from "../redux/workspace/workspaceSlice";

import {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
} from "../services/workspaceService";

export default function useWorkspace() {
  const dispatch = useDispatch();

  const workspace = useSelector(
    (state) => state.workspace
  );

  const fetchWorkspaces = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getWorkspaces();

      dispatch(setWorkspaces(data.workspaces));

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }
  };

  const fetchWorkspace = async (id) => {
    try {
      dispatch(setLoading(true));

      const data = await getWorkspaceById(id);

      dispatch(setCurrentWorkspace(data.workspace));

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }
  };

  const addWorkspace = async (formData) => {
  try {
    dispatch(setLoading(true));

    const data = await createWorkspace(formData);

    dispatch(
      setWorkspaces([
        ...workspace.workspaces,
        data.workspace,
      ])
    );

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
    ...workspace,

    fetchWorkspaces,

    fetchWorkspace,
    addWorkspace,
  };
}