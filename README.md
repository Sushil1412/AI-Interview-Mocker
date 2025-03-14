# AI Mock Interview App

AI Mock Interview is a web application designed to help users prepare for technical and behavioral interviews using AI-driven mock interviews. The platform provides real-time feedback, performance analysis, and past interview records to help users improve.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies Used]
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Features
✅ **Dashboard** – Users can track their interview progress and history.  
✅ **Start Interview** – Conduct AI-driven mock interviews with real-time question-answering.  
✅ **User Answers via Speech (React Hooks)** – Users can respond to questions using voice input handled by React Hooks.  
✅ **AI-Generated Questions (Powered by Gemini AI)** – The AI dynamically generates technical and behavioral interview questions.  
✅ **Performance Feedback & Rating** – AI analyzes responses and provides detailed feedback with a performance rating.  
✅ **Past Interviews (Stored in MongoDB)** – Users can review past interviews stored in a MongoDB database.  
✅ **Authentication (Clerk)** – Secure login and registration system powered by Clerk.  
✅ **Contact for Support** – Dedicated customer support for user queries and assistance.  

## Demo
step 1:
![step1](https://github.com/user-attachments/assets/d2185256-a3e5-4a70-932a-e662cc1bedca)
step 2:
![step2](https://github.com/user-attachments/assets/88a4c440-db8e-4814-850a-2e8720a30147)
step 3:
![step3](https://github.com/user-attachments/assets/4ad2ea0d-c902-44b8-9153-fc794a5c6ef8)
step 4:
![step4](https://github.com/user-attachments/assets/6e8c0a66-cc26-4efe-98da-44b149c909ef)
step 5:
![step5](https://github.com/user-attachments/assets/d263a48a-5837-4c94-a2db-8bc59fceecc9)



## Technologies Used
- **Frontend**: React.js (with React Hooks for voice input)
- **Backend**: Node.js & Express.js
- **Database**: MongoDB (Stores past interviews and user data)
- **Authentication**: Clerk (User login & signup)
- **Voice Input**: Web Speech API integrated with React Hooks
- **AI Question Generation**: Gemini AI
- **AI Feedback**: OpenAI API / Custom ML Model (For analyzing responses)

## Installation
To run the project locally, follow these steps:

```bash
git clone https://github.com/yourusername/ai-mock-interview.git
cd ai-mock-interview
npm install
npm start
