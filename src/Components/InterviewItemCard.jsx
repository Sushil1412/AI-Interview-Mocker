import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Interviewitemcard.css';

const InterviewItemCard = ({ interview }) => {
    const navigate = useNavigate();

    const handleStartInterview = () => {
        navigate(`/dashboard/interview/${interview.interviewId}`);
    };

    const handleFeedback = () => {
        navigate(`/dashboard/interview/${interview.interviewId}/startinterview/feedback`);
    };
    return (

        <div className="card">
            <div className="card-content">
                <h2 className="job-title">{interview?.jobPosition}</h2>
                <p className="experience">{interview?.experience} Years of Experience</p>
                <p className="created-at">Created At: {new Date(interview?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="card-actions">
                <button className="feedback-btn" onClick={handleFeedback}>Feedback</button>
                <button className="start-bt" onClick={handleStartInterview}>Start</button>
            </div>
        </div>

    );
};

export default InterviewItemCard;
