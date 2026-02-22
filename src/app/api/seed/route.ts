import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subject from "@/models/Subject";
import PYQ from "@/models/PYQ";

export async function GET() {
    const db = await dbConnect();
    if (!db) {
        return NextResponse.json({ error: "Database connection unavailable" }, { status: 503 });
    }

    try {
        // ── Step 1: Seed Subjects ──────────────────────────────────────────
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

        for (const sub of seedSubjects) {
            await Subject.findOneAndUpdate({ code: sub.code }, sub, { upsert: true, new: true });
        }

        const subjects = await Subject.find({});

        const find = (code: string) => subjects.find((s) => s.code === code);

        // ── Step 2: Seed PYQs ─────────────────────────────────────────────
        const rawData = [
            // Biology (BI101)
            { subjectId: find("BI101")?._id, year: 2025, questionText: "Explain Mendel's laws of inheritance with suitable examples.", marks: 10, difficulty: "Medium", topics: ["Genetics", "Mendel's Laws"], repetitionCount: 4, fileUrl: "/pyqs/BI101_2025.pdf" },
            { subjectId: find("BI101")?._id, year: 2025, questionText: "Describe the structure and function of the mitochondria.", marks: 5, difficulty: "Easy", topics: ["Cell Biology", "Organelles"], repetitionCount: 3, fileUrl: "/pyqs/BI101_2025.pdf" },
            { subjectId: find("BI101")?._id, year: 2023, questionText: "Explain the process of Glycolysis with a flow chart.", marks: 10, difficulty: "Hard", topics: ["Metabolism", "Respiration"], repetitionCount: 5, fileUrl: null },
            { subjectId: find("BI101")?._id, year: 2022, questionText: "Differentiate between Prokaryotic and Eukaryotic cells.", marks: 5, difficulty: "Easy", topics: ["Classification", "Cell structure"], repetitionCount: 6, fileUrl: null },

            // Mathematics Calculus (M201)
            { subjectId: find("M201")?._id, year: 2025, questionText: "State and prove Rolle's Theorem.", marks: 10, difficulty: "Hard", topics: ["Differential Calculus", "Theorems"], repetitionCount: 3, fileUrl: "/pyqs/M201_2025.pdf" },
            { subjectId: find("M201")?._id, year: 2025, questionText: "Evaluate the double integral of (x+y) dxdy over the region bounded by y=x and y=x^2.", marks: 10, difficulty: "Hard", topics: ["Multivariable Integral Calculus"], repetitionCount: 2, fileUrl: "/pyqs/M201_2025.pdf" },
            { subjectId: find("M201")?._id, year: 2024, questionText: "Find the maxima and minima of f(x,y).", marks: 10, difficulty: "Hard", topics: ["Multivariable Calculus"], repetitionCount: 3, fileUrl: null },

            // C Programming (CS201)
            { subjectId: find("CS201")?._id, year: 2025, questionText: "Write a C program to find the factorial of a number using recursion.", marks: 5, difficulty: "Easy", topics: ["Recursion", "Functions"], repetitionCount: 4, fileUrl: "/pyqs/CS201_2025.pdf" },
            { subjectId: find("CS201")?._id, year: 2025, questionText: "Explain pointers and pointer arithmetic.", marks: 10, difficulty: "Hard", topics: ["Pointers"], repetitionCount: 2, fileUrl: "/pyqs/CS201_2025.pdf" },
            { subjectId: find("CS201")?._id, year: 2024, questionText: "Differentiate between call by value and call by reference.", marks: 5, difficulty: "Medium", topics: ["Functions"], repetitionCount: 3, fileUrl: null },

            // Basic Electronics (EC201)
            { subjectId: find("EC201")?._id, year: 2025, questionText: "Explain the working of a Full Wave Bridge Rectifier with a neat diagram.", marks: 10, difficulty: "Medium", topics: ["Rectifiers", "Diodes"], repetitionCount: 3, fileUrl: "/pyqs/EC201_2025.pdf" },
            { subjectId: find("EC201")?._id, year: 2020, questionText: "Differentiate between BJT and FET transistors.", marks: 5, difficulty: "Easy", topics: ["Transistors"], repetitionCount: 2, fileUrl: "/pyqs/EC201_2020.pdf" },

            // Basic Electrical (EE101)
            { subjectId: find("EE101")?._id, year: 2025, questionText: "State and explain Thevenin's Theorem with an example circuit.", marks: 10, difficulty: "Medium", topics: ["DC Circuits", "Theorems"], repetitionCount: 7, fileUrl: "/pyqs/EE101_2025.pdf" },
            { subjectId: find("EE101")?._id, year: 2024, questionText: "An RLC series circuit resonance calculation.", marks: 10, difficulty: "Hard", topics: ["AC Circuits"], repetitionCount: 4, fileUrl: "/pyqs/EE101_2024.pdf" },

            // Physics (PH101)
            { subjectId: find("PH101")?._id, year: 2025, questionText: "Derive Maxwell's electromagnetic wave equations in vacuum.", marks: 10, difficulty: "Hard", topics: ["Maxwell's equations"], repetitionCount: 3, fileUrl: "/pyqs/PH101_2025.pdf" },
            { subjectId: find("PH101")?._id, year: 2024, questionText: "Explain the working principle of a Ruby Laser.", marks: 10, difficulty: "Medium", topics: ["Laser"], repetitionCount: 4, fileUrl: "/pyqs/PH101_2024.pdf" },

            // Chemistry (CH101)
            { subjectId: find("CH101")?._id, year: 2025, questionText: "Derive the energy expression for a particle in a 1D box.", marks: 10, difficulty: "Hard", topics: ["Quantum Mechanics"], repetitionCount: 4, fileUrl: "/pyqs/CH101_2025.pdf" },
            { subjectId: find("CH101")?._id, year: 2024, questionText: "Explain the selection rules for vibrational spectroscopy.", marks: 5, difficulty: "Medium", topics: ["Spectroscopy"], repetitionCount: 3, fileUrl: "/pyqs/CH101_2024.pdf" },

            // English (HU101)
            { subjectId: find("HU101")?._id, year: 2025, questionText: "Write a formal letter requesting a character certificate.", marks: 10, difficulty: "Easy", topics: ["Writing Practice"], repetitionCount: 3, fileUrl: "/pyqs/HU101_2025.pdf" },
            { subjectId: find("HU101")?._id, year: 2020, questionText: "Discuss the importance of root words in vocabulary building.", marks: 5, difficulty: "Easy", topics: ["Vocabulary"], repetitionCount: 2, fileUrl: "/pyqs/HU101_2020.pdf" },

            // Mechanics Essential (ME201)
            { subjectId: find("ME201")?._id, year: 2025, questionText: "State and prove Lami's Theorem.", marks: 5, difficulty: "Medium", topics: ["Force System"], repetitionCount: 5, fileUrl: "/pyqs/ME201_2025.pdf" },

            // Mechanics Principles (ME202)
            { subjectId: find("ME202")?._id, year: 2025, questionText: "Analyze the given truss using the Method of Joints.", marks: 10, difficulty: "Hard", topics: ["Structural Analysis"], repetitionCount: 3, fileUrl: "/pyqs/ME202_2025.pdf" },

            // Math Stats (M101)
            { subjectId: find("M101")?._id, year: 2025, questionText: "Find the eigenvalues and eigenvectors of a 3x3 matrix.", marks: 10, difficulty: "Hard", topics: ["Matrices"], repetitionCount: 5, fileUrl: "/pyqs/M101_2025.pdf" },
            { subjectId: find("M101")?._id, year: 2019, questionText: "Calculate the coefficient of correlation for the given data.", marks: 5, difficulty: "Medium", topics: ["Statistics"], repetitionCount: 4, fileUrl: "/pyqs/M101_2019.pdf" },

            // Python (CS191)
            { subjectId: find("CS191")?._id, year: 2025, questionText: "Explain list comprehensions in Python with an example.", marks: 5, difficulty: "Easy", topics: ["Python Basics"], repetitionCount: 2, fileUrl: "/pyqs/CS191_2025.pdf" },
        ].filter((p) => p.subjectId != null);

        // Clear existing to avoid duplicates while testing
        await PYQ.deleteMany({});

        // Build one PYQ doc per (subject, year) pair
        const grouped: Record<string, any> = {};
        for (const item of rawData) {
            const key = `${item.subjectId}_${item.year}`;
            if (!grouped[key]) {
                grouped[key] = {
                    subjectId: item.subjectId,
                    year: item.year,
                    marks: item.marks,
                    difficulty: item.difficulty,
                    topics: item.topics,
                    repetitionCount: item.repetitionCount,
                    fileUrl: item.fileUrl || null,
                    extractedContent: { questions: [item.questionText] },
                };
            } else {
                grouped[key].extractedContent.questions.push(item.questionText);
            }
        }

        const pyqsToInsert = Object.values(grouped);
        const result = await PYQ.insertMany(pyqsToInsert);

        return NextResponse.json({
            success: true,
            subjectsSeeded: subjects.length,
            pyqsSeeded: result.length,
            message: "Database seeded successfully. Refresh your subject pages now!"
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Seed failed", details: error.message }, { status: 500 });
    }
}
