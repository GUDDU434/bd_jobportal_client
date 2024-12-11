import React from "react";

const BookmarkedJobsModal = ({ ShowBookmarks, bookmarkedJobs, closeModal }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
          </div>
        </div>
      )}
    </>
  );
};

export default BookmarkedJobsModal;
