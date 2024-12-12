import { axiosInstance } from "../../utils/axiosutils";

export const GET_ALL_JOBS = "GET_ALL_JOBS";
export const JOB_LOADING = "JOB_LOADING";
export const ERROR_IN_GET_JOB = "ERROR_IN_GET_JOB";
export const SEARCH = "SEARCH";
export const ADD_TO_BOOKMARK = "ADD_TO_BOOKMARK";
export const REMOVE_FROM_BOOKMARK = "REMOVE_FROM_BOOKMARK";

export const SearchJobs = (data) => {
  return async (dispatch) => {
    dispatch({ type: JOB_LOADING });
    try {
      const res = await axiosInstance.post(`/jobs/recomendation`, data);
      const jobs = res?.data;

      console.log(jobs);

      if (jobs.status === 200) {
        dispatch({ type: SEARCH, payload: jobs?.data });
      } else {
        dispatch({ type: ERROR_IN_GET_JOB, payload: jobs?.error });
      }
    } catch (error) {
      // console.log("SearchJobs", error?.response?.data);
      dispatch({ type: ERROR_IN_GET_JOB, payload: error?.response?.data });
    }
  };
};

export const GetAllBookmarkedJobs = () => {
  return async (dispatch) => {
    dispatch({ type: JOB_LOADING });
    try {
      const res = await axiosInstance.get(`/jobs/bookmarked-jobs`);
      const jobs = res?.data;
      if (jobs.status === 200) {
        dispatch({ type: GET_ALL_JOBS, payload: jobs?.data });
      } else {
        dispatch({ type: ERROR_IN_GET_JOB, payload: jobs?.error });
      }
    } catch (error) {
      dispatch({ type: ERROR_IN_GET_JOB, payload: error?.response?.data });
    }
  };
};

export const RemoveFromBookmark = (id) => {
  return async (dispatch) => {
    dispatch({ type: JOB_LOADING });
    try {
      const res = await axiosInstance.delete(`/jobs/bookmark-job/${id}`);
      const jobs = res?.data;
      if (jobs.status === 200) {
        dispatch({ type: REMOVE_FROM_BOOKMARK, payload: id });
      } else {
        dispatch({ type: ERROR_IN_GET_JOB, payload: jobs?.message });
      }
    } catch (error) {
      dispatch({ type: ERROR_IN_GET_JOB, payload: error?.response?.data });
    }
  };
};

export const AddToBookmark = (data) => {
  return async (dispatch) => {
    dispatch({ type: JOB_LOADING });
    try {
      const res = await axiosInstance.post(`/jobs/bookmark-job`, data);
      const jobs = res?.data;
      if (jobs.status === 201) {
        dispatch({ type: ADD_TO_BOOKMARK, payload: jobs?.data });
      } else {
        dispatch({ type: ERROR_IN_GET_JOB, payload: jobs?.message });
      }
    } catch (error) {
      dispatch({ type: ERROR_IN_GET_JOB, payload: error?.response?.data });
    }
  };
};
