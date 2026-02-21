import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    progress: {
        solvedPYQs: [{ type: Schema.Types.ObjectId, ref: 'PYQ' }],
        aiQuestionsCount: { type: Number, default: 0 },
        vivaUsage: [{
            subjectSlug: String,
            count: { type: Number, default: 0 },
            lastAccessed: { type: Date, default: Date.now }
        }],
        viewedFlashcards: [{ type: String }], // Flashcard IDs or some identifier
        subjectScores: [{
            subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
            score: { type: Number, default: 0 }
        }]
    },
    onboardingSeen: { type: Boolean, default: false },
    lastResetDate: { type: Date, default: Date.now },
    year: { type: Number, default: 1 },
    college: { type: String, default: 'UEM Kolkata' },
    createdAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);

export default User;
