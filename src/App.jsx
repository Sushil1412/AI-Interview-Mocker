import React from 'react';
import Dashboard from "./Components/Dashboard"; // Correct the case


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewPage from './Components/InterviewPage';
import Feedback from './Components/Feedback';
import StartInterview from './Components/StartInterview';
import { toast, Toaster } from 'react-hot-toast';

import Contact from './Components/Contact';
import HowItWorks from './Components/HowItWorks';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/How-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Dashboard/Interview/:id" element={<InterviewPage />} />
        <Route path="/Dashboard/Interview/:id/startinterview" element={<StartInterview />} />
        <Route path="/Dashboard/Interview/:interviewId/startinterview/feedback" element={<Feedback />} />



      </Routes>

    </>
  );
}

export default App;
