import React, { useState } from "react";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";
import BookmarkedJobsModal from "../components/Bookmark";
const Home = () => {
  const [jobPreference, setJobPreference] = useState("");
  const [jobs, setJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
    {
      company: "Masai",
      location: "Bengaluru",
      description: "Software Engineer",
      title: "Full Stack Developer",
    },
  ]);
  const [ShowBookmarks, setShowBookmarks] = useState(false);
  const [Showsearchresult, setShowsearchresult] = useState(false);

  const closeModal = () => {
    setShowBookmarks(false);
  };

  const handleInputChange = (e) => {
    setJobPreference(e.target.value);
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.post("/api/jobs", {
        preference: jobPreference,
      });
      setJobs(response.data);
      setShowsearchresult(true);
    } catch (error) {
      setShowsearchresult(true);
      console.error("Error fetching jobs:", error);
    }
  };

  const bookmarkJob = async (job) => {
    try {
      const response = await axios.post("/api/bookmark", job);
      if (response.status === 200) {
        setBookmarkedJobs([...bookmarkedJobs, job]);
        alert("Job bookmarked successfully!");
      }
    } catch (error) {
      console.error("Error bookmarking job:", error);
    }
  };

  return (
    <>
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
        {/* Heading */}
        <div style={{ marginLeft: "20px" }}>
          <h1>FIND JOBS</h1>
        </div>
        <div style={{ marginRight: "20px" }}>
          <button
            onClick={() => setShowBookmarks(!ShowBookmarks)}
            style={{
              cursor: "pointer",
            }}
          >
            <FaBookmark size={20} />
          </button>
        </div>
      </div>

      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={jobPreference}
            onChange={handleInputChange}
            placeholder="Enter job preferences (e.g., React developer jobs in Mumbai)"
            style={{ width: "30%", padding: "10px", marginRight: "10px" }}
          />
          <button
            onClick={fetchJobs}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0080ff",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Search Jobs
          </button>
        </div>
        <div style={{ display: `${Showsearchresult ? "block" : "none"}` }}>
          <h2>SEARCH RESULT</h2>
          <div>
            {jobs.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {jobs.map((job, index) => (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <h3>{job.title}</h3>
                    <p>
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                    <button
                      onClick={() => bookmarkJob(job)}
                      style={{ padding: "5px 10px", marginTop: "10px" }}
                    >
                      Bookmark Job
                    </button>
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
        <BookmarkedJobsModal
          {...{ ShowBookmarks, bookmarkedJobs, closeModal }}
        />
        {/* <div style={{ display: `${ShowBookmarks ? "block" : "none"}` }}>
          <h2>Bookmarked Jobs</h2>
          <div>
            {bookmarkedJobs.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {bookmarkedJobs.map((job, index) => (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <h3>{job.title}</h3>
                    <p>
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookmarked jobs yet.</p>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
