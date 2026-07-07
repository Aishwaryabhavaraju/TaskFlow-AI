import { useDispatch, useSelector } from "react-redux";

import * as service from "../services/projectMemberService";

import {
  setLoading,
  setMembers,
  addMember,
  updateMember,
  removeMember,
  setError,
} from "../redux/slices/projectMemberSlice";

export default function useProjectMembers() {

  const dispatch = useDispatch();

  const state = useSelector(
    state => state.projectMembers
  );

  const fetchMembers = async (projectId) => {

    try {

      dispatch(setLoading(true));

      const data =
        await service.getMembers(projectId);

      dispatch(setMembers(data.members));

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }
  };

  return {
    ...state,
    fetchMembers,
  };
}