const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function countProcessed() {
    await mongoose.connect(process.env.MONGODB_URI);
    const PYQSchema = new mongoose.Schema({ extractedContent: Object });
    const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);
    const count = await PYQ.countDocuments({ extractedContent: { $exists: true } });
    console.log('Processed PYQs:', count);
    await mongoose.disconnect();
}

countProcessed();
