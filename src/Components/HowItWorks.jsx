import React from 'react';
import './Howitwork.css';
import Header from './Header';
import step1 from '../assets/Images/step1.png';
import step2 from '../assets/Images/step2.png';
import step3 from '../assets/Images/step3.png';
import step4 from '../assets/Images/step4.png';
import step5 from '../assets/Images/step5.png';


const steps = [
    {
        title: "Step1:Dashboard page",
        description: "👉 this is dashbsoard page click on add interview for next step",
        image: step1,  // ✅ Fixed
    },
    {
        title: "Step 2: Fill the form ",
        description: "👉 Fill in your details like job position, description and no of experience a profile picture.",
        image: step2,  // ✅ Fixed
    },
    {
        title: "Step 3: start interview ",
        description: " 👉 Now the interview is ready to begin click on start interview ",
        image: step3,  // ✅ Fixed
    },
    {
        title: "Step 4: Give your answer",
        description: "👉 There will be 5 questions. Answer each by clicking the 'Record Answer' button. Once all questions are finished, click 'End Interview' to complete the session.",
        image: step4,  // ✅ Fixed
    },
    {
        title: "Step 5: FeedBack",
        description: " 👉After ending the interview, you will receive feedback for each question along with a rating.",
        image: step5,  // ✅ Fixed
    },

];

const HowItWorks = () => {
    return (
        <>
            <Header />
            <div className="how-it-works-container">
                <h2 className="how-it-works-title">How It Works</h2>
                {steps.map((step, index) => (
                    <div key={index} className="step-container">
                        <div className="step-text">
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </div>
                        <div className="step-image">
                            <img src={step.image} alt={step.title} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HowItWorks;
