import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  interviewId: { type: String, required: true, unique: true }, // UUID
  jobPosition: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experience: { type: String, required: true },
  createdBy: { type: String, required: true }, // User's email
  MockJsonResp: { type: Object, required: true }, // AI response stored as JSON
  createdAt: { type: Date, default: Date.now },
});

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
