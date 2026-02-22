"use client";

import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Brain, Sparkles, Zap, BookOpen, Clock,
    Search, ToggleLeft, ToggleRight, Star, Repeat,
    Flame, AlertCircle, RefreshCw, Layers, ArrowRight,
    TrendingUp, TrendingDown, Infinity, BarChart3, Code2,
    FlaskConical, Atom, Settings, Type, Dna, FileCode2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import PYQCard from "@/components/PYQCard";
import Flashcard from "@/components/Flashcard";
import AIGuruChat from "@/components/AIGuruChat";

const getSubjectTheme = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("electronics")) return { icon: Zap, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" };
    if (n.includes("calculus")) return { icon: Infinity, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
    if (n.includes("statistics")) return { icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (n.includes("programming language c") || n.includes("language c")) return { icon: Code2, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    if (n.includes("chemistry")) return { icon: FlaskConical, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (n.includes("physics")) return { icon: Atom, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" };
    if (n.includes("mechanics")) return { icon: Settings, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" };
    if (n.includes("electrical")) return { icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    if (n.includes("english")) return { icon: Type, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" };
    if (n.includes("python")) return { icon: FileCode2, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" };
    if (n.includes("biology")) return { icon: Dna, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" };
    return { icon: BookOpen, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20" };
};

const PHYSICS_SYLLABUS = `
Part A: Vector Calculus
Representation of a vector, Some Important Definitions about Vectors, Resolution of a Vector into Components, Product of Two Vectors, Triple Product, Scalar and Vector Fields, Partial Derivative of Vectors, Gradient of Scalar Field, Divergence of Vector Field, Curl of a Vector Field, Curl in the Context of Rotational Motion

Part B: Classical Mechanics
Inertial and Non-Inertial Frame of references, Friction, Problems including constraints and Friction, conservation Laws, Rigid Body, Angular Velocity Vector, Moment of Inertia, Acceleration of a Rigid Body Rolling Down an Inclined plane

Introduction to SHM
Introduction, Relation of Simple Harmonic Motion with Circular Motion, Differential Equation of Simple Harmonic Motion, Various Characteristics of SHM, Energy of a Particle Executing SHM and Law of Conservation of Energy, Differential Equation of Free or Undamped Vibrations, Damped vibrations, Solution of the Equation of a Damped Oscillator and its Analysis, Electrical Analogy of SHM and Damped vibration, Analysis of Forced Vibration, Resonance, Energy of a Forced Vibrator, Sharpness of Resonance, Quality Factor, Forced Vibration in an LCR Circuit

Interference
Interference of light, Young’s experiment, Resultant intensity due to superposition of two interfering waves, Interference and conservation of energy, Determination of fringe width in Young’s experiment, Shape of interference fringes, conditions for interference of light, coherent sources, production of coherent sources, Fresnel’s biprism, displacement of fringes, phase change on reflection, interference due to thin films, interference due to wedge shaped thin films, formation of Newton’s ring.

Diffraction
Different types of diffraction phenomena, difference between interference and diffraction, Fraunhofer diffraction due to a single slit, Fraunhofer diffraction due to a double slit, difference between single slit and a double slit diffraction pattern, diffraction due to plane diffraction grating, Rayleigh’s criteria on resolution, resolving power of a grating, application of diffraction grating

Laser
Characteristics of laser, Absorption and emission of radiations by matter, working principle of laser, population inversion in laser, basic components of laser system, optical resonator and Q value, threshold condition for sustaining of laser action, typical lasers, application of lasers

Maxwell’s equations
Magnetic flux, Faraday’s law of electromagnetic induction, electromotive force, Integral form of Faraday’s law, displacement current, Ampere’s Circuital law, Modified Ampere’s law, Continuity property of current, Maxwell’s Equations

Quantum Mechanics
Introduction, Wave function and its physical Significance, Normalization of wave functions and Orthogonality of wave functions, Operators in Quantum Mechanics, Fundamental postulates of Quantum mechanics, Time-dependent Schrodinger’s equation, Time-independent Schrodinger’s wave equation, Application of Schrodinger’s equation, Quantum harmonic oscillator, The Hydrogen atom

Statistical Mechanics
Introduction, Concept of Phase Space, Concept of Energy levels and Energy states, Macrostate and Microstate, Thermodynamic Probability and Entropy, Equilibrium Macrostate, MB, BE and FD statistics, Maxwell-Boltzmann (MB) Statistics, Bose-Einstein (BE) Statistics, Fermi-Dirac (FD) Statistics, Classical Statistics as a special case of Quantum Statistics, Density of states or Quantum states in energy range between and +d, Fermi distribution at zero and non-zero temperature, Derivation of plank’s law of Radiation from BE Statistics, Comparative study of three Statistical Distribution functions
`;

const BIOLOGY_SYLLABUS = `
Introduction
Fundamental differences between science and engineering by drawing a comparison between eye and camera, Bird flying and aircraft. Most exciting aspect of biology as an independent scientific discipline. Why do we need to study biology? Discuss how biological observations of the 18th Century lead to major discoveries. Examples from Brownian motion and the origin of thermodynamics refer to the original observation of Robert Brown and Julius Mayor.

Classification
Hierarchy of life forms at the phenomenological level. Classification based on: (a) cellularity- Unicellular or multicellular (b) ultrastructure- prokaryotes or eukaryotes (c) energy and Carbon utilization- Autotrophs, heterotrophs, lithotropes (d) Ammonia excretion- aminotelic, uricotelic, ureotelic (e) Habitat- aquatic or terrestrial (f) Molecular taxonomy- three major kingdoms of life. Model organisms: E.coli, S. cerevisiae, D. melanogaster, C. elegans, A. thaliana, M. musculus.

Genetics
Mendel’s laws, Concept of segregation and independent assortment. Concept of allele. Gene mapping, Gene interaction, Epistasis. Meiosis and Mitosis (focus on genetic material transfer from parent to offspring). Concepts of recessiveness and dominance. Concept of mapping of phenotype to genes. Single gene disorders in humans. Concept of complementation in human genetics.

Biomolecules
Molecules of life: monomeric units and polymeric structures. Sugars, starch and cellulose. Amino acids and proteins. Nucleotides and DNA/RNA. Two carbon units and lipids.

Enzymes
Enzymology: monitoring enzyme catalyzed reactions. How enzymes catalyze reactions. Enzyme classification. Mechanism of enzyme action (two examples). Enzyme kinetics and kinetic parameters. RNA catalysis.

Information Transfer
Universal molecular basis of information transfer. DNA as genetic material. Hierarchy of DNA structure- from single-stranded to double helix to nucleosomes. Concept of genetic code: universality and degeneracy. Definition of gene: complementation and recombination. Mutation. DNA Technology (Use and Application).

Macromolecular Analysis
Comprehensive analysis of proteins: structure and function. Hierarchical organization: primary, secondary, tertiary, and quaternary levels. Proteins as enzymes, transporters, receptors, and structural elements.

Metabolism & Thermodynamics
Thermodynamics applied to biological systems. Exothermic/endothermic vs endergonic/exergonic reactions. Gibb’s energy. Concept of Keq and relation to standard free energy. Spontaneity, energy yielding/consuming reactions. Concept of Energy charge.

Respiration
Breakdown of glucose to CO2 + H2O: Glycolysis, Gluconeogenesis, Krebs cycle. Electron transport chain and Oxidative phosphorylation.

Photosynthesis
Synthesis of glucose from CO2 and H2O. Cyclic and non-cyclic photophosphorylation. Calvin cycle. CAM cycle.

Microbiology
Single celled organisms. Concept of species and strains. Identification and classification of microorganisms. Microscopy. Ecological aspects. Sterilization and media compositions. Growth kinetics.
`;

const CHEMISTRY_SYLLABUS = `
Atomic and molecular structure:
Schrödinger equation. Particle in a box solution and their applications for conjugated molecules and nanoparticles. Forms of the hydrogen atom wave functions and the plots of these functions to explore their spatial variations. Molecular orbitals of diatomic molecules and plots of the multicentre orbitals. Equations for atomic and molecular orbitals. Energy level diagrams of diatomic. Pi-molecular orbitals of butadiene and benzene and aromaticity. Crystal field theory and the energy level diagrams for transition metal ions and their magnetic properties. Band structure of solids and the role of doping on band structures.

Spectroscopy:
Principles of spectroscopy and selection rules. Electronic spectroscopy. Fluorescence and its applications in medicine. Vibrational and rotational spectroscopy of diatomic molecules. Applications. Nuclear magnetic resonance and magnetic resonance imaging, surface characterisation techniques. Diffraction and scattering.

Inter molecular forces:
Ionic, dipolar and van Der Waals interactions. Equations of state of real gases and critical phenomena. Potential energy surfaces of H3, H2F and HCN and trajectories on these surfaces.

Thermodynamics:
Thermodynamic functions: energy, entropy and free energy. Estimations of entropy and free energies. Free energy and emf. Cell potentials, the Nernst equation and applications. Acid base, oxidation reduction and solubility equilibria. Water chemistry. Corrosion. Use of free energy considerations in metallurgy through Ellingham diagrams.

Periodic table:
Effective nuclear charge, penetration of orbitals, variations of s, p, d and f orbital energies of atoms in the periodic table, electronic configurations, atomic and ionic sizes, ionization energies, electron affinity and electronegativity, polarizability, oxidation states, coordination numbers and geometries, hard soft acids and bases, molecular geometries.

Stereochemistry:
Representations of 3 dimensional structures, structural isomers and stereoisomers, configurations and symmetry and chirality, enantiomers, diastereomers, optical activity, absolute configurations and conformational analysis. Isomerism in transitional metal compounds.

Organic Chemistry:
Introduction to reactions involving substitution, addition, elimination, oxidation, reduction, cyclization and ring openings. Synthesis of a commonly used drug molecule.
`;

const ENGLISH_SYLLABUS = `
Vocabulary Building
The concept of vocabulary and word formation. Root Words from foreign languages. Acquaintance with Prefixes and Suffixes. Synonyms, antonyms, and Standard abbreviations.

Basic Writing Skills
Sentence Structures. Use of phrases. Importance of proper punctuation. Creating coherence. Organizing principles of paragraphs in documents. Techniques for writing precisely.

Identifying Common Errors in Writing
Subject – Verb agreement. Noun-Pronoun Agreement. Misplaced modifiers. Articles and Prepositions. Redundancies and Clichés.

Nature and Style of Sensible Writings
Describing, Defining and Classifying. Providing examples or evidence. Writing introduction and conclusion.

Writing Practice
Comprehension. Precis Writing. Essay Writing. Business Correspondence (Letter Writing, Business Letter, Cover Letter, Memos, Email). CV Writing.

Listening and Speaking Practice
Listening Comprehension. Pronunciation, intonation, Stress, and rhythm. Common everyday situation: Conversations and dialogues. Communication at Workplace. Interviews & Group Discussions. Formal Presentations.
`;

const MATHEMATICS_CALCULUS_SYLLABUS = `
Differential Calculus
Rolle’s Theorem, Mean Value Theorems, Taylor’s and Maclaurin’s Theorems with Remainders; Taylor's Series, Series for Exponential, Trigonometric and Logarithm Functions; Indeterminate forms and L' Hospital's Rule; Maxima and Minima; Evolutes and Involutes.

Integral Calculus
Evaluation of Definite and Improper Integrals; Beta and Gamma Functions and their properties; Applications of Definite Integrals to evaluate surface area and volume of revolutions.

Multivariable Differential Calculus
Limit, Continuity and Partial Derivatives; Homogeneous Functions, Euler’s Theorem of first and second order (Statement only); Change of variables, Composite function, Derivative of implicit functions, Total Derivative; Jacobian; Maxima, Minima and Saddle points; Method of Lagrange multipliers; Gradient, Directional Derivatives, Tangent Plane and Normal Line, Curl and Dive.

Multivariable Integral Calculus
Double Integrals (Cartesian), Change of Order of Integration in Double Integrals, Change of Variables (Cartesian to Polar), Applications: Areas and Volumes, Centre of Mass and Gravity (constant and variable densities); Triple Integrals (Cartesian), Orthogonal Curvilinear Coordinates, Simple applications involving cubes, sphere and rectangular parallelepiped; Scalar Line Integrals, Vector Line Integrals, Scalar Surface Integrals, Vector Surface Integrals, Theorems of Green, Gauss and Stokes.

Sequence and Series
Basic ideas on Sequence; Concept of Monotonic and Bounded sequence; Convergence and Divergence of Sequence; Algebra of Sequences. Basic idea of an Infinite Series; Notion of Convergence and Divergence; Series of Positive Terms - Convergence of infinite G.P. series and p-series; Tests of Convergence – Comparison Test, Integral Test, D’Alembert’s Ratio Test, Raabe’s Test and Cauchy’s Root test. Alternating Series - Leibnitz’s test, Absolute and Conditional Convergence.
`;

const MATHEMATICS_STATISTICS_SYLLABUS = `
Matrices
Linear Systems of Equations, Rank of a Matrix. Eigenvalues and Eigenvectors; Eigenvalues of some special matrices; Cayley-Hamilton Theorem; Similarity Matrix, Diagonalization of matrices.

Vector Space
Vector Space, Vector Subspace, Linear Independence and Dependence of Vectors, Basis, Dimension; Linear Transformations (maps), Range and Kernel of a Linear Map, Rank and Nullity, Inverse of a Linear Transformation, Rank Nullity Theorem, Composition of Linear Maps, Matrix associated with a Linear Map; Inner Product Spaces, GramSchmidt Orthogonalization.

Ordinary Differential Equations
First order first degree equations: Exact equations, Rules for finding Integrating Factors, Linear and Bernoulli’s equations. Equations of first order but not of first degree: Equations solvable for p, Equations solvable for x, Equations solvable for y and Clairaut’s type. Second Order Linear Differential Equations with constant coefficients, D-operator Method, Method of Variation of Parameters; Cauchy-Euler Equation; Power Series Solutions, Frobenius method.

Basic Statistics
Measures of Central Tendency: Mean, Median & Mode; Measures of Dispersion – Variance and Standard Deviation; Moments, Skewness, Kurtosis; Correlation & Regression, Rank Correlation.
`;

const C_PROGRAMMING_SYLLABUS = `
Introduction & Program Structure
The Von-Neuman Architecture, Hardware and Software, Phases of program execution, Compiler vs Interpreter, Phases of C Compilation, Execution of a C Program. Structure: Hello World, Preprocessor Directives, Header Files, MAIN function, Keywords & Identifiers, Statements, Punctuations and Brackets.

Data Representation, I/O and Operators
Datatypes: Binary Representation, Allocation Size, Range. Console I/O: printf() & scanf(), Formatted Strings, Format Specifiers, Escape Sequences. Operators: Unary, Binary, Ternary, Arithmetic, Logical, Assignment, Relational, Bitwise, Increment, Decrement, Conditional Operators, Operator Precedence.

Control Flow
Conditions: If, Else, Else if, Nested Conditions, Switch-case, Goto. Iterations: While loop, Do-while loop, For loop, Break and continue, Nested loops.

Arrays and Strings
Arrays: Declaration and Initialization, Indexing, Memory Layout, Multidimensional Arrays. Strings: Character arrays vs strings, Declaring and initializing strings, String Input and Output, String library functions.

Functions and Recursion
Declaration, Definition, & Calling; Formal vs Actual parameters, Return type, Recursion, Scope: local vs global variables, Storage classes: auto, static, extern, register.

Pointers
Memory address concept, & and * operators, Call by value vs Call by Reference, Pointers and arrays, Pointers with strings, Pointers to pointers, Dynamic memory allocation (DMA), Command-line arguments.

Structures & Unions
Structures: Defining and declaring, Accessing members, typedef, Passing to functions, Arrays of structures, Nested structures. Unions: Syntax & memory layout, Struct vs. union, Enum definition and use, Enum vs #define.

File Handling
The file pointer, Opening & closing a file, Reading and Writing Files (fprintf, fscanf, fputc, fgetc, fputs, fgets), File Modes, ftell, fseek, rewind, feof.
`;

const PYTHON_SYLLABUS = `
Python Basics:
The Python Interpreter, Console I/O, Conditions, Control Flow, Functions, Datatypes, List, Tuple, Set, Dictionaries, File I/O, Error handling (try-except), List comprehensions vs traditional loops.

Object Oriented Programming with Python:
Classes, Objects, Inheritance, Encapsulation, Special Methods: __init__, __call__, __iter__, __getitem__, __len__. Static vs Instance methods.

Numerical Data Analysis with Python (NumPy):
NumPy N-D arrays, creation, attributes, Indexing, Slicing, Reshaping, ND-Array Arithmetic, Mathematical functions (mean, sum, std).

Database Handling with Python (Pandas):
Introduction to Pandas, Series, DataFrames, loading data from CSV/Excel, basic data cleaning, filtering, and grouping operations.

Data Visualization (Matplotlib):
Introduction to Matplotlib: Pyplot, markers, lines, labels, grid, subplot, scatter, bars, histograms, piechart. Customizing plots with titles and legends.

Introduction to AI and Prompt Engineering:
Introduction to AI history and current trends, Application Areas (Healthcare, Finance, Robotics), Discriminative vs Generative AI. Definition & Types of Machine Learning (Supervised, Unsupervised, Reinforcement). Prompt Engineering: Ethical Policies, Zero-shot vs Few-shot prompting, Ideal Programming Practices with AI.
`;

const ELECTRONICS_SYLLABUS = `
Semiconductor Physics
Classification of Metal, insulator and semiconductor, active and passive components, intrinsic and extrinsic semiconductor, n-type and p-type Band structure, carrier concentration, drift and diffusion current, generation and recombination, density of state function.

P-n Junction diode and Zener diode
Forward and reverse bias, V-I characteristics, Current equation derivation, piece-wise linear characteristics, Diode as a switch, Clipper and Clamper Circuits, Zener Diodes, Half-Wave and Full-Wave Rectifiers, SCR Operation & Characteristic.

Bipolar Junction Transistors (BJT)
Type, Operation, minority current distribution, Punch-through and avalanche effect, V-I Characteristics, CB, CE & CC modes, current amplification factors (α, β), BJT as amplifier and switch, small signal h-parameter analysis, gain and impedance calculation.

Field effect transistors (MOSFET)
Construction, Types, Operation, V-I characteristics, Regions of operation, MOSFET as switch & amplifier, CMOS technology, FinFETs, silicon nanowire transistors, IGBT.

OPAMP
Ideal Op-AMP, CMRR, Open & Closed loop circuits, Feedback loops, Inverting/Noninverting configuration, DC imperfections, Difference amplifiers, Integrators, differentiators, filters, logarithmic amplifiers, Schmitt trigger.

Digital Logic gates
Boolean Algebra, Logic Gates (AND, OR, NOT, XOR, XNOR), Universal gates, Truth tables, De Morgan’s Theorems, Combinational Circuits (adders, subtractors, comparators, mux/demux, encoders, decoders).
`;

const ELECTRICAL_SYLLABUS = `
DC Circuits:
Electrical circuit elements (R, L and C), voltage and current sources, Kirchhoff's current and voltage laws (KVL/KCL), analysis of simple circuits with dc excitation. Superposition, Thevenin and Norton Theorems. Time-domain analysis of first-order RL and RC circuits.

AC Circuits:
Representation of sinusoidal waveforms, peak and rms values, phasor representation, real power, reactive power, apparent power, power factor. Analysis of single-phase ac circuits (R, L, C, RL, RC, RLC), series and parallel resonance. Three phase balanced circuits, voltage and current relations in star and delta connections.

Transformers:
Magnetic materials, BH characteristics, ideal and practical transformer, equivalent circuit, losses, regulation and efficiency. Open circuit and short circuit tests. Auto-transformer and three-phase transformer connections. Modern energy conversion and delivery systems.

Electrical Machines:
Generation of rotating magnetic fields, Three-phase induction motor (Construction, working, torque-slip characteristic, speed control). Single-phase induction motor. Separately excited dc motor (torque-speed characteristic, speed control). Synchronous generators and their applications.

Power Converters:
DC-DC buck and boost converters, duty ratio control. Single-phase and three-phase voltage source inverters; sinusoidal modulation techniques.

Electrical Installations:
Components of LT Switchgear: SFU, MCB, ELCB, MCCB. Types of Wires, Cables, and Earthing principles. Types of Batteries and characteristics. Energy consumption calculations, power factor improvement and battery backup systems. Global energy system challenges.
`;

const MECHANICS_PRINCIPLES_SYLLABUS = `
Introduction to Vectors:
Basic concepts, types of forces, scalars and vectors. Vector operations - Force and moment representation using vectors. Resultant of concurrent forces in space.

Force & Equilibrium Systems:
Rigid Body equilibrium (2-D & 3-D); System of Forces, Coplanar Concurrent Forces, Components in Space – Resultant- Moment of Forces and its Application; Couples and Resultant of Force System, Equilibrium of System of Forces, Concept of Free body diagrams, Equations of Equilibrium of Coplanar Systems, Lami’s Theorem.

Friction:
Laws of Friction, Static and Dynamic Friction; Angle of friction, Angle of repose, Application of Friction in various systems.

Basic Structural Analysis:
Equilibrium in three dimensions; Method of Sections; Method of Joints; How to determine if a member is in tension or compression; Simple Trusses; Zero force member, frames and machines.

Kinematics of Particles:
Definitions and basic concepts of particle motion, Rectilinear motion: equations of motion for constant and variable acceleration, Projectile motion, Introduction to relative motion between two particles.

Kinetics of Particles:
Application of Newton’s laws and D’ Alembert’s principles to solve motion problems. Work-energy and impulse-momentum principles.
`;

const ENGINEERING_MECHANICS_ESSENTIALS_SYLLABUS = `
Force & Equilibrium System:
Rigid Body equilibrium (2-D & 3-D); System of Forces, Coplanar Concurrent Forces, Components in Space – Resultant- Moment of Forces and its Application; Couples and Resultant of Force System, Equilibrium of System of Forces, Concept of Free body diagrams, Equations of Equilibrium of Coplanar Systems, Lami’s Theorem.

Centre of Gravity & Moment of Inertia:
Centre of Gravity and its implications; Centroid of simple figures from first principle, centroid of composite sections (T-section, I-section); Area moment of inertia of plane sections from first principles, Theorems of moment of inertia (Parallel and Perpendicular axis theorems), Moment of inertia of standard sections and composite sections; Concept of Mass moment inertia.

Brief Introduction to Dynamic Equilibrium:
Application of Newton’s laws and D’ Alembert’s principles to solve particle motion problems. Inertia force and D’Alembert’s principle.

Dynamics of Rigid Bodies:
Translation and rotation of rigid bodies; instantaneous center of rotation and velocity analysis. Force, torque, and moment of inertia; plane motion types - translation, rotation, and general motion. Application of D'Alembert’s principle for dynamic equilibrium; equations of motion for translation, rotation, and combined motion.

Work, Energy & Power:
Work-energy principle for particles, Kinetic energy, potential energy, and law of conservation of energy. Power and efficiency of mechanical systems.
`;

const QuestionCard = ({ q }: { q: any }) => {
    // Handle string-based legacy questions
    const displayQuestion = typeof q === 'string' ? q : q.question;

    // Explicitly hide invalid/empty questions or those that are just IDs
    if (!displayQuestion || displayQuestion.trim().length < 5 || /^[0-9a-fA-F]{24}$/.test(displayQuestion)) {
        return null;
    }

    const marks = q.marks || (typeof q === 'string' ? 5 : 0);
    const reasoning = q.reasoning || (typeof q === 'string' ? "Derived from past year paper trends." : "");
    const likelihood = q.repetitionLikelihood || (typeof q === 'string' ? "High" : "Medium");

    return (
        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-teal-500/30 transition-all group">
            <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${likelihood === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    {likelihood} LIKELIHOOD
                </span>
                <span className="text-xs font-bold text-zinc-600 uppercase">{marks} Marks</span>
            </div>
            <p className="text-zinc-100 font-bold leading-snug mb-4 group-hover:text-white transition-colors">{displayQuestion}</p>
            <div className="flex items-start gap-2 bg-black/40 p-3 rounded-lg border border-zinc-800/50">
                <Brain className="h-3 w-3 text-teal-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-zinc-500 italic leading-relaxed">{reasoning}</p>
            </div>
        </div>
    );
};

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [subject, setSubject] = useState<any>(null);
    const [pyqs, setPyqs] = useState<any[]>([]);
    const [insights, setInsights] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showImportant, setShowImportant] = useState(false);
    const [showRepeated, setShowRepeated] = useState(false);
    const [solveMode, setSolveMode] = useState(false);
    const [activeTab, setActiveTab] = useState<"pyqs" | "flashcards" | "predictions">("pyqs");
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [selectedChapterPredictions, setSelectedChapterPredictions] = useState<string | null>(null);
    const [rateLimitCountdown, setRateLimitCountdown] = useState(0);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [analysisSuccess, setAnalysisSuccess] = useState(false);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const syllabusRef = useRef<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel for better performance
                const [subRes, pyqRes, insightRes] = await Promise.all([
                    fetch(`/api/subjects/${id}`),
                    fetch(`/api/subjects/${id}/pyqs`),
                    fetch(`/api/subjects/${id}/ai-analysis`)
                ]);

                const [subData, pyqData] = await Promise.all([
                    subRes.json(),
                    pyqRes.json()
                ]);

                setSubject(subData);

                if (Array.isArray(pyqData)) {
                    setPyqs(pyqData);
                } else {
                    console.error("PYQ data is not an array:", pyqData);
                    setPyqs([]);
                }

                if (insightRes.ok) {
                    const insightData = await insightRes.json();
                    setInsights(insightData);
                    if (insightData.flashcards?.length > 0) {
                        setSelectedChapter(insightData.flashcards[0].chapter);
                    }
                    if (insightData.probableQuestions?.length > 0) {
                        setSelectedChapterPredictions(insightData.probableQuestions[0].chapter);
                    }
                }
            } catch (error) {
                console.error("Data fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Auto-retry countdown for AI Analysis rate limit
    useEffect(() => {
        if (rateLimitCountdown <= 0) return;
        countdownRef.current = setInterval(() => {
            setRateLimitCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownRef.current!);
                    runAnalysis(syllabusRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdownRef.current!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rateLimitCountdown > 0]);

    const runAnalysis = async (syllabusOverride?: string) => {
        clearInterval(countdownRef.current!);
        setRateLimitCountdown(0);
        setAnalysisError(null);
        setAnalysisSuccess(false);
        setAnalyzing(true);
        try {
            let syllabus = syllabusOverride ?? "";
            if (!syllabusOverride) {
                const subjectName = subject?.name?.toLowerCase() || "";
                if (subjectName.includes("physics")) syllabus = PHYSICS_SYLLABUS;
                else if (subjectName.includes("biology")) syllabus = BIOLOGY_SYLLABUS;
                else if (subjectName.includes("chemistry")) syllabus = CHEMISTRY_SYLLABUS;
                else if (subjectName.includes("english")) syllabus = ENGLISH_SYLLABUS;
                else if (subjectName.includes("calculus")) syllabus = MATHEMATICS_CALCULUS_SYLLABUS;
                else if (subjectName.includes("statistics") || (subjectName.includes("mathematics") && !subjectName.includes("calculus"))) syllabus = MATHEMATICS_STATISTICS_SYLLABUS;
                else if (subjectName.includes("c programming") || subjectName.includes("language c") || subjectName.includes("programming language")) syllabus = C_PROGRAMMING_SYLLABUS;
                else if (subjectName.includes("python")) syllabus = PYTHON_SYLLABUS;
                else if (subjectName.includes("electronics")) syllabus = ELECTRONICS_SYLLABUS;
                else if (subjectName.includes("electrical")) syllabus = ELECTRICAL_SYLLABUS;
                else if (subjectName.includes("mechanics essentials")) syllabus = ENGINEERING_MECHANICS_ESSENTIALS_SYLLABUS;
                else if (subjectName.includes("mechanics principles") || subjectName.includes("mechanics")) syllabus = MECHANICS_PRINCIPLES_SYLLABUS;
                syllabusRef.current = syllabus;
            }

            const res = await fetch(`/api/subjects/${id}/ai-analysis`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ syllabus })
            });

            const data = await res.json();

            if (res.status === 429 && data.error === "RATE_LIMITED") {
                setRateLimitCountdown(data.retryAfter ?? 60);
                return;
            }

            if (!res.ok) throw new Error(data.error || "Analysis failed");

            setInsights(data);
            if (data.flashcards?.length > 0) setSelectedChapter(data.flashcards[0].chapter);
            if (data.probableQuestions?.length > 0) setSelectedChapterPredictions(data.probableQuestions[0].chapter);
            setAnalysisSuccess(true);
            setTimeout(() => setAnalysisSuccess(false), 5000);
        } catch (error: any) {
            console.error("Analysis error:", error);
            setAnalysisError(error.message || "Analysis failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };


    if (loading) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
            <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-500 animate-pulse font-medium">Syncing Academic Data...</p>
        </div>
    );

    if (!subject) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-6">
            <AlertCircle className="h-16 w-16 text-zinc-800" />
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Subject Missing</h2>
                <p className="text-zinc-500">We couldn't find the data for this module.</p>
            </div>
            <Link href="/dashboard">
                <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Go Home</Button>
            </Link>
        </div>
    );

    const theme = getSubjectTheme(subject.name);

    // Filter logic for PYQs
    const filteredPyqs = pyqs.filter(p => {
        const matchesSearch = p.questionText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.year.toString().includes(searchQuery);

        // Importance logic: match against AI identified high-yield chapters/topics
        const isHighYield = insights?.mostImportantChapters?.some((ch: any) => {
            const chMatch = p.topics?.some((t: string) =>
                t.toLowerCase().includes(ch.name.toLowerCase()) ||
                ch.name.toLowerCase().includes(t.toLowerCase())
            );
            const topicMatch = ch.topics?.some((topic: string) =>
                p.questionText?.toLowerCase().includes(topic.toLowerCase()) ||
                p.topics?.some((t: string) => t.toLowerCase().includes(topic.toLowerCase()))
            );
            return chMatch || topicMatch;
        }) || p.isImportant;

        if (showImportant && !isHighYield) return false;

        if (showRepeated && (p.repetitionCount || 0) <= 1) return false;

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/subjects/core">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <div className={`flex items-center gap-2 ${theme.color} text-[10px] font-bold uppercase tracking-[0.2em]`}>
                                {theme.icon && <theme.icon className="h-3 w-3" />}
                                <span>{subject.code}</span>
                            </div>
                            <h1 className="text-xl font-black tracking-tighter truncate max-w-[200px] md:max-w-none">
                                {subject.name}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant={solveMode ? "premium" : "outline"}
                            size="sm"
                            className="hidden md:flex gap-2 transition-all"
                            onClick={() => setSolveMode(!solveMode)}
                        >
                            {solveMode ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                            Solve Mode
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => runAnalysis()}
                            disabled={analyzing}
                            className="gap-2 border-zinc-800 hidden md:flex"
                        >
                            <RefreshCw className={`h-4 w-4 ${analyzing ? 'animate-spin' : ''}`} />
                            {insights ? 'Update Analysis' : 'Run AI Analysis'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* AI Analysis Status Banners */}
            <AnimatePresence>
                {rateLimitCountdown > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-6xl mx-auto px-6 md:px-10 pt-4"
                    >
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 backdrop-blur-sm">
                            <div className="relative w-10 h-10 shrink-0">
                                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15" fill="none" stroke="#78350f" strokeWidth="3" />
                                    <circle cx="18" cy="18" r="15" fill="none" stroke="#f59e0b" strokeWidth="3"
                                        strokeDasharray={`${(rateLimitCountdown / 60) * 94} 94`} strokeLinecap="round" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-amber-400">
                                    {rateLimitCountdown}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-amber-400 font-bold text-sm">Gemini Rate Limit — Auto-retrying in {rateLimitCountdown}s</p>
                                <p className="text-amber-400/60 text-xs">The AI is cooling down. Your analysis will resume automatically.</p>
                            </div>
                            <button
                                onClick={() => { clearInterval(countdownRef.current!); runAnalysis(); }}
                                className="shrink-0 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30 transition-colors"
                            >
                                Retry Now
                            </button>
                        </div>
                    </motion.div>
                )}
                {analysisSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-6xl mx-auto px-6 md:px-10 pt-4"
                    >
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                            <Sparkles className="h-5 w-5 text-emerald-400 shrink-0" />
                            <p className="text-emerald-400 font-semibold text-sm">AI Analysis updated successfully!</p>
                        </div>
                    </motion.div>
                )}
                {analysisError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-6xl mx-auto px-6 md:px-10 pt-4"
                    >
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25">
                            <Zap className="h-5 w-5 text-rose-400 shrink-0" />
                            <p className="text-rose-400 font-semibold text-sm">{analysisError}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-12">
                {/* AI Insights & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Topic Heatmap / Importance */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <Flame className="h-6 w-6 text-orange-500" /> Topic Importance Mapping
                            </h2>
                            {!insights && !analyzing && (
                                <Button variant="premium" size="sm" onClick={() => runAnalysis()}>Analyze Now</Button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Most Important */}
                            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 group hover:bg-emerald-500/10 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase">High Frequency</span>
                                </div>
                                <h3 className="font-bold text-lg mb-3">High-Yield Chapters</h3>
                                <div className="space-y-3">
                                    {insights?.mostImportantChapters?.map((ch: any) => (
                                        <div key={ch.name} className="space-y-1">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-zinc-200 font-medium">{ch.name}</span>
                                                <span className="text-emerald-400">{ch.frequency}%</span>
                                            </div>
                                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${ch.frequency}%` }}
                                                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                                />
                                            </div>
                                        </div>
                                    )) || <p className="text-zinc-600 text-sm italic">Run analysis to see data...</p>}
                                </div>
                            </div>

                            {/* Least Important */}
                            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 group hover:bg-rose-500/10 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400">
                                        <TrendingDown className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-rose-500 uppercase">Low Priority</span>
                                </div>
                                <h3 className="font-bold text-lg mb-3">Optional Modules</h3>
                                <div className="space-y-3">
                                    {insights?.leastImportantChapters?.map((ch: any) => (
                                        <div key={ch.name} className="space-y-1">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-zinc-400">{ch.name}</span>
                                                <span className="text-zinc-600">{ch.frequency}%</span>
                                            </div>
                                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${ch.frequency}%` }}
                                                    className="h-full bg-zinc-600"
                                                />
                                            </div>
                                        </div>
                                    )) || <p className="text-zinc-600 text-sm italic">Run analysis to see data...</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Stats Card */}
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center gap-6">
                        <div className="space-y-1">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Available Resources</h4>
                            <p className="text-3xl font-black text-white">{pyqs.length} <span className="text-sm font-normal text-zinc-500 font-sans">University Papers</span></p>
                        </div>
                        <div className="h-px bg-zinc-800 w-full" />
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                                <p className="text-2xl font-bold text-indigo-400">{insights?.flashcards?.reduce((acc: any, val: any) => acc + val.cards.length, 0) || 0}</p>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Flashcards</p>
                            </div>
                            <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                                <p className="text-2xl font-bold text-teal-400">{insights?.probableQuestions?.length || 0}</p>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">AI Predictions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Tabs */}
                <div className="space-y-8">
                    <div className="flex border-b border-zinc-900 overflow-x-auto no-scrollbar">
                        {[
                            { id: "pyqs", label: "University Papers", icon: BookOpen },
                            { id: "flashcards", label: "Fast Revision Cards", icon: Layers },
                            { id: "predictions", label: "AI Probable Questions", icon: Brain },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-6 py-4 flex items-center gap-2 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'border-indigo-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-indigo-400' : ''}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "pyqs" && (
                            <motion.div
                                key="pyqs"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            placeholder="Search by topic, year, or keywords..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-zinc-900/30 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                                        />
                                    </div>
                                    <Button
                                        variant={showImportant ? "premium" : "outline"}
                                        className="gap-2 border-zinc-800 transition-all"
                                        onClick={() => setShowImportant(!showImportant)}
                                    >
                                        <Star className={`h-4 w-4 ${showImportant ? 'text-white fill-white' : 'text-yellow-500'}`} />
                                        {showImportant ? "Showing Important" : "Important Only"}
                                    </Button>
                                    <Button
                                        variant={showRepeated ? "premium" : "outline"}
                                        className="gap-2 border-zinc-800 transition-all"
                                        onClick={() => setShowRepeated(!showRepeated)}
                                    >
                                        <Repeat className={`h-4 w-4 ${showRepeated ? 'text-white' : 'text-indigo-400'}`} />
                                        {showRepeated ? "Showing Repeated" : "Show Repeated"}
                                    </Button>
                                </div>

                                {showImportant && insights?.mostImportantChapters && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-indigo-500/20 p-2 rounded-lg">
                                                <Sparkles className="h-5 w-5 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-lg tracking-tight">AI High-Yield Focus</h3>
                                                <p className="text-xs text-zinc-400">Targeting the top 3 most-likely chapters found in PYQs</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {insights.mostImportantChapters.slice(0, 3).map((ch: any) => (
                                                <div key={ch.name} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-bold text-indigo-300 truncate pr-2">{ch.name}</span>
                                                        <span className="text-[10px] font-black bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded tracking-tighter">{ch.frequency}%</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {ch.topics?.slice(0, 4).map((topic: string) => (
                                                            <span key={topic} className="text-[9px] px-2 py-0.5 bg-black/40 border border-white/5 rounded-full text-zinc-400">
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Repeated Questions Panel */}
                                {showRepeated && (() => {
                                    // Collect all questions from all PYQ papers and find repeats
                                    const allQuestions: { text: string; years: number[] }[] = [];

                                    pyqs.forEach(pyq => {
                                        const questions = pyq.extractedContent?.questions || [];
                                        questions.forEach((q: string) => {
                                            if (!q || q.trim().length < 5) return;
                                            const normalized = q.trim().toLowerCase();
                                            // Find existing entry with fuzzy match (first 60 chars)
                                            const existing = allQuestions.find(e =>
                                                e.text.trim().toLowerCase().substring(0, 60) === normalized.substring(0, 60)
                                            );
                                            if (existing) {
                                                if (!existing.years.includes(pyq.year)) {
                                                    existing.years.push(pyq.year);
                                                }
                                            } else {
                                                allQuestions.push({ text: q.trim(), years: [pyq.year] });
                                            }
                                        });
                                    });

                                    const repeatedQuestions = allQuestions
                                        .filter(q => q.years.length > 1)
                                        .sort((a, b) => b.years.length - a.years.length);

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 overflow-hidden"
                                        >
                                            <div className="px-6 py-5 border-b border-indigo-500/10 flex items-center gap-3">
                                                <div className="bg-indigo-500/20 p-2 rounded-lg">
                                                    <Repeat className="h-5 w-5 text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-lg tracking-tight">Repeated Questions</h3>
                                                    <p className="text-xs text-zinc-400">Questions that appeared across multiple exam years</p>
                                                </div>
                                                <span className="ml-auto text-xs font-black bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full">
                                                    {repeatedQuestions.length} found
                                                </span>
                                            </div>

                                            <div className="p-6">
                                                {repeatedQuestions.length === 0 ? (
                                                    <div className="py-16 text-center">
                                                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                                            <Repeat className="h-6 w-6 text-zinc-700" />
                                                        </div>
                                                        <p className="text-zinc-400 font-bold">No question was repeated</p>
                                                        <p className="text-zinc-600 text-sm mt-1">All questions in the available papers are unique.</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {repeatedQuestions.map((q, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/30 transition-all group"
                                                            >
                                                                <div className="flex items-start gap-3 mb-3">
                                                                    <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center">
                                                                        ×{q.years.length}
                                                                    </span>
                                                                    <p className="text-zinc-100 font-semibold leading-snug group-hover:text-white transition-colors">
                                                                        {q.text}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-2 flex-wrap ml-10">
                                                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Appeared in:</span>
                                                                    {q.years.sort((a, b) => a - b).map(year => (
                                                                        <span key={year} className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                                                                            {year}
                                                                        </span>
                                                                    ))}
                                                                    {q.years.length >= 3 && (
                                                                        <span className="text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full ml-1">
                                                                            🔥 High Priority
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })()}

                                <div className="space-y-12">
                                    {Object.entries(
                                        (showRepeated ? pyqs : filteredPyqs).reduce((acc: any, pyq) => {
                                            const year = pyq.year;
                                            if (!acc[year]) acc[year] = [];
                                            acc[year].push(pyq);
                                            return acc;
                                        }, {})
                                    )
                                        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                                        .map(([year, yearPyqs]: [string, any]) => (
                                            <div key={year} className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <h3 className="text-xl font-black tracking-tighter text-white/50 bg-zinc-900/50 px-4 py-1 rounded-lg border border-zinc-800/50">
                                                        {year} <span className="text-[10px] uppercase tracking-widest ml-2 opacity-50">Papers</span>
                                                    </h3>
                                                    <div className="h-px bg-zinc-900 flex-1" />
                                                </div>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {yearPyqs.map((pyq: any) => (
                                                        <PYQCard
                                                            key={pyq._id}
                                                            id={pyq._id}
                                                            year={pyq.year}
                                                            subject={subject.name}
                                                            fileUrl={pyq.fileUrl}
                                                            difficulty={pyq.difficulty || "Medium"}
                                                            topics={pyq.topics || ["General"]}
                                                            repetitionCount={pyq.repetitionCount}
                                                            isImportant={pyq.isImportant || insights?.mostImportantChapters?.some((ch: any) =>
                                                                pyq.topics?.some((t: string) =>
                                                                    t.toLowerCase().includes(ch.name.toLowerCase()) ||
                                                                    ch.name.toLowerCase().includes(t.toLowerCase())
                                                                )
                                                            )}
                                                            solveMode={solveMode}
                                                            extractedContent={pyq.extractedContent}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                    {!showRepeated && filteredPyqs.length === 0 && (
                                        <div className="py-20 text-center border border-dashed border-zinc-900 rounded-3xl">
                                            <p className="text-zinc-600 font-medium">No papers matched your search.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "flashcards" && (
                            <motion.div
                                key="flashcards"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-8"
                            >
                                {insights?.flashcards ? (
                                    <>
                                        {/* Chapter Selector */}
                                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
                                            {insights.flashcards.map((chapter: any) => (
                                                <button
                                                    key={chapter.chapter}
                                                    onClick={() => setSelectedChapter(chapter.chapter)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedChapter === chapter.chapter
                                                        ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                                        : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                                                        }`}
                                                >
                                                    {chapter.chapter}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="max-w-2xl mx-auto">
                                            <Flashcard
                                                cards={insights.flashcards.find((c: any) => c.chapter === selectedChapter)?.cards || insights.flashcards[0].cards}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="max-w-2xl mx-auto py-20 text-center border border-dashed border-zinc-900 rounded-3xl space-y-4">
                                        <Layers className="h-12 w-12 text-zinc-800 mx-auto" />
                                        <div>
                                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No Flashcards Available</p>
                                            <p className="text-zinc-600 text-sm mt-1">Run the AI analysis to generate chapter-wise revision cards.</p>
                                        </div>
                                        <Button variant="premium" onClick={() => runAnalysis()} disabled={analyzing}>
                                            {analyzing ? (
                                                <><RefreshCw className="h-4 w-4 animate-spin mr-2" /> Generating...</>
                                            ) : 'Generate Now'}
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === "predictions" && (
                            <motion.div
                                key="predictions"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                {insights?.probableQuestions?.length > 0 ? (
                                    <>
                                        {/* Detection logic for grouped vs flat format */}
                                        {(() => {
                                            const isGrouped = !!insights.probableQuestions[0]?.chapter && Array.isArray(insights.probableQuestions[0]?.questions);

                                            if (isGrouped) {
                                                return (
                                                    <>
                                                        {/* Prediction Chapter Selector - Only show if grouped */}
                                                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
                                                            {insights.probableQuestions.map((chapter: any) => (
                                                                <button
                                                                    key={chapter.chapter}
                                                                    onClick={() => setSelectedChapterPredictions(chapter.chapter)}
                                                                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedChapterPredictions === chapter.chapter
                                                                        ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20'
                                                                        : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                                                                        }`}
                                                                >
                                                                    {chapter.chapter}
                                                                </button>
                                                            ))}
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {(insights.probableQuestions.find((c: any) => c.chapter === selectedChapterPredictions)?.questions || insights.probableQuestions[0].questions).map((q: any, i: number) => (
                                                                <QuestionCard key={i} q={q} />
                                                            ))}
                                                        </div>
                                                    </>
                                                );
                                            } else {
                                                // Flat format fallback
                                                return (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {insights.probableQuestions.map((q: any, i: number) => (
                                                            <QuestionCard key={i} q={q} />
                                                        ))}
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </>
                                ) : (
                                    <div className="col-span-2 py-20 text-center border border-dashed border-zinc-900 rounded-3xl space-y-4">
                                        <Sparkles className="h-12 w-12 text-zinc-800 mx-auto" />
                                        <p className="text-zinc-500 font-medium">Generate AI Predictions to see probable exam questions.</p>
                                        <Button variant="premium" onClick={() => runAnalysis()}>Generate AI Predictions</Button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {solveMode && (
                <AIGuruChat
                    subjectId={id}
                    subjectName={subject.name}
                />
            )}
        </div>
    );
}
