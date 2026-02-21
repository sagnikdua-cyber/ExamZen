import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subject from "@/models/Subject";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const db = await dbConnect();
    if (!db) {
        return NextResponse.json({ error: "Database connection unavailable" }, { status: 503 });
    }

    try {
        const subject = await Subject.findById(id);

        if (!subject) {
            return NextResponse.json({ error: "Subject not found" }, { status: 404 });
        }

        return NextResponse.json(subject);
    } catch (error) {
        console.error("Failed to fetch subject:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
