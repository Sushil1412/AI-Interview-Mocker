import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import { LuWebcam } from "react-icons/lu";
import { FaLightbulb } from "react-icons/fa";
import "./InterviewPage.css";

const InterviewPage = () => {
    const { id: interviewId } = useParams();
    const [interview, setInterview] = useState(null);
    const [webCamEnabled, setWebcamEnabled] = useState(false);
    const [bulbOn, setBulbOn] = useState(false);

    useEffect(() => {
        if (interviewId) {
            fetchInterviewDetails();
        }
    }, [interviewId]);

    const fetchInterviewDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/mock-interview/${interviewId}`);
            setInterview(response.data);
        } catch (err) {
            console.error("Error fetching interview:", err);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <h2 className="heading">Let's Get Started</h2>

                {/* Interview Details */}
                {interview && (
                    <div className="details-container">
                        <div className="details-card">
                            <p><strong>Job Role/Job Position:</strong> {interview.jobPosition || "Full Stack Developer"}</p>
                            <p><strong>Job Description/Tech Stack:</strong> {interview.jobDescription || "React, Node.js"}</p>
                            <p><strong>Years of Experience:</strong> {interview.experience || "4"}</p>
                        </div>

                        {/* Webcam Section */}
                        <div className="webcam-section">
                            {webCamEnabled ? (
                                <Webcam className="webcam-feed" mirrored={true} />
                            ) : (
                                <div className="webcam-placeholder">
                                    <LuWebcam className="webcam-icon" size={100} />
                                    {/* <button className="enable-btn" onClick={() => setWebcamEnabled(true)}>
                                        Enable Web Cam and Microphone
                                    </button> */}
                                    <p> Enable Web Cam and Microphone</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Information Box with Light Bulb */}
                <div className="info-box">
                    <div className="inf"> <h3> <FaLightbulb />Information</h3></div>
                    <p className="note">
                        Enable Video Web Cam and Microphone to start your AI-generated Mock Interview.
                        It has 5 questions that you can answer, and at the end, you will get a report based on your answers.
                        <br /><strong>NOTE:</strong> We never record your video. Web cam access can be disabled at any time.
                    </p>
                </div>

                {/* Start Button */}
                <Link to={`/dashboard/interview/${interviewId}/startinterview`}>
                    <button className="start-btn">Start Interview</button>
                </Link>

            </div>
        </>
    );
};

export default InterviewPage;
