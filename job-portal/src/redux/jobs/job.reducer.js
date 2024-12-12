import {
  ADD_TO_BOOKMARK,
  ERROR_IN_GET_JOB,
  GET_ALL_JOBS,
  JOB_LOADING,
  REMOVE_FROM_BOOKMARK,
  SEARCH,
} from "./job.action";

const initialJobState = {
  AllJobs: [],
  Search: [],
  isLoading: false,
  isError: null,
};

export const Reducer = (state = initialJobState, { type, payload }) => {
  switch (type) {
    case JOB_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case ERROR_IN_GET_JOB:
      return {
        ...state,
        isLoading: false,
        isError: payload,
      };
    case GET_ALL_JOBS:
      return {
        ...state,
        isLoading: false,
        isError: null,
        AllJobs: payload,
      };
    case ADD_TO_BOOKMARK:
      return {
        ...state,
        isLoading: false,
        isError: null,
        AllJobs: [...state.AllJobs, payload],
      };
    case REMOVE_FROM_BOOKMARK:
      return {
        ...state,
        isLoading: false,
        isError: null,
        AllJobs: state.AllJobs.filter((job) => job._id !== payload),
      };
    case SEARCH:
      return {
        ...state,
        isLoading: false,
        isError: null,
        Search: [...state.Search, ...payload],
      };
    default:
      return state;
  }
};
