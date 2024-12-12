import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { GrOrganization } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { RemoveFromBookmark } from "../redux/jobs/job.action";

const BookmarkedJobsModal = ({ ShowBookmarks, bookmarkedJobs, closeModal }) => {
  const dispatch = useDispatch();
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const removeBookmark = (jobId) => {
    dispatch(RemoveFromBookmark(jobId));
  };

  return (
    <>
      {ShowBookmarks && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              width: "90%",
              maxWidth: "600px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                background: "none",
                border: "none",
                fontSize: "50px",
                color: "white",
                cursor: "pointer",
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              &times;
            </button>
            <h2 style={{ marginTop: 0 }}>Bookmarked Jobs</h2>
            <div
              style={{
                overflowY: "auto",
                maxHeight: "600px",
              }}
            >
              {bookmarkedJobs?.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {bookmarkedJobs?.map((job, index) => (
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
                          onClick={() => removeBookmark(job?._id)}
                        >
                          <MdDeleteForever size={25} />
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
                <p>No bookmarked jobs yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkedJobsModal;
