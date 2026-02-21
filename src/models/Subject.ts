import mongoose, { Schema, model, models } from 'mongoose';

const SubjectSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    category: {
        type: String,
        enum: ['Core', 'Sessional', 'Humanities', 'Basic Science'],
        required: true
    },
    semester: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
});

const Subject = models.Subject || model('Subject', SubjectSchema);

export default Subject;
