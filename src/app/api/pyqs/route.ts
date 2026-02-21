import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PYQ from '@/models/PYQ';
import Subject from '@/models/Subject';

export async function GET(request: Request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId');

    try {
        const query = subjectId ? { subjectId } : {};
        const pyqs = await PYQ.find(query).populate('subjectId', 'name');

        return NextResponse.json(pyqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch PYQs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const pyq = await PYQ.create(body);
        return NextResponse.json(pyq, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create PYQ' }, { status: 500 });
    }
}
