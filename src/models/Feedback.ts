import mongoose, { Schema, model, models } from 'mongoose';

const FeedbackSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
});

const Feedback = models.Feedback || model('Feedback', FeedbackSchema);

export default Feedback;
