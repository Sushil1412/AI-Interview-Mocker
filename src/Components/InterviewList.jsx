import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import InterviewItemCard from './InterviewItemCard';

const InterviewList = () => {
    const { isLoaded, user } = useUser(); // Ensure Clerk is fully loaded
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch interviews by user email
    const getInterviewList = async (email) => {
        try {
            setLoading(true);
            console.log("Fetching interviews for email:", email);

            if (!email) {
                console.error("Error: Email is undefined or null.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://localhost:5000/api/mock-preinterview/${email}`);

            console.log("API Response:", response.status, response.data);

            if (Array.isArray(response.data)) {
                const sortedInterviews = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setInterviewList(sortedInterviews);
                console.log("Fetched Interviews:", sortedInterviews);
            } else {
                console.warn("Warning: API did not return an array. Resetting interview list.");
                setInterviewList([]);
            }
        } catch (error) {
            console.error("Error fetching interview list:", error);

            if (error.response) {
                console.error("Server Response:", error.response.status, error.response.data);
            } else {
                console.error("Network or Unknown Error:", error.message);
            }

            setInterviewList([]); // Reset state to avoid crashes
        } finally {
            setLoading(false);
        }
    };


    // Fetch data only when Clerk has fully loaded
    useEffect(() => {
        if (!isLoaded) return; // Wait until Clerk is loaded

        const email = user?.primaryEmailAddress?.emailAddress;
        console.log("User email:", email);

        if (email) {
            getInterviewList(email);
        } else {
            setLoading(false);
        }
    }, [isLoaded, user]);

    return (
        <div className="interview-container">
            <h2 className="interview-heading">Your Previous Mock Interviews</h2>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <div className="interview-con"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                        padding: '20px',
                        maxWidth: '1200px',
                        margin: 'auto'
                    }}>
                    {interviewList.length > 0 ? (
                        interviewList.map((interview) => (
                            <InterviewItemCard key={interview.id} interview={interview} />
                        ))
                    ) : (
                        <p className="no-interviews">No interviews found.</p>
                    )}
                </div>
            )}
        </div>

    );
};

export default InterviewList;
