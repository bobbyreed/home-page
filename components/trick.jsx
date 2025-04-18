import React from 'react';

// Trick Component
const Trick = ({ trick }) => {
    return (
        <div className="skateboard-trick">
            <h2>{trick.name}</h2>
            <video controls width="600">
                <source src={trick.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{trick.description}</p>
        </div>
    );
};

export default Trick;