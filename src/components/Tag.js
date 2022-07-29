import React from 'react';

const Tag = ({tag, confidence}) => {
    return (
        <div className="tag">
            <h3>{tag}</h3>
            <span>{`${confidence} %`}</span>
        </div>
    );
};

export default Tag;