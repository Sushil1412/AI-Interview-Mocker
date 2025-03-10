import React, { useState, useEffect } from "react";
import camImage from "../assets/Images/cam1.png";
import "./RecordAnswerSection.css";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { FaMicrophone, FaStop } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const RecordAnswerSection = ({ question, onSaveAnswer }) => {
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const [forceRender, setForceRender] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");

    const {
        isRecording,
        startSpeechToText,
        stopSpeechToText,
        results,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => setWebcamEnabled(true))
            .catch(() => setWebcamEnabled(false));
    }, []);

    // 🔹 Update `userAnswer` when speech is recorded
    useEffect(() => {
        setUserAnswer(results.map((result) => result.transcript).join(" "));
    }, [results]);

    useEffect(() => {
        setForceRender((prev) => prev + 1);
    }, [isRecording]);

    const SaveUserAnswer = () => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.length < 10) {
                toast.error("Please speak clearly, answer is too short!");
                return;
            }

            // 🔹 Save the answer to parent component
            onSaveAnswer(userAnswer);
            toast.success("Answer saved successfully!");
            console.log("Saved Answer:", userAnswer);
        } else {
            startSpeechToText();
        }
    };

    return (
        <div className="record-container">
            <Toaster />
            <div className="cam">
                {webcamEnabled ? (
                    <Webcam mirrored={true} className="webcam-feed" />
                ) : (
                    <img src={camImage} alt="Camera icon" className="cami" />
                )}
            </div>

            <br /><br />

            <button
                key={forceRender}
                className={`record-button ${isRecording ? "recording" : ""}`}
                onClick={SaveUserAnswer}
            >
                {isRecording ? (
                    <>
                        <FaStop /> Stop Recording
                    </>
                ) : (
                    <>
                        <FaMicrophone /> Start Recording
                    </>
                )}
            </button>

            <br /><br />

            {/* Display the recorded answer */}
            {/* {userAnswer && (
                <div className="user-answer">
                    <h3>Recorded Answer for "{question.question}":</h3>
                    <p>{userAnswer}</p>
                </div>
            )} */}
        </div>
    );
};

export default RecordAnswerSection;
