import Suggestion from "../models/Suggestion.js";

export const createSuggestion = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const suggestion = await Suggestion.create({
      name,
      email,
      message,
    });

    res.json({
      success: true,
      message: "Suggestion sent successfully",
      data: suggestion,
    });
  } catch (error) {
    console.error("Create Suggestion Error:", error);
    res.json({
      success: false,
      message: "Server error",
    });
  }
};