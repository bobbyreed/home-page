import React from 'react';

// Trick Component
const Trick = ({ tricks }) => {
    return (
        <div className="skateboard-trick">
            <h2>{tricks.name}</h2>
            <video controls width="600">
                <source src={tricks.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{tricks.description}</p>
        </div>
    );
};

export default Trick;