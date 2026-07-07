import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  members: [],
  error: null,
};

const projectMemberSlice = createSlice({
  name: "projectMembers",

  initialState,

  reducers: {

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setMembers(state, action) {
      state.members = action.payload;
    },

    addMember(state, action) {
      state.members.push(action.payload);
    },

    updateMember(state, action) {
      state.members = state.members.map(member =>
        member._id === action.payload._id
          ? action.payload
          : member
      );
    },

    removeMember(state, action) {
      state.members = state.members.filter(
        member => member._id !== action.payload
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },

  },
});

export const {
  setLoading,
  setMembers,
  addMember,
  updateMember,
  removeMember,
  setError,
} = projectMemberSlice.actions;

export default projectMemberSlice.reducer;