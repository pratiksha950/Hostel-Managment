import Review from "../models/Review.js";

const addReview = async (req, res) => {
    try {
        const review = new Review({ message: req.body.message });
        await review.save();
        res.json({
            success: true,
            message: "Successfully add",
            data: review
        });
    } catch (err) {
        console.log(err);
        res.json({ success: false, error: "Failed to save review" });
    }
}

const updateReview = async (req, res) => {
    const updated = await Review.findByIdAndUpdate(
        req.params.id,
        { message: req.body.message },
        { new: true }
    );

    res.json({
        success: true,
        message: "Successfully Update",
        data: updated
    });
}

const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Deleted successfully"
        });
    } catch (err) {
        res.json({
            success: false,
            error: "Delete failed"
        });
    }
}

const getReview = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Data successfully fetch",
            data: reviews
        });
    } catch (err) {
        res.json({
            success: false,
            error: "Failed to fetch reviews"
        });
    }
}

export { addReview, getReview, updateReview, deleteReview }