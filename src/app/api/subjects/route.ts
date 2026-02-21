import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Subject from '@/models/Subject';

export async function GET() {
    const db = await dbConnect();
    if (!db) {
        return NextResponse.json({ error: 'Database connection unavailable' }, { status: 503 });
    }

    try {
        const seedSubjects = [
            { name: "Basic Electronics Engineering", code: "EC201", category: "Core", semester: 2 },
            { name: "Mathematics and Basic Statistics", code: "M101", category: "Core", semester: 1 },
            { name: "Mathematics Calculus", code: "M201", category: "Core", semester: 2 },
            { name: "Programming Language C", code: "CS201", category: "Core", semester: 1 },
            { name: "Chemistry", code: "CH101", category: "Basic Science", semester: 2 },
            { name: "Physics", code: "PH101", category: "Basic Science", semester: 1 },
            { name: "Engineering Mechanics Essential", code: "ME201", category: "Core", semester: 1 },
            { name: "Engineering Mechanics Principles", code: "ME202", category: "Core", semester: 2 },
            { name: "Basic Electrical Engineering", code: "EE101", category: "Core", semester: 1 },
            { name: "English", code: "HU101", category: "Humanities", semester: 1 },
            { name: "Biology", code: "BI101", category: "Basic Science", semester: 2 },
            { name: "Python", code: "CS191", category: "Core", semester: 2 },
        ];

        // Use upsert to maintain stable IDs
        for (const sub of seedSubjects) {
            await Subject.findOneAndUpdate(
                { code: sub.code },
                sub,
                { upsert: true, new: true }
            );
        }

        const subjects = await Subject.find({});
        return NextResponse.json(subjects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
    }
}
