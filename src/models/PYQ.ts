import mongoose, { Schema, model, models } from 'mongoose';

const PYQSchema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    year: { type: Number, required: true },
    questionText: { type: String, required: true },
    answerText: { type: String }, // Provided by AI or user
    fileUrl: { type: String },
    topics: [{ type: String }],
    chapter: { type: String },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    marks: { type: Number, default: 2 },
    repetitionCount: { type: Number, default: 1 },
    isImportant: { type: Boolean, default: false },
    isPredicted: { type: Boolean, default: false },
    extractedContent: {
        questions: [{ type: String }]
    },
}, { timestamps: true });

const PYQ = models.PYQ || model('PYQ', PYQSchema);

export default PYQ;
