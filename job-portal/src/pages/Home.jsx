import React, { useState } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { CiLocationOn, CiBookmarkPlus } from "react-icons/ci";
import { GrOrganization } from "react-icons/gr";
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
          <FaBookmark size={20} />
        </div>
      </div>

      <div style={{ width: "81%", margin: "auto" }}>
        {/* Search section */}
        <div
          style={{
            padding: "20px",
            justifyContent: "center",
            display: "flex",
          }}
        >
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

        {/* Search result section */}
        <div style={{ display: `${Showsearchresult ? "block" : "none"}` }}>
          <h2>SEARCH RESULT</h2>
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
      <BookmarkedJobsModal {...{ ShowBookmarks, bookmarkedJobs, closeModal }} />
    </>
  );
};

export default Home;
