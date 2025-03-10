import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));


// ✅ Mongoose Schema for User Answer
const userAnswerSchema = new mongoose.Schema({
    mockIdRef: { type: String, required: true }, // Reference to the interview
    question: { type: String, required: true },
    correctAns: { type: String }, // (If available)
    userAns: { type: String, required: true },
    feedback: { type: String },
    rating: { type: String },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

// ✅ API Route: Save User Answer
app.post("/api/user-answers", async (req, res) => {
    try {
        const { mockIdRef, question, correctAns, userAns, feedback, rating, userEmail } = req.body;

        if (!mockIdRef || !question || !userAns || !userEmail) {
            return res.status(400).json({ message: "Required fields are missing!" });
        }

        const newUserAnswer = new UserAnswer({
            mockIdRef,
            question,
            correctAns,
            userAns,
            feedback,
            rating,
            userEmail,
        });

        await newUserAnswer.save();
        res.status(201).json({ message: "Answer saved successfully!", answer: newUserAnswer });

    } catch (error) {
        console.error("❌ Error saving user answer:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});



app.get('/api/useranswer/:mockIdRef', async (req, res) => {
    try {
        const { mockIdRef } = req.params;
        // const { interviewId } = req.params;
        console.log("🔍 Fetching feedback for mockIdRef:", mockIdRef);

        // Fetch all questions from the Interview collection

        const interview = await Interview.findOne({ interviewId: mockIdRef.trim() });
        const allQuestions = Array.isArray(interview.MockJsonResp)
            ? interview.MockJsonResp.map((q) => ({
                question: q.question,       // Extract the question text
                correctAns: q.answer || "No correct answer provided."  // Extract correctAns, fallback if missing
            }))
            : [];

        if (!allQuestions) {
            console.log("Interview not found in database");
            return res.status(404).json({ message: "Interview not found" });
        }

        // Fetch user's answers from UserAnswer collection
        const userAnswers = await UserAnswer.find({ mockIdRef: mockIdRef }).lean();

        // console.log("📌 All Questions:", allQuestions.length);
        // console.log("📌 User Answers:", userAnswers.length);
        // console.log("📌 All Questions:", allQuestions);
        // console.log("📌 User Answers:", userAnswers);

        // Convert user answers into a Map for easy lookup
        const answerMap = new Map(userAnswers.map(ans => [ans.question, ans]));

        // Merge all questions with user answers
        const feedbackList = allQuestions.map(({ question, correctAns }) => {
            const answer = answerMap.get(question); // Find answer using question text

            return {
                question: question, // Question text
                correctAns: correctAns, // Get correct answer from allQuestions array
                userAns: answer ? answer.userAns : "Skipped",
                feedback: answer ? answer.feedback : "No answer provided.",
                rating: answer ? answer.rating : "0"
            };
        });

        console.log(feedbackList);


        console.log(feedbackList);


        res.json(feedbackList);
    } catch (error) {
        console.error("❌ Error fetching interview feedback:", error);
        res.status(500).json({ message: "❌ Server error", error });
    }
});












// MongoDB Schema & Model interview data
const interviewSchema = new mongoose.Schema({
    interviewId: { type: String, required: true, unique: true },
    jobPosition: { type: String, required: true },
    jobDescription: { type: String, required: true },
    experience: { type: String, required: true },
    createdBy: { type: String, required: true },
    MockJsonResp: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model("Interview", interviewSchema);

// ✅ API Route: Store interview details
app.post("/api/mock-interview", async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Debugging step

        const { interviewId, jobPosition, jobDescription, experience, createdBy, MockJsonResp } = req.body;

        // Validate input
        if (!interviewId || !jobPosition || !jobDescription || !experience || !createdBy || !MockJsonResp) {
            return res.status(400).json({ message: "All fields are required, including interviewId!" });
        }

        // Create new interview document
        const newInterview = new Interview({
            interviewId,
            jobPosition,
            jobDescription,
            experience,
            createdBy,
            MockJsonResp,
        });

        // Save to MongoDB
        await newInterview.save();
        res.status(201).json({ message: "Interview saved successfully!", interview: newInterview });

    } catch (error) {
        console.error("❌ Error saving interview:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});



// ✅ API Route: Fetch interview details by ID
// ✅ API Route: Fetch interview details by ID
app.get("/api/mock-interview/:interviewId", async (req, res) => {
    try {
        const { interviewId } = req.params;  // Extract interviewId from URL
        console.log("Received interviewId:", interviewId); // Debugging log

        const interview = await Interview.findOne({ interviewId: interviewId });

        if (!interview) {
            console.log("Interview not found in database");
            return res.status(404).json({ message: "Interview not found" });
        }

        console.log("Interview found:", interview); // Debugging log
        res.json(interview);
    } catch (error) {
        console.error("❌ Error fetching interview:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//fetch by email



app.get("/api/mock-preinterview/:email", async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    console.log("Fetching interviews for:", email); // Debugging log

    try {
        const interviews = await Interview.find({ createdBy: email });

        if (!interviews.length) {
            return res.status(404).json({ message: "No interviews found" });
        }

        res.json(interviews);
    } catch (error) {
        console.error("Error fetching interviews:", error);
        res.status(500).json({ error: "Error fetching interviews" });
    }
});









// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
