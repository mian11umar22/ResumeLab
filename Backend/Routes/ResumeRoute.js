const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    updateResumeSection,
    deleteResume,
    duplicateResume,
    updateTemplate
} = require("../Controller/ResumeController");

// All routes are protected
router.use(authMiddleware);

// Create a new resume
router.post("/", createResume);

// Get all resumes for the logged-in user
router.get("/", getAllResumes);

// Get a single resume by ID
router.get("/:id", getResumeById);

// Update a resume
router.put("/:id", updateResume);

// Update specific section of resume
router.put("/:id/section/:section", updateResumeSection);

// Update template
router.put("/:id/template", updateTemplate);

// Duplicate a resume
router.post("/:id/duplicate", duplicateResume);

// Delete a resume
router.delete("/:id", deleteResume);

module.exports = router;
