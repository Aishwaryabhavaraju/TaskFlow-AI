import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attachments: [],
  loading: false,
  error: null,
};

const attachmentSlice = createSlice({
  name: "attachments",

  initialState,

  reducers: {

    setAttachments(state, action) {
      state.attachments = action.payload;
    },

    addAttachment(state, action) {
      state.attachments.unshift(action.payload);
    },

    removeAttachment(state, action) {
      state.attachments = state.attachments.filter(
        file => file._id !== action.payload
      );
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

  },
});

export const {
  setAttachments,
  addAttachment,
  removeAttachment,
  setLoading,
  setError,
} = attachmentSlice.actions;

export default attachmentSlice.reducer;