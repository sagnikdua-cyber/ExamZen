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
            { subjectId: find("BI101")?._id, year: 2021, questionText: "What are enzymes? Explain the lock and key mechanism of enzyme action.", marks: 5, difficulty: "Medium", topics: ["Enzymes"], repetitionCount: 2, fileUrl: null },

            // Mathematics Calculus (M201)
            { subjectId: find("M201")?._id, year: 2025, questionText: "State and prove Rolle's Theorem.", marks: 10, difficulty: "Hard", topics: ["Differential Calculus", "Theorems"], repetitionCount: 3, fileUrl: "/pyqs/M201_2025.pdf" },
            { subjectId: find("M201")?._id, year: 2025, questionText: "Evaluate the double integral of (x+y) dxdy over the region bounded by y=x and y=x^2.", marks: 10, difficulty: "Hard", topics: ["Multivariable Integral Calculus"], repetitionCount: 2, fileUrl: "/pyqs/M201_2025.pdf" },
            { subjectId: find("M201")?._id, year: 2022, questionText: "Expand sin(x) as a Taylor series around x=0.", marks: 5, difficulty: "Medium", topics: ["Sequence and Series", "Taylor Series"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("M201")?._id, year: 2022, questionText: "Find the maxima and minima of the function f(x,y) = x^3 + y^3 - 3xy.", marks: 10, difficulty: "Hard", topics: ["Multivariable Differential Calculus"], repetitionCount: 3, fileUrl: null },
            { subjectId: find("M201")?._id, year: 2021, questionText: "Use Green's Theorem to evaluate the line integral.", marks: 10, difficulty: "Hard", topics: ["Vector Calculus", "Theorems"], repetitionCount: 2, fileUrl: null },

            // Mathematics Statistics (M101)
            { subjectId: find("M101")?._id, year: 2025, questionText: "Find the eigenvalues and eigenvectors of a 3x3 matrix.", marks: 10, difficulty: "Hard", topics: ["Matrices", "Eigenvalues"], repetitionCount: 5, fileUrl: "/pyqs/M101_2025.pdf" },
            { subjectId: find("M101")?._id, year: 2025, questionText: "State and prove the Rank-Nullity Theorem.", marks: 10, difficulty: "Medium", topics: ["Vector Space", "Theorems"], repetitionCount: 2, fileUrl: "/pyqs/M101_2025.pdf" },
            { subjectId: find("M101")?._id, year: 2019, questionText: "Calculate the coefficient of correlation for the given data set.", marks: 5, difficulty: "Medium", topics: ["Basic Statistics", "Correlation"], repetitionCount: 4, fileUrl: "/pyqs/M101_2019.pdf" },
            { subjectId: find("M101")?._id, year: 2019, questionText: "Solve the linear system of equations using Gauss elimination.", marks: 10, difficulty: "Medium", topics: ["Matrices", "Linear Systems"], repetitionCount: 3, fileUrl: "/pyqs/M101_2019.pdf" },
            { subjectId: find("M101")?._id, year: 2021, questionText: "Find the regression line of y on x.", marks: 5, difficulty: "Easy", topics: ["Basic Statistics", "Regression"], repetitionCount: 3, fileUrl: null },

            // Chemistry (CH101)
            { subjectId: find("CH101")?._id, year: 2025, questionText: "Derive the energy expression for a particle in a 1D box.", marks: 10, difficulty: "Hard", topics: ["Atomic Structure", "Quantum Mechanics"], repetitionCount: 4, fileUrl: "/pyqs/CH101_2025.pdf" },
            { subjectId: find("CH101")?._id, year: 2024, questionText: "Explain the selection rules for vibrational spectroscopy.", marks: 5, difficulty: "Medium", topics: ["Spectroscopy"], repetitionCount: 3, fileUrl: "/pyqs/CH101_2024.pdf" },
            { subjectId: find("CH101")?._id, year: 2020, questionText: "Define Entropy and explain the second law of thermodynamics.", marks: 5, difficulty: "Medium", topics: ["Thermodynamics"], repetitionCount: 5, fileUrl: "/pyqs/CH101_2020.pdf" },
            { subjectId: find("CH101")?._id, year: 2022, questionText: "Discuss the aromaticity of Benzene using molecular orbital theory.", marks: 10, difficulty: "Hard", topics: ["Organic Chemistry", "Aromaticity"], repetitionCount: 2, fileUrl: null },
            { subjectId: find("CH101")?._id, year: 2021, questionText: "What are enantiomers and diastereomers? Give examples.", marks: 5, difficulty: "Easy", topics: ["Stereochemistry"], repetitionCount: 3, fileUrl: null },

            // Physics (PH101)
            { subjectId: find("PH101")?._id, year: 2025, questionText: "Derive Maxwell's electromagnetic wave equations in vacuum.", marks: 10, difficulty: "Hard", topics: ["Maxwell's equations"], repetitionCount: 3, fileUrl: "/pyqs/PH101_2025.pdf" },
            { subjectId: find("PH101")?._id, year: 2024, questionText: "Explain the working principle of a Ruby Laser.", marks: 10, difficulty: "Medium", topics: ["Laser"], repetitionCount: 4, fileUrl: "/pyqs/PH101_2024.pdf" },
            { subjectId: find("PH101")?._id, year: 2020, questionText: "Differentiate between Fraunhofer and Fresnel diffraction.", marks: 5, difficulty: "Easy", topics: ["Diffraction"], repetitionCount: 6, fileUrl: "/pyqs/PH101_2020.pdf" },
            { subjectId: find("PH101")?._id, year: 2019, questionText: "Discuss the physical significance of the wave function.", marks: 5, difficulty: "Medium", topics: ["Quantum Mechanics"], repetitionCount: 2, fileUrl: "/pyqs/PH101_2019.pdf" },
            { subjectId: find("PH101")?._id, year: 2021, questionText: "State the laws of thermodynamics for statistical systems.", marks: 5, difficulty: "Medium", topics: ["Statistical Mechanics"], repetitionCount: 3, fileUrl: null },

            // Basic Electrical Engineering (EE101)
            { subjectId: find("EE101")?._id, year: 2025, questionText: "State and explain Thevenin's Theorem with an example circuit.", marks: 10, difficulty: "Medium", topics: ["DC Circuits", "Theorems"], repetitionCount: 7, fileUrl: "/pyqs/EE101_2025.pdf" },
            { subjectId: find("EE101")?._id, year: 2024, questionText: "An RLC series circuit has R=10, L=0.1, C=100uF. Calculate resonance frequency.", marks: 10, difficulty: "Hard", topics: ["AC Circuits", "Resonance"], repetitionCount: 4, fileUrl: "/pyqs/EE101_2024.pdf" },
            { subjectId: find("EE101")?._id, year: 2020, questionText: "Explain the principle of operation of a single-phase transformer.", marks: 5, difficulty: "Easy", topics: ["Transformers"], repetitionCount: 5, fileUrl: "/pyqs/EE101_2020.pdf" },
            { subjectId: find("EE101")?._id, year: 2022, questionText: "Discuss the torque-slip characteristic of a 3-phase induction motor.", marks: 10, difficulty: "Hard", topics: ["Electrical Machines"], repetitionCount: 3, fileUrl: null },
            { subjectId: find("EE101")?._id, year: 2021, questionText: "What is an ELCB? Explain its working and necessity.", marks: 5, difficulty: "Easy", topics: ["Electrical Installations"], repetitionCount: 2, fileUrl: null },

            // Basic Electronics Engineering (EC201)
            { subjectId: find("EC201")?._id, year: 2025, questionText: "Explain the working of a Full Wave Bridge Rectifier with a neat diagram.", marks: 10, difficulty: "Medium", topics: ["Rectifiers", "Diodes"], repetitionCount: 3, fileUrl: "/pyqs/EC201_2025.pdf" },
            { subjectId: find("EC201")?._id, year: 2020, questionText: "Differentiate between BJT and FET transistors.", marks: 5, difficulty: "Easy", topics: ["Transistors", "BJT", "FET"], repetitionCount: 2, fileUrl: "/pyqs/EC201_2020.pdf" },
            { subjectId: find("EC201")?._id, year: 2022, questionText: "Explain the V-I characteristics of a Zener Diode.", marks: 5, difficulty: "Easy", topics: ["Diodes", "Zener Diode"], repetitionCount: 5, fileUrl: null },
            { subjectId: find("EC201")?._id, year: 2022, questionText: "Design an inverting amplifier using Op-Amp with a gain of 10.", marks: 10, difficulty: "Medium", topics: ["Op-Amp", "Amplifiers"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("EC201")?._id, year: 2021, questionText: "State De Morgan's Theorems and verify using truth tables.", marks: 5, difficulty: "Easy", topics: ["Digital Logic"], repetitionCount: 3, fileUrl: null },

            // C Programming (CS201)
            { subjectId: find("CS201")?._id, year: 2025, questionText: "Write a C program to find the factorial of a number using recursion.", marks: 5, difficulty: "Easy", topics: ["Recursion", "Functions"], repetitionCount: 4, fileUrl: "/pyqs/CS201_2025.pdf" },
            { subjectId: find("CS201")?._id, year: 2023, questionText: "What are pointers? Explain pointer arithmetic with examples.", marks: 10, difficulty: "Hard", topics: ["Pointers"], repetitionCount: 2, fileUrl: null },
            { subjectId: find("CS201")?._id, year: 2022, questionText: "Explain the difference between call by value and call by reference.", marks: 5, difficulty: "Medium", topics: ["Functions", "Pointers"], repetitionCount: 3, fileUrl: null },
            { subjectId: find("CS201")?._id, year: 2022, questionText: "Define a structure for a student and write a program to store data for 5 students.", marks: 10, difficulty: "Medium", topics: ["Structures"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("CS201")?._id, year: 2021, questionText: "Explain the different file opening modes in C.", marks: 5, difficulty: "Easy", topics: ["File Handling"], repetitionCount: 2, fileUrl: null },

            // Python (CS191)
            { subjectId: find("CS191")?._id, year: 2025, questionText: "What are list comprehensions in Python? Give an example.", marks: 5, difficulty: "Easy", topics: ["Lists", "Comprehensions"], repetitionCount: 2, fileUrl: "/pyqs/CS191_2025.pdf" },
            { subjectId: find("CS191")?._id, year: 2023, questionText: "Explain the difference between a list and a tuple.", marks: 5, difficulty: "Easy", topics: ["Data Structures"], repetitionCount: 6, fileUrl: null },
            { subjectId: find("CS191")?._id, year: 2022, questionText: "How do you handle exceptions in Python? Explain with try-except block.", marks: 5, difficulty: "Medium", topics: ["Exception Handling"], repetitionCount: 3, fileUrl: null },
            { subjectId: find("CS191")?._id, year: 2022, questionText: "Write a program to perform matrix multiplication using NumPy.", marks: 10, difficulty: "Medium", topics: ["NumPy", "Matrices"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("CS191")?._id, year: 2021, questionText: "What is the purpose of __init__ method in Python classes?", marks: 5, difficulty: "Easy", topics: ["OOP", "Classes"], repetitionCount: 2, fileUrl: null },

            // English (HU101)
            { subjectId: find("HU101")?._id, year: 2025, questionText: "Write a formal letter to your Principal requesting a character certificate.", marks: 10, difficulty: "Easy", topics: ["Writing Practice", "Formal Letters"], repetitionCount: 3, fileUrl: "/pyqs/HU101_2025.pdf" },
            { subjectId: find("HU101")?._id, year: 2024, questionText: "Identify the common errors: 'Each of the students have completed their work.'", marks: 5, difficulty: "Medium", topics: ["Common Errors", "Grammar"], repetitionCount: 5, fileUrl: "/pyqs/HU101_2024.pdf" },
            { subjectId: find("HU101")?._id, year: 2020, questionText: "What are root words? Explain with two examples each for prefixes and suffixes.", marks: 5, difficulty: "Easy", topics: ["Vocabulary Building"], repetitionCount: 2, fileUrl: "/pyqs/HU101_2020.pdf" },
            { subjectId: find("HU101")?._id, year: 2022, questionText: "Organize the given sentences into a coherent paragraph.", marks: 10, difficulty: "Medium", topics: ["Basic Writing Skills"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("HU101")?._id, year: 2021, questionText: "Draft a CV for the post of a Junior Software Engineer.", marks: 10, difficulty: "Medium", topics: ["Writing Practice", "CV Writing"], repetitionCount: 3, fileUrl: null },

            // Mechanics Essential (ME201)
            { subjectId: find("ME201")?._id, year: 2025, questionText: "State and prove Lami's Theorem.", marks: 5, difficulty: "Medium", topics: ["Force System", "Theorems"], repetitionCount: 5, fileUrl: "/pyqs/ME201_2025.pdf" },
            { subjectId: find("ME201")?._id, year: 2023, questionText: "Find the centroid of a T-section with given dimensions.", marks: 10, difficulty: "Hard", topics: ["Centroid", "Moment of Inertia"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("ME201")?._id, year: 2022, questionText: "State D'Alembert's principle and apply it to a block moving on an inclined plane.", marks: 10, difficulty: "Medium", topics: ["Dynamic Equilibrium"], repetitionCount: 3, fileUrl: null },
            { subjectId: find("ME201")?._id, year: 2022, questionText: "Explain the work-energy principle for a particle.", marks: 5, difficulty: "Easy", topics: ["Work, Energy & Power"], repetitionCount: 2, fileUrl: null },
            { subjectId: find("ME201")?._id, year: 2021, questionText: "What is mass moment of inertia? How is it different from area moment of inertia?", marks: 5, difficulty: "Medium", topics: ["Moment of Inertia"], repetitionCount: 3, fileUrl: null },

            // Mechanics Principles (ME202)
            { subjectId: find("ME202")?._id, year: 2025, questionText: "Analyze the given truss using the Method of Joints.", marks: 10, difficulty: "Hard", topics: ["Structural Analysis", "Trusses"], repetitionCount: 3, fileUrl: "/pyqs/ME202_2025.pdf" },
            { subjectId: find("ME202")?._id, year: 2023, questionText: "State the laws of static friction.", marks: 5, difficulty: "Easy", topics: ["Friction"], repetitionCount: 6, fileUrl: null },
            { subjectId: find("ME202")?._id, year: 2022, questionText: "Derive the equations of motion for a projectile.", marks: 10, difficulty: "Medium", topics: ["Kinematics"], repetitionCount: 4, fileUrl: null },
            { subjectId: find("ME202")?._id, year: 2022, questionText: "A force system is given. Find the resultant and its direction.", marks: 5, difficulty: "Easy", topics: ["Force System", "Vectors"], repetitionCount: 2, fileUrl: null },
            { subjectId: find("ME202")?._id, year: 2021, questionText: "Define relative motion and give an example.", marks: 5, difficulty: "Easy", topics: ["Kinematics"], repetitionCount: 3, fileUrl: null },
        ].filter((p) => p.subjectId != null);

        // Build one PYQ doc per (subject, year) pair with all questions inside extractedContent
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

        const pyqs = Object.values(grouped);

        await PYQ.deleteMany({});
        const result = await PYQ.insertMany(pyqs);

        return NextResponse.json({
            success: true,
            subjectsSeeded: subjects.length,
            pyqsSeeded: result.length,
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Seed failed", details: error.message }, { status: 500 });
    }
}
