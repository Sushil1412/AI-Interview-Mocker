


import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import RecordAnswerSection from "./RecordAnswerSection";
import { sendPrompt } from "../Utils/GeminiAiModel";
import { useUser } from "@clerk/clerk-react";
import './StartInterview.css'

const StartInterview = () => {
    const { id: interviewId } = useParams();
    const [interviewData, setInterviewData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const { user } = useUser();

    useEffect(() => {
        const fetchInterviewDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/mock-interview/${interviewId}`);

                if (response.data && Array.isArray(response.data.MockJsonResp)) {
                    setInterviewData(response.data);
                    setQuestions(response.data.MockJsonResp);
                } else {
                    setQuestions([]);
                }
            } catch (err) {
                console.error("Error fetching interview:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterviewDetails();
    }, [interviewId]);

    const navigate = useNavigate(); // Initialize navigate function

    const handleEndInterview = () => {
        const feedbackUrl = `/dashboard/interview/${interviewId}/startinterview/feedback`;
        navigate(feedbackUrl); // Redirect to feedback page
    };


    const handleSaveAnswer = async (answer) => {
        setUserAnswers((prev) => ({
            ...prev,
            [activeQuestionIndex]: answer,
        }));

        const currentQuestion = questions[activeQuestionIndex]?.question;

        const feedbackPrompt = `Question: ${currentQuestion}, User Answer: ${answer}
            ,Depends on question and user answer for given interview question
            please give us rating for answer and feedback if any
            in just 3 to 5 lines to improve it in JSON format with rating field and feedback field
        `;

        try {
            const aiFeedback = await sendPrompt(feedbackPrompt);
            const cleanedResponse = aiFeedback.replace(/```json|```/g, "").trim();
            const feedbackJSON = JSON.parse(cleanedResponse);

            const userAnswerData = {
                mockIdRef: interviewId,
                question: currentQuestion,
                correctAns: questions[activeQuestionIndex]?.answer || "",
                userAns: answer,
                feedback: feedbackJSON.feedback,
                rating: feedbackJSON.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress || "No email found",
                createdAt: new Date().toISOString(),
            };

            console.log(userAnswerData);

            const response = await axios.post("http://localhost:5000/api/user-answers", userAnswerData);
            if (response.status === 201) {
                alert("Answer and feedback saved successfully!");
            } else {
                alert("Error saving answer. Please try again.");
            }
        } catch (error) {
            console.error("Error getting AI feedback:", error);
            //alert("Failed to get AI feedback. Try again.");
        }
    };

    return (
        <>
            <Header />
            {loading ? (
                <p>Loading interview details...</p>
            ) : questions.length > 0 ? (
                <>
                    <div style={{ display: "flex", gap: "6rem", alignItems: "start" }}>
                        <QuestionSection
                            questions={questions}
                            activeQuestionIndex={activeQuestionIndex}
                            setActiveQuestionIndex={setActiveQuestionIndex}
                        />
                        <RecordAnswerSection
                            question={questions[activeQuestionIndex]}
                            onSaveAnswer={handleSaveAnswer}
                        />
                    </div>
                    <div className="btp">
                        {activeQuestionIndex > 0 && (
                            <button
                                className="btn"
                                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                            >
                                Previous Question
                            </button>
                        )}
                        {activeQuestionIndex !== questions.length - 1 && (
                            <button
                                className="btn"
                                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                            >
                                Next Question
                            </button>
                        )}
                        {activeQuestionIndex === questions.length - 1 && (
                            <button className="btn" onClick={handleEndInterview}>End Interview</button>

                        )}
                    </div>
                </>
            ) : (
                <p>No questions available.</p>
            )}
        </>
    );
};

export default StartInterview;
