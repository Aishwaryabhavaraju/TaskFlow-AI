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
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
  inviteMember,
  updateMemberRole,
  removeMember,
  getWorkspaceSettings,
  updateWorkspaceSettings,
  archiveWorkspace,
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

const editWorkspace = async (id, formData) => {
  try {
    dispatch(setLoading(true));

    const data = await updateWorkspace(id, formData);

    dispatch(
      setWorkspaces(
        workspace.workspaces.map((item) =>
          item._id === id ? data.workspace : item
        )
      )
    );

    dispatch(setCurrentWorkspace(data.workspace));

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

const removeWorkspace = async (id) => {
  try {
    dispatch(setLoading(true));

    await deleteWorkspace(id);

    dispatch(
      setWorkspaces(
        workspace.workspaces.filter(
          (item) => item._id !== id
        )
      )
    );

    dispatch(setCurrentWorkspace(null));

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

const fetchMembers = async (workspaceId) => {
  try {
    dispatch(setLoading(true));

    const data =
      await getWorkspaceMembers(workspaceId);

    return data.members;

  } catch (error) {

    dispatch(setError(error.message));

    return [];

  } finally {

    dispatch(setLoading(false));

  }
};

const sendInvitation = async (
  workspaceId,
  inviteData
) => {
  try {
    dispatch(setLoading(true));

    const data = await inviteMember(
      workspaceId,
      inviteData
    );

    return {
      success: true,
      invitation: data,
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

const changeMemberRole = async (
  workspaceId,
  memberId,
  role
) => {
  try {

    dispatch(setLoading(true));

    const data = await updateMemberRole(
      workspaceId,
      memberId,
      role
    );

    return {
      success: true,
      member: data.member,
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

const deleteMember = async (
  workspaceId,
  memberId
) => {
  try {

    dispatch(setLoading(true));

    await removeMember(
      workspaceId,
      memberId
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

const fetchSettings = async (workspaceId) => {
    const data = await getWorkspaceSettings(workspaceId);
    return data.settings;
};

const saveSettings = async (
    workspaceId,
    settings
) => {
    return await updateWorkspaceSettings(
        workspaceId,
        settings
    );
};

const archiveCurrentWorkspace = async (
    workspaceId
) => {
    return await archiveWorkspace(workspaceId);
};
  return {
    ...workspace,

    fetchWorkspaces,
    fetchWorkspace,
    addWorkspace,
    editWorkspace,
    removeWorkspace,
    fetchMembers,
    sendInvitation,
    changeMemberRole,
    deleteMember,
    fetchSettings,
    saveSettings,
    archiveCurrentWorkspace,
  };
}