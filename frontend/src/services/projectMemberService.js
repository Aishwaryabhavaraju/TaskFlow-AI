import api from "../api/axios";

export const getMembers = async (projectId) => {
  const { data } = await api.get(
    `/projects/${projectId}/members`
  );

  return data;
};

export const inviteMember = async (
  projectId,
  member
) => {
  const { data } = await api.post(
    `/projects/${projectId}/members`,
    member
  );

  return data;
};

export const updateRole = async (
  projectId,
  memberId,
  role
) => {
  const { data } = await api.put(
    `/projects/${projectId}/members/${memberId}`,
    { role }
  );

  return data;
};

export const removeProjectMember = async (
  projectId,
  memberId
) => {
  const { data } = await api.delete(
    `/projects/${projectId}/members/${memberId}`
  );

  return data;
};