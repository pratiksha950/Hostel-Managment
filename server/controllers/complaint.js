import Complaint from "../models/Complaint.js";

const createComplaint = async (req, res) => {
  try {
    const { category, urgency, description } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const complaint = new Complaint({
      student: studentId,
      category,
      urgency,
      description,
    });

    const savedComplaint = await complaint.save();
    return res.json({ success: true, message: "Complaint submitted", data: savedComplaint });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    if (req.user.role === "warden" || req.user.role === "maintenance") {
      const complaints = await Complaint.find().populate("student", "name email");
      return res.json({ success: true, data: complaints });
    }

    const studentId = req.user?.id;
    const complaints = await Complaint.find({ student: studentId });
    return res.json({ success: true, data: complaints });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    if (req.user.role !== "warden" && req.user.role !== "maintenance") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { id } = req.params;
    const { status, assignedTo } = req.body;

    if (!["Open", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status, assignedTo },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    return res.json({ success: true, message: "Complaint updated", data: updatedComplaint });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createComplaint, getComplaints, updateComplaintStatus };
