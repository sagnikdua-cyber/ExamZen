import mongoose, { Schema, model, models } from 'mongoose';

const AICacheSchema = new Schema({
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    queryHash: { type: String, required: true, index: true },
    query: { type: String, required: true },
    response: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' } // Cache expires in 7 days
});

// Compound index for fast lookup
AICacheSchema.index({ subjectId: 1, queryHash: 1 });

const AICache = models.AICache || model('AICache', AICacheSchema);

export default AICache;
