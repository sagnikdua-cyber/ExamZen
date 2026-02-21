import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import PYQ from "@/models/PYQ";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await dbConnect();

    try {
        const pyqs = await PYQ.find({ subjectId: id }).sort({ year: -1 });
        return NextResponse.json(pyqs);
    } catch (error) {
        console.error("Failed to fetch PYQs:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
