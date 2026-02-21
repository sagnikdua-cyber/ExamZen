import mongoose, { Schema, model, models } from 'mongoose';

const SubjectInsightSchema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, unique: true },

    mostImportantChapters: [{
        name: String,
        topics: [String],
        frequency: Number // Percentage
    }],

    leastImportantChapters: [{
        name: String,
        topics: [String],
        frequency: Number // Percentage
    }],

    flashcards: [{
        chapter: String,
        cards: [{
            title: String,
            definition: String,
            formula: String,
            keyPoints: [String]
        }]
    }],

    probableQuestions: [{
        chapter: String,
        questions: [{
            question: String,
            marks: Number,
            reasoning: String,
            repetitionLikelihood: String // High, Medium, Low
        }]
    }],

    topicFrequencyMap: { type: Schema.Types.Mixed, default: {} },

    lastAnalyzed: { type: Date, default: Date.now }
}, { timestamps: true });

const SubjectInsight = models.SubjectInsight || model('SubjectInsight', SubjectInsightSchema);

export default SubjectInsight;
