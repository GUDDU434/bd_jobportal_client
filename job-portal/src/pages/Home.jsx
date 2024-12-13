import React, { useEffect, useState } from "react";
import { CiBookmarkPlus, CiLocationOn } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import BookmarkedJobsModal from "../components/Bookmark";
import {
  AddToBookmark,
  GetAllBookmarkedJobs,
  SearchJobs,
} from "../redux/jobs/job.action";
const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [ShowBookmarks, setShowBookmarks] = useState(false);
  const [Showsearchresult, setShowsearchresult] = useState(false);
  const { Search, AllJobs, isError, isLoading } = useSelector(
    (state) => state.JobReducer
  );
  const dispatch = useDispatch();

  console.log(isError);

  useEffect(() => {
    dispatch(GetAllBookmarkedJobs());
  }, [dispatch]);

  const closeModal = () => {
    setShowBookmarks(false);
  };

  const fetchJobs = () => {
    dispatch(SearchJobs({ prompt })).then(() => setShowsearchresult(true));
  };

  const bookmarkJob = (job) => {
    dispatch(AddToBookmark({ ...job }));
  };

  return (
    <>
      {/* Navbar section */}
      <div
        style={{
          backgroundColor: "#1a365d",
          padding: "10px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <div style={{ marginLeft: "20px" }}>
          <h1>FIND JOBS</h1>
        </div>
        <div
          onClick={() => setShowBookmarks(!ShowBookmarks)}
          style={{
            cursor: "pointer",
            marginRight: "20px",
          }}
        >
          <div
            style={{
              padding: "1px",
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              borderRadius: " 50%",
            }}
          >
            {AllJobs?.length}
          </div>
          <FaBookmark size={20} />
        </div>
      </div>

      {/* Search section */}
      <div style={{ width: "81%", margin: "auto" }}>
        <div
          style={{
            padding: "20px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter job preferences (e.g., React developer jobs in Mumbai)"
            style={{ width: "30%", padding: "10px", marginRight: "10px" }}
          />
          <button
            onClick={fetchJobs}
            style={{
              padding: "10px 20px",
              backgroundColor: prompt ? "#0080ff" : "#cccccc",
              color: "white",
              border: "none",
              cursor: prompt ? "pointer" : "not-allowed",
              borderRadius: "5px",
            }}
            disabled={!prompt}
          >
            Search Jobs
          </button>
        </div>

        {isLoading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}

        {/* Search result section */}
        <div style={{ display: `${Showsearchresult ? "block" : "none"}` }}>
          <h2>SEARCH RESULT</h2>
          <div style={{ overflowY: "scroll", height: "400px" }}>
            {isError != null ? (
              <p>
                {typeof isError?.error === "string" || "Something went wrong"}
              </p>
            ) : Search?.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {Search?.map((job, index) => (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h3>{job.title}</h3>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => bookmarkJob(job)}
                      >
                        <CiBookmarkPlus size={25} />
                      </div>
                    </div>
                    <p>
                      <GrOrganization /> {job.company} <CiLocationOn />{" "}
                      {job.location}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No job recommendations yet. Please enter your preferences and
                search.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bookmarked jobs section */}
      <BookmarkedJobsModal
        {...{ ShowBookmarks, bookmarkedJobs: AllJobs, closeModal }}
      />
    </>
  );
};

export default Home;
