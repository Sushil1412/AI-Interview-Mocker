import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "./Feedback.css";
import Header from "./Header";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "./Collapsiable"; // Make sure the file name matches
import { Button } from "@mui/material";



const Feedback = () => {
  const { interviewId } = useParams();
  const [userAnswers, setUserAnswers] = useState([]); // Store fetched data
  const navigate = useNavigate();
  // Function to fetch user answers
  const getFeedback = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/useranswer/${interviewId}`);
      setUserAnswers(response.data);
    } catch (err) {
      console.error("Error fetching user answers:", err);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    if (interviewId) {
      getFeedback();
    }
  }, [interviewId]);


  const calculateOverallRating = () => {
    if (userAnswers.length === 0) return 0;

    const totalRating = userAnswers.reduce((sum, item) => sum + item.rating, 0);
    const overallRating = totalRating / userAnswers.length; // Average rating
    return overallRating.toFixed(1); // Round to 1 decimal place
  }




  return (
    <>
      <Header />
      <div className="homeCon">
        <h2 className="cn">Congratulations!</h2>
        <h2>Here is your interview feedback</h2>
        <h3 style={{ color: "#6c63ff" }}>
          Your overall interview rating: <strong>{calculateOverallRating()} / 5</strong>
        </h3>
        <p>Find below interview questions with your answer, correct answer, and feedback for improvement.</p>
        <br></br>
        <div className="fd">
          {userAnswers.map((item, index) => (
            <div key={index} className="container">
              <Collapsible className="collapsible">
                <CollapsibleTrigger className="trigger">
                  {item.question}
                </CollapsibleTrigger>
                <CollapsibleContent className="content">
                  <div className="rating">
                    <p><strong>Rating:</strong> {item.rating}</p>
                  </div>
                  <div className="user-answer">
                    <strong>Your Answer:</strong> {item.userAns}
                  </div>
                  <div className="correct-answer">
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </div>
                  <div className="feedback">
                    <strong>Feedback:</strong> {item.feedback}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>

        <Button
          style={{ background: "#4338ca", color: "white", marginTop: "-1.5rem",padding:'.6rem' }}
          onClick={() => navigate("/dashboard")} // ✅ Now navigate should work
        >
          Go to Home
        </Button>
      </div>
    </>
  );
};

export default Feedback;
