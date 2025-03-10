import React, { useState } from "react";
import { sendPrompt } from "../Utils/GeminiAiModel";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddNewInterview = () => {
  const [open, setOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = async () => {
    let validationErrors = {};
    if (!jobPosition) validationErrors.jobPosition = "Job position is required";
    if (!jobDescription) validationErrors.jobDescription = "Job description is required";
    if (!experience) validationErrors.experience = "Experience is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const InputPrompt = `Job position: ${jobPosition}, Job description: ${jobDescription}, Years of experience: ${experience} years. Provide 5 interview questions with answers(2-3 lines only) in JSON format.`;

    try {
      console.log("🔵 Sending Input to AI:", InputPrompt);
      const result = await sendPrompt(InputPrompt);

      if (!result) {
        console.error("❌ No response received from AI.");
        alert("AI did not generate a response. Try again.");
        return;
      }

      let responseText = result.text ?? result;
      if (typeof responseText !== "string") {
        responseText = JSON.stringify(responseText);
      }

      const cleanedResponse = responseText.replace(/```json|```/g, "").trim();
      let responseJSON;

      try {
        responseJSON = JSON.parse(cleanedResponse);
        console.log("✅ Parsed JSON:", responseJSON);
      } catch (jsonError) {
        console.warn("⚠️ Failed to parse response as JSON, returning raw text.");
        responseJSON = cleanedResponse;
      }

      console.log("Final AI Response:", responseJSON);

      // ✅ Format Data Properly Before Sending
      const interviewid = uuidv4();
      console.log("this is intervie id:" + interviewid);
      const postData = {
        interviewId: interviewid,
        jobPosition: jobPosition.trim(),
        jobDescription: jobDescription.trim(),
        experience: experience.toString(), // Ensure experience is a string
        createdBy: user?.primaryEmailAddress.emailAddress || "No email found",
        MockJsonResp: Array.isArray(responseJSON) ? responseJSON : [responseJSON], // Ensure JSON response is an array
      };

      // ✅ Debugging: Check Data Format Before Sending
      console.log("📌 Formatted Data Being Sent:", JSON.stringify(postData, null, 2));

      // ✅ Validate Data Before Sending
      if (!postData.jobPosition || !postData.jobDescription || !postData.experience || !postData.MockJsonResp.length) {
        console.error("❌ Missing required fields!");
        alert("Please fill all the fields before submitting.");
        return;
      }

      // ✅ Send Data to Backend
      const dbResponse = await axios.post(
        "http://localhost:5000/api/mock-interview",
        postData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Data Inserted Successfully:", dbResponse.data);
      alert("Interview successfully created!");
      navigate(`/dashboard/interview/${interviewid}`);

    } catch (error) {
      if (error.response) {
        console.error("🚨 Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
      } else if (error.request) {
        console.error("🚨 No response from server:", error.request);
        alert("Server is not responding. Please check your backend.");
      } else {
        console.error("🚨 Request setup error:", error.message);
        alert("An unexpected error occurred.");
      }
    }

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <div className="addContainer" onClick={handleOpen} style={{ cursor: "pointer" }}>
        <h3 className="add">+ Add New</h3>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ borderRadius: 12 }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Tell us more about the Job you are interviewing
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ borderRadius: 12 }}>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Add details about job position, your skills, and years of experience
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Job Position / Role Name"
              variant="outlined"
              fullWidth
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              error={!!errors.jobPosition}
              helperText={errors.jobPosition}
              sx={{ borderRadius: 12 }}
            />
            <TextField
              label="Job Description / Tech Stack in Short"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              error={!!errors.jobDescription}
              helperText={errors.jobDescription}
              sx={{ borderRadius: 12 }}
            />
            <TextField
              label="No of Years Experience"
              variant="outlined"
              fullWidth
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              error={!!errors.experience}
              helperText={errors.experience}
              sx={{ borderRadius: 12 }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ paddingBottom: "16px" }}>
          <Button onClick={handleClose} variant="outlined" color="inherit" sx={{ marginRight: "1rem" }}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#3621b0",
              marginRight: "1rem",
              marginLeft: "1.5rem",
              color: "white",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {loading ? (
              <span>
                <CircularProgress size={16} color="inherit" style={{ marginRight: "8px" }} />
                Generating from AI
              </span>
            ) : (
              "Start Interview"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
