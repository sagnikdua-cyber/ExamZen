const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function clearPYQs() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const PYQSchema = new mongoose.Schema({}, { strict: false });
        const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);

        const result = await PYQ.deleteMany({});
        console.log(`Deleted ${result.deletedCount} PYQ records.`);

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

clearPYQs();
