import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Feedback from "@/models/Feedback";

export async function GET() {
    try {
        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ message: "Database connection unavailable" }, { status: 503 });
        }
        const feedbackList = await Feedback.find().sort({ createdAt: -1 });
        return NextResponse.json(feedbackList);
    } catch (error: any) {
        console.error("Feedback API GET error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { message, rating } = await req.json();

        if (!message || !rating) {
            return NextResponse.json({ message: "Message and rating are required" }, { status: 400 });
        }

        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ message: "Database connection unavailable" }, { status: 503 });
        }

        const newFeedback = new Feedback({
            username: (session.user as any).name || "Anonymous Student",
            message,
            rating,
        });

        await newFeedback.save();

        return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Feedback API POST error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
