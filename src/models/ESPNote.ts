import mongoose, { Schema, model, models } from 'mongoose';

const ESPNoteSchema = new Schema({
    subject: { type: String, required: true }, // e.g. "History", "Polity"
    chapter: { type: String, required: true },
    content: { type: String, required: true }, // the uploaded notes text
    createdAt: { type: Date, default: Date.now },
    generatedQuestions: [{
        question: String,
        answer: String,
        marks: Number
    }],
    generatedFlashcards: [{
        front: String,
        back: String
    }]
});

ESPNoteSchema.index({ subject: 1, chapter: 1 });

const ESPNote = models.ESPNote || model('ESPNote', ESPNoteSchema);

export default ESPNote;
