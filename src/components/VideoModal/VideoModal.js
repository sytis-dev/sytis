import React from "react";

const VideoModal = ({ isOpen, setOpen, id }) => {
  if (!isOpen) return null;

  return (
    <>
      {typeof window !== "undefined" && (
        <div className="video-modal-overlay" onClick={() => setOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setOpen(false)}>
              ×
            </button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
