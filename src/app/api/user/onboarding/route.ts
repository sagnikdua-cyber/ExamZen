import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const db = await dbConnect();
        if (!db) {
            return NextResponse.json({ message: "Database connection unavailable" }, { status: 503 });
        }

        const userId = (session.user as any).id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { onboardingSeen: true },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Onboarding completed successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Onboarding API error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
