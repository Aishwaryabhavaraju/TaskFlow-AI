import { useDispatch, useSelector } from "react-redux";

import aiService from "../services/aiService";

import {
  setLoading,
  setResult,
  clearResult,
  setError,
  setSuggestions,
  clearSuggestions,
} from "../redux/slices/aiSlice";

export default function useAI() {

const dispatch = useDispatch();

  const state = useSelector(
    state => state.ai
  );

  const generateTaskDescription = async (
    title
  ) => {

    dispatch(setLoading(true));

    try {

      const data =
        await aiService.generateDescription(
          title
        );

      dispatch(
        setResult(
          data.description
        )
      );

      return data.description;

    } catch (error) {

      dispatch(
        setError(error.message)
      );

    } finally {

      dispatch(setLoading(false));

    }

  };

  const generateSmartSuggestions =
async(task)=>{

    dispatch(setLoading(true));

    try{

        const data=
        await aiService.generateSuggestions(task);

        dispatch(
            setSuggestions(data)
        );

        return data;

    }
    catch(error){

        dispatch(
            setError(error.message)
        );

    }
    finally{

        dispatch(setLoading(false));

    }

};

  const runFeature = async (
    feature,
    payload
  ) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await aiService.runAIFeature(
        feature,
        payload
      );

      dispatch(setResult(data));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "AI request failed";

      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {

    ...state,

    clearResult: () =>
      dispatch(clearResult()),

    generateTaskDescription,
    generateSmartSuggestions,
    runFeature,
    clearSuggestions:()=>dispatch(clearSuggestions()),

  };

}
