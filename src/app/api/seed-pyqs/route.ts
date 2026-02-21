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
        const subjects = await Subject.find({});
        const electronics = subjects.find(s => s.code === "EC201");
        const mathStats = subjects.find(s => s.code === "M101");
        const mathCalc = subjects.find(s => s.code === "M201");
        const cLanguage = subjects.find(s => s.code === "CS201");
        const chemistry = subjects.find(s => s.code === "CH101");
        const physics = subjects.find(s => s.code === "PH101");
        const mechEss = subjects.find(s => s.code === "ME201");
        const mechPrinc = subjects.find(s => s.code === "ME202");
        const electrical = subjects.find(s => s.code === "EE101");
        const english = subjects.find(s => s.code === "HU101");
        const biology = subjects.find(s => s.code === "BI101");
        const python = subjects.find(s => s.code === "CS191");


        const rawData = [
            // Biology (BI101)
            { subjectId: biology?._id, year: 2025, questionText: "Explain Mendel's laws of inheritance with suitable examples.", marks: 10, difficulty: "Medium", topics: ["Genetics", "Mendel's Laws"], repetitionCount: 4 },
            { subjectId: biology?._id, year: 2025, questionText: "Describe the structure and function of the mitochondria.", marks: 5, difficulty: "Easy", topics: ["Cell Biology", "Organelles"], repetitionCount: 3 },
            { subjectId: biology?._id, year: 2023, questionText: "Explain the process of Glycolysis with a flow chart.", marks: 10, difficulty: "Hard", topics: ["Metabolism", "Respiration"], repetitionCount: 5 },
            { subjectId: biology?._id, year: 2022, questionText: "Differentiate between Prokaryotic and Eukaryotic cells.", marks: 5, difficulty: "Easy", topics: ["Classification", "Cell structure"], repetitionCount: 6 },
            { subjectId: biology?._id, year: 2021, questionText: "What are enzymes? Explain the lock and key mechanism of enzyme action.", marks: 5, difficulty: "Medium", topics: ["Enzymes"], repetitionCount: 2 },

            // Mathematics Calculus (M201)
            { subjectId: mathCalc?._id, year: 2025, questionText: "State and prove Rolle's Theorem.", marks: 10, difficulty: "Hard", topics: ["Differential Calculus", "Theorems"], repetitionCount: 3 },
            { subjectId: mathCalc?._id, year: 2025, questionText: "Evaluate the double integral of (x+y) dxdy over the region bounded by y=x and y=x^2.", marks: 10, difficulty: "Hard", topics: ["Multivariable Integral Calculus"], repetitionCount: 2 },
            { subjectId: mathCalc?._id, year: 2022, questionText: "Expand sin(x) as a Taylor series around x=0.", marks: 5, difficulty: "Medium", topics: ["Sequence and Series", "Taylor Series"], repetitionCount: 4 },
            { subjectId: mathCalc?._id, year: 2022, questionText: "Find the maxima and minima of the function f(x,y) = x^3 + y^3 - 3xy.", marks: 10, difficulty: "Hard", topics: ["Multivariable Differential Calculus"], repetitionCount: 3 },
            { subjectId: mathCalc?._id, year: 2021, questionText: "Use Green's Theorem to evaluate the line integral.", marks: 10, difficulty: "Hard", topics: ["Vector Calculus", "Theorems"], repetitionCount: 2 },

            // Mathematics Statistics (M101)
            { subjectId: mathStats?._id, year: 2025, questionText: "Find the eigenvalues and eigenvectors of a 3x3 matrix.", marks: 10, difficulty: "Hard", topics: ["Matrices", "Eigenvalues"], repetitionCount: 5 },
            { subjectId: mathStats?._id, year: 2025, questionText: "State and prove the Rank-Nullity Theorem.", marks: 10, difficulty: "Medium", topics: ["Vector Space", "Theorems"], repetitionCount: 2 },
            { subjectId: mathStats?._id, year: 2019, questionText: "Calculate the coefficient of correlation for the given data set.", marks: 5, difficulty: "Medium", topics: ["Basic Statistics", "Correlation"], repetitionCount: 4 },
            { subjectId: mathStats?._id, year: 2019, questionText: "Solve the linear system of equations using Gauss elimination.", marks: 10, difficulty: "Medium", topics: ["Matrices", "Linear Systems"], repetitionCount: 3 },
            { subjectId: mathStats?._id, year: 2021, questionText: "Find the regression line of y on x.", marks: 5, difficulty: "Easy", topics: ["Basic Statistics", "Regression"], repetitionCount: 3 },

            // Chemistry (CH101)
            { subjectId: chemistry?._id, year: 2025, questionText: "Derive the energy expression for a particle in a 1D box.", marks: 10, difficulty: "Hard", topics: ["Atomic Structure", "Quantum Mechanics"], repetitionCount: 4 },
            { subjectId: chemistry?._id, year: 2024, questionText: "Explain the selection rules for vibrational spectroscopy.", marks: 5, difficulty: "Medium", topics: ["Spectroscopy"], repetitionCount: 3 },
            { subjectId: chemistry?._id, year: 2020, questionText: "Define Entropy and explain the second law of thermodynamics.", marks: 5, difficulty: "Medium", topics: ["Thermodynamics"], repetitionCount: 5 },
            { subjectId: chemistry?._id, year: 2022, questionText: "Discuss the aromaticity of Benzene using molecular orbital theory.", marks: 10, difficulty: "Hard", topics: ["Organic Chemistry", "Aromaticity"], repetitionCount: 2 },
            { subjectId: chemistry?._id, year: 2021, questionText: "What are enantiomers and diastereomers? Give examples.", marks: 5, difficulty: "Easy", topics: ["Stereochemistry"], repetitionCount: 3 },

            // Physics (PH101)
            { subjectId: physics?._id, year: 2025, questionText: "Derive Maxwell's electromagnetic wave equations in vacuum.", marks: 10, difficulty: "Hard", topics: ["Maxwell's equations"], repetitionCount: 3 },
            { subjectId: physics?._id, year: 2024, questionText: "Explain the working principle of a Ruby Laser.", marks: 10, difficulty: "Medium", topics: ["Laser"], repetitionCount: 4 },
            { subjectId: physics?._id, year: 2020, questionText: "Differentiate between Fraunhofer and Fresnel diffraction.", marks: 5, difficulty: "Easy", topics: ["Diffraction"], repetitionCount: 6 },
            { subjectId: physics?._id, year: 2019, questionText: "Discuss the physical significance of the wave function.", marks: 5, difficulty: "Medium", topics: ["Quantum Mechanics"], repetitionCount: 2 },
            { subjectId: physics?._id, year: 2021, questionText: "State the laws of thermodynamics for statistical systems.", marks: 5, difficulty: "Medium", topics: ["Statistical Mechanics"], repetitionCount: 3 },

            // Basic Electrical Engineering (EE101)
            { subjectId: electrical?._id, year: 2025, questionText: "State and explain Thevenin's Theorem with an example circuit.", marks: 10, difficulty: "Medium", topics: ["DC Circuits", "Theorems"], repetitionCount: 7 },
            { subjectId: electrical?._id, year: 2024, questionText: "An RLC series circuit has R=10, L=0.1, C=100uF. Calculate resonance frequency.", marks: 10, difficulty: "Hard", topics: ["AC Circuits", "Resonance"], repetitionCount: 4 },
            { subjectId: electrical?._id, year: 2020, questionText: "Explain the principle of operation of a single-phase transformer.", marks: 5, difficulty: "Easy", topics: ["Transformers"], repetitionCount: 5 },
            { subjectId: electrical?._id, year: 2022, questionText: "Discuss the torque-slip characteristic of a 3-phase induction motor.", marks: 10, difficulty: "Hard", topics: ["Electrical Machines"], repetitionCount: 3 },
            { subjectId: electrical?._id, year: 2021, questionText: "What is an ELCB? Explain its working and necessity.", marks: 5, difficulty: "Easy", topics: ["Electrical Installations"], repetitionCount: 2 },

            // Basic Electronics Engineering (EC201)
            { subjectId: electronics?._id, year: 2025, questionText: "Explain the working of a Full Wave Bridge Rectifier with a neat diagram.", marks: 10, difficulty: "Medium", topics: ["Rectifiers", "Diodes"], repetitionCount: 3 },
            { subjectId: electronics?._id, year: 2020, questionText: "Differentiate between BJT and FET transistors.", marks: 5, difficulty: "Easy", topics: ["Transistors", "BJT", "FET"], repetitionCount: 2 },
            { subjectId: electronics?._id, year: 2022, questionText: "Explain the V-I characteristics of a Zener Diode.", marks: 5, difficulty: "Easy", topics: ["Diodes", "Zener Diode"], repetitionCount: 5 },
            { subjectId: electronics?._id, year: 2022, questionText: "Design an inverting amplifier using Op-Amp with a gain of 10.", marks: 10, difficulty: "Medium", topics: ["Op-Amp", "Amplifiers"], repetitionCount: 4 },
            { subjectId: electronics?._id, year: 2021, questionText: "State De Morgan's Theorems and verify using truth tables.", marks: 5, difficulty: "Easy", topics: ["Digital Logic"], repetitionCount: 3 },

            // C Programming (CS201)
            { subjectId: cLanguage?._id, year: 2025, questionText: "Write a C program to find the factorial of a number using recursion.", marks: 5, difficulty: "Easy", topics: ["Recursion", "Functions"], repetitionCount: 4 },
            { subjectId: cLanguage?._id, year: 2023, questionText: "What are pointers? Explain pointer arithmetic with examples.", marks: 10, difficulty: "Hard", topics: ["Pointers"], repetitionCount: 2 },
            { subjectId: cLanguage?._id, year: 2022, questionText: "Explain the difference between call by value and call by reference.", marks: 5, difficulty: "Medium", topics: ["Functions", "Pointers"], repetitionCount: 3 },
            { subjectId: cLanguage?._id, year: 2022, questionText: "Define a structure for a student and write a program to store data for 5 students.", marks: 10, difficulty: "Medium", topics: ["Structures"], repetitionCount: 4 },
            { subjectId: cLanguage?._id, year: 2021, questionText: "Explain the different file opening modes in C.", marks: 5, difficulty: "Easy", topics: ["File Handling"], repetitionCount: 2 },

            // Python (CS191)
            { subjectId: python?._id, year: 2025, questionText: "What are list comprehensions in Python? Give an example.", marks: 5, difficulty: "Easy", topics: ["Lists", "Comprehensions"], repetitionCount: 2 },
            { subjectId: python?._id, year: 2023, questionText: "Explain the difference between a list and a tuple.", marks: 5, difficulty: "Easy", topics: ["Data Structures"], repetitionCount: 6 },
            { subjectId: python?._id, year: 2022, questionText: "How do you handle exceptions in Python? Explain with try-except block.", marks: 5, difficulty: "Medium", topics: ["Exception Handling"], repetitionCount: 3 },
            { subjectId: python?._id, year: 2022, questionText: "Write a program to perform matrix multiplication using NumPy.", marks: 10, difficulty: "Medium", topics: ["NumPy", "Matrices"], repetitionCount: 4 },
            { subjectId: python?._id, year: 2021, questionText: "What is the purpose of __init__ method in Python classes?", marks: 5, difficulty: "Easy", topics: ["OOP", "Classes"], repetitionCount: 2 },

            // English (HU101)
            { subjectId: english?._id, year: 2025, questionText: "Write a formal letter to your Principal requesting a character certificate.", marks: 10, difficulty: "Easy", topics: ["Writing Practice", "Formal Letters"], repetitionCount: 3 },
            { subjectId: english?._id, year: 2024, questionText: "Identify the common errors: 'Each of the students have completed their work.'", marks: 5, difficulty: "Medium", topics: ["Common Errors", "Grammar"], repetitionCount: 5 },
            { subjectId: english?._id, year: 2020, questionText: "What are root words? Explain with two examples each for prefixes and suffixes.", marks: 5, difficulty: "Easy", topics: ["Vocabulary Building"], repetitionCount: 2 },
            { subjectId: english?._id, year: 2022, questionText: "Organize the given sentences into a coherent paragraph.", marks: 10, difficulty: "Medium", topics: ["Basic Writing Skills"], repetitionCount: 4 },
            { subjectId: english?._id, year: 2021, questionText: "Draft a CV for the post of a Junior Software Engineer.", marks: 10, difficulty: "Medium", topics: ["Writing Practice", "CV Writing"], repetitionCount: 3 },

            // Mechanics Essential (ME201)
            { subjectId: mechEss?._id, year: 2025, questionText: "State and prove Lami's Theorem.", marks: 5, difficulty: "Medium", topics: ["Force System", "Theorems"], repetitionCount: 5 },
            { subjectId: mechEss?._id, year: 2023, questionText: "Find the centroid of a T-section with given dimensions.", marks: 10, difficulty: "Hard", topics: ["Centroid", "Moment of Inertia"], repetitionCount: 4 },
            { subjectId: mechEss?._id, year: 2022, questionText: "State D'Alembert's principle and apply it to a block moving on an inclined plane.", marks: 10, difficulty: "Medium", topics: ["Dynamic Equilibrium"], repetitionCount: 3 },
            { subjectId: mechEss?._id, year: 2022, questionText: "Explain the work-energy principle for a particle.", marks: 5, difficulty: "Easy", topics: ["Work, Energy & Power"], repetitionCount: 2 },
            { subjectId: mechEss?._id, year: 2021, questionText: "What is mass moment of inertia? How is it different from area moment of inertia?", marks: 5, difficulty: "Medium", topics: ["Moment of Inertia"], repetitionCount: 3 },

            // Mechanics Principles (ME202)
            { subjectId: mechPrinc?._id, year: 2025, questionText: "Analyze the given truss using the Method of Joints.", marks: 10, difficulty: "Hard", topics: ["Structural Analysis", "Trusses"], repetitionCount: 3 },
            { subjectId: mechPrinc?._id, year: 2023, questionText: "State the laws of static friction.", marks: 5, difficulty: "Easy", topics: ["Friction"], repetitionCount: 6 },
            { subjectId: mechPrinc?._id, year: 2022, questionText: "Derive the equations of motion for a projectile.", marks: 10, difficulty: "Medium", topics: ["Kinematics"], repetitionCount: 4 },
            { subjectId: mechPrinc?._id, year: 2022, questionText: "A force system is given. Find the resultant and its direction.", marks: 5, difficulty: "Easy", topics: ["Force System", "Vectors"], repetitionCount: 2 },
            { subjectId: mechPrinc?._id, year: 2021, questionText: "Define relative motion and give an example.", marks: 5, difficulty: "Easy", topics: ["Kinematics"], repetitionCount: 3 },
        ];

        // Group rawData by subject and year to remove repeated entries for the same paper
        const groupedData: Record<string, any> = {};

        rawData.forEach(item => {
            if (!item.subjectId) return;
            const key = `${item.subjectId}_${item.year}`;
            if (!groupedData[key]) {
                groupedData[key] = {
                    ...item,
                    questions: [item.questionText]
                };
            } else {
                groupedData[key].questions.push(item.questionText);
            }
        });

        const samplePYQs = Object.values(groupedData)
            .map(p => {
                const subject = subjects.find(s => s._id.toString() === p.subjectId.toString());
                const localPath = `/pyqs/${subject?.code}_${p.year}.pdf`;

                const mappedFiles = ["BI101_2025.pdf", "CH101_2025.pdf", "M201_2025.pdf", "M101_2025.pdf", "PH101_2025.pdf", "CS191_2025.pdf", "CS201_2025.pdf", "EC201_2025.pdf", "EE101_2025.pdf", "ME202_2025.pdf", "ME201_2025.pdf", "HU101_2025.pdf", "EE101_2020.pdf", "EC201_2020.pdf", "CH101_2020.pdf", "HU101_2020.pdf", "PH101_2020.pdf", "CH101_2024.pdf", "PH101_2024.pdf", "EE101_2024.pdf", "HU101_2024.pdf", "M101_2019.pdf", "PH101_2019.pdf"];

                const hasLocalFile = mappedFiles.includes(`${subject?.code}_${p.year}.pdf`);

                if (!hasLocalFile) return null;

                return {
                    subjectId: p.subjectId,
                    year: p.year,
                    marks: p.marks,
                    difficulty: p.difficulty,
                    topics: p.topics,
                    repetitionCount: p.repetitionCount,
                    fileUrl: localPath,
                    extractedContent: {
                        questions: p.questions
                    }
                };
            })
            .filter((p): p is any => p !== null);

        await PYQ.deleteMany({});
        // Use collection to bypass Mongoose schema caching issues
        const result = await (PYQ as any).collection.insertMany(samplePYQs);

        const mappedCount = samplePYQs.filter(p => p.fileUrl.startsWith('/pyqs/')).length;

        return NextResponse.json({
            message: "Seed successful",
            count: result.insertedCount,
            mappedCount,
            sample: samplePYQs[0]
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Seed failed", details: error.message }, { status: 500 });
    }
}
