import Application from "../models/Application.js";

// Student applies for room
export const applyRoom = async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.json({ message: "Application submitted", data: newApp });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all applications (Admin)
export const getApplications = async (req, res) => {
  try {
    const apps = await Application.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update status (Accept / Reject)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};