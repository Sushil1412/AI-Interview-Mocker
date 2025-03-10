import React from "react";
import "./QuestionSection.css";
import { FaLightbulb, FaVolumeUp } from "react-icons/fa";

const QuestionSection = ({ questions, activeQuestionIndex, setActiveQuestionIndex }) => {
    const speakQuestion = () => {
        const utterance = new SpeechSynthesisUtterance(questions[activeQuestionIndex].question);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="question-container">
            <div className="question-buttons">
                {questions.map((_, index) => (
                    <button
                        key={index}
                        className={`question-btn ${activeQuestionIndex === index ? "active" : ""}`}
                        onClick={() => setActiveQuestionIndex(index)} // 🔹 Change selected question
                    >
                        Question #{index + 1}
                    </button>
                ))}
            </div>

            <div className="question-display">
                <p>{questions[activeQuestionIndex].question}</p>
                <FaVolumeUp className="volumebtn" onClick={speakQuestion} />
            </div>

            <div className="notee">
                <strong><FaLightbulb /> Note:</strong> <br /><br />
                Click on <strong>Record Answer</strong> when you want to answer the question.
            </div>
        </div>
    );
};

export default QuestionSection;
