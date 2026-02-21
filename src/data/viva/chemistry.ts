import type { VivaSubject } from "./physics";

const chemistryViva: VivaSubject = {
    slug: "chemistry", name: "Chemistry", short: "CHEM",
    color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: "🧪",
    experiments: [
        {
            id: 1, name: "Determination of Alkalinity in Water — Acid-Base Titration",
            theory: {
                formulas: [
                    "Alkalinity (mg/L as CaCO₃) = (V_acid × N_acid × 50000) / V_sample",
                    "For phenolphthalein endpoint (P): Carbonate alkalinity = 2P",
                    "For methyl orange endpoint (M): Total alkalinity = M",
                    "Bicarbonate alkalinity = M − 2P"
                ],
                importantTopics: [
                    "Alkalinity is the capacity of water to neutralise acids — due to OH⁻, CO₃²⁻, and HCO₃⁻ ions.",
                    "Two-indicator method: Phenolphthalein (pH 8.3) detects P alkalinity; Methyl Orange (pH 4.5) detects total (M) alkalinity.",
                    "Types: Hydroxide (OH⁻), Carbonate (CO₃²⁻), Bicarbonate (HCO₃⁻) alkalinity.",
                    "High alkalinity → corrosion of metals; low pH → acidic water."
                ],
                usefulPoints: [
                    "Standard HCl or H₂SO₄ (0.02 N or 0.1 N) used as titrant.",
                    "Phenolphthalein: colourless in acid (pH<8.3), pink in base (pH>8.3).",
                    "Methyl orange: red in acid (pH<4.5), orange/yellow in base (pH>4.5).",
                    "Express result as mg/L of CaCO₃ for standard comparison."
                ]
            },
            procedure: [
                "Take 100 mL of the water sample in a clean conical flask.",
                "Add 2–3 drops of phenolphthalein indicator; if pink, titrate with standard H₂SO₄ until just colourless. Note volume V₁ (P endpoint).",
                "Add 2–3 drops of methyl orange to the same solution; continue titrating until colour changes from yellow to orange-red. Note additional volume V₂.",
                "Total titre = V₁ + V₂ (M endpoint).",
                "Calculate P and total alkalinity using the formula: Alkalinity = (V × N × 50000) / V_sample mg/L as CaCO₃.",
                "Determine type of alkalinity from P and M values."
            ],
            vivaQuestions: [
                { q: "What causes alkalinity in natural water?", a: "Alkalinity is caused by dissolved carbonates (CO₃²⁻), bicarbonates (HCO₃⁻), and hydroxides (OH⁻) of calcium, magnesium, sodium, and potassium. In most natural waters, bicarbonate is the primary contributor." },
                { q: "Why are two indicators used in alkalinity determination?", a: "Phenolphthalein detects alkalinity due to OH⁻ and half of CO₃²⁻ (P alkalinity). Methyl orange detects total alkalinity including the remaining CO₃²⁻ (converted to HCO₃⁻ by first titration) and HCO₃⁻. Together they distinguish all types." },
                { q: "What is the significance of expressing alkalinity as CaCO₃ equivalents?", a: "CaCO₃ (MW = 100, equivalent weight = 50) is used as a universal standard for comparison regardless of the actual ions causing alkalinity. It allows different water samples to be compared on the same scale." },
                { q: "What is the difference between P and M alkalinity?", a: "P (phenolphthalein) alkalinity: volume of acid to reach pH 8.3, neutralising OH⁻ and half CO₃²⁻. M (methyl orange) alkalinity: total acid to reach pH 4.5, neutralising all alkaline species including HCO₃⁻." },
                { q: "What happen if M = 2P?", a: "If M = 2P, all alkalinity is due to carbonates alone (no hydroxides, no bicarbonates). This is because P = M/2 means the full CO₃²⁻ → HCO₃⁻ → H₂CO₃ conversion is symmetrical." }
            ]
        },
        {
            id: 2, name: "pH Measurement and pH Metric Titration",
            theory: {
                formulas: [
                    "pH = −log[H⁺] = −log(a_H)",
                    "At equivalence point: V₁M₁ = V₂M₂ (acid-base neutralisation)",
                    "Buffer pH (Henderson-Hasselbalch): pH = pKa + log([A⁻]/[HA])"
                ],
                importantTopics: [
                    "pH measures hydrogen ion activity: pH < 7 = acidic, 7 = neutral, > 7 = basic.",
                    "pH meter: glass electrode (sensitive to H⁺) + reference electrode (Ag/AgCl); potential difference gives pH.",
                    "In potentiometric/pH-metric titration, pH is recorded after each addition of titrant.",
                    "Equivalence point: maximum slope (inflection point) on the pH vs volume curve."
                ],
                usefulPoints: [
                    "Calibrate the pH meter using buffers (pH 4 and pH 7) before use.",
                    "Equivalence point found by: 1) maximum in first derivative (dpH/dV), or 2) inflection point of S-curve.",
                    "Strong acid + strong base: equivalence pH = 7.",
                    "Weak acid + strong base: equivalence pH > 7 (salt of weak acid)."
                ]
            },
            procedure: [
                "Calibrate the digital pH meter with pH 4 and pH 7 standard buffer solutions.",
                "Take 25 mL of the acid sample in a beaker; immerse the pH electrode.",
                "Record the initial pH.",
                "Add NaOH titrant (from burette) in 0.5 mL increments; stir and record pH after each addition.",
                "Add titrant in smaller increments (0.1 mL) near the expected equivalence point.",
                "Continue until pH stabilizes in the alkaline region.",
                "Plot pH vs volume of titrant; identify the equivalence point (steepest rise)."
            ],
            vivaQuestions: [
                { q: "What is pH and how is it measured electrochemically?", a: "pH = −log[H⁺]. Electrochemically measured using a glass electrode (whose membrane potential varies with H⁺ concentration) paired with a reference electrode (constant potential). The EMF difference is converted to pH." },
                { q: "Why must the pH meter be calibrated before use?", a: "The glass electrode has a variable asymmetry potential that drift over time, temperature, and use. Calibration with standard buffers (pH 4, 7, 10) corrects for this, ensuring accurate measurements." },
                { q: "How do you identify the equivalence point from a pH metric titration curve?", a: "The equivalence point is the inflection point of the S-shaped pH vs volume curve — where the slope (dpH/dV) is maximum. Plotting dpH/dV vs V gives a peak at the equivalence point." },
                { q: "What is a buffer solution?", a: "A buffer resists pH change upon small addition of acid or base. It consists of a weak acid and its conjugate base (e.g., CH₃COOH/CH₃COONa). pH = pKa + log([A⁻]/[HA]) — Henderson-Hasselbalch equation." },
                { q: "Why is the equivalence point pH > 7 for weak acid + strong base titration?", a: "At equivalence, the solution contains the salt of the weak acid (e.g., sodium acetate). The acetate anion hydrolyses: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, making the solution basic (pH > 7)." }
            ]
        },
        {
            id: 3, name: "Cell Constant and Conductance — Conductometric Titration",
            theory: {
                formulas: [
                    "Conductance: G = 1/R (Siemens, S)",
                    "Specific conductance (κ): κ = G × (l/A) = G × K_cell",
                    "Cell constant: K_cell = l/A (cm⁻¹)",
                    "Equivalent conductance: Λ = κ/C (S·cm²/equiv)"
                ],
                importantTopics: [
                    "Cell constant K = l/A determined using a standard KCl solution of known conductivity.",
                    "Conductometric titration: conductance changes as ions are consumed/produced.",
                    "Strong acid + strong base: minimum conductance at equivalence point (mobile H⁺ replaced by slower Na⁺).",
                    "After equivalence: conductance rises (excess OH⁻ added)."
                ],
                usefulPoints: [
                    "AC current used (to avoid electrolysis/polarisation at electrodes).",
                    "Plot conductance vs volume of titrant; the break (V-shape) marks equivalence.",
                    "Cell constant in cm⁻¹: determined by calibrating with 0.1 N or 0.01 N KCl.",
                    "Kohlrausch's law: at infinite dilution Λ∞ = λ⁺ + λ⁻."
                ]
            },
            procedure: [
                "Determine the cell constant: fill the conductivity cell with standard KCl solution (known κ). Measure R. K_cell = κ × R.",
                "Rinse the cell; add 25 mL of the acid (HCl) sample.",
                "Measure initial conductance (G₀).",
                "Add NaOH titrant in 1 mL steps from the burette; measure G after each addition.",
                "Continue until conductance increases steadily after a minimum.",
                "Plot G vs volume of NaOH added; find the V-point (equivalence).",
                "Calculate concentration of acid using: M_acid × V_acid = M_base × V_base."
            ],
            vivaQuestions: [
                { q: "What is cell constant and how is it determined?", a: "Cell constant (K) = l/A (cm⁻¹) is the ratio of the electrode separation to the electrode area. Determined by filling the cell with a standard KCl solution (known specific conductance) and measuring resistance: K = κ × R." },
                { q: "Why is AC used in conductance measurements?", a: "DC causes electrolysis at electrodes (irreversible reactions, electrode coating) which changes the solution and gives incorrect readings. AC (typically 1 kHz) avoids electrolysis and polarisation." },
                { q: "Why does conductance pass through a minimum in acid-base conductometric titration?", a: "Highly mobile H⁺ ions (high equivalent conductance ~350) are neutralised by OH⁻ and replaced by slower Na⁺ ions (~50), so conductance drops initially. After equivalence, the excess OH⁻ (λ ≈ 198) raises conductance again." },
                { q: "What is Kohlrausch's law?", a: "At infinite dilution, the equivalent conductance of an electrolyte equals the sum of the equivalent conductances of its individual ions: Λ∞ = λ⁺ + λ⁻. It holds because ions are independent at infinite dilution (no interionic forces)." },
                { q: "How does conductometric titration differ from acid-base indicator titration?", a: "Conductometric titration uses electrical conductance to find equivalence — no indicator needed, can work with coloured or opaque solutions, and can titrate multiple acids sequentially. Indicator titration uses colour change which may be unclear in non-ideal conditions." }
            ]
        },
        {
            id: 4, name: "Surface Tension by Stalagmometer",
            theory: {
                formulas: [
                    "Surface tension by drop count: γ = γ_water × (n_water/n_liquid) × (ρ_liquid/ρ_water)",
                    "Drop weight method: mg = 2πrγ (Tate's law) → γ = mg/(2πr)",
                    "Relative surface tension: γ_liquid/γ_water = (n_w × ρ_L)/(n_L × ρ_w)"
                ],
                importantTopics: [
                    "Surface tension: force per unit length (N/m) or energy per unit area (J/m²) at a liquid surface.",
                    "Arises due to unbalanced cohesive forces on molecules at the surface.",
                    "Stalagmometer: glass tube with a bulb and a uniform tip — counts drops of liquid falling under gravity.",
                    "More drops = lower surface tension (each drop is smaller)."
                ],
                usefulPoints: [
                    "Count drops carefully — fill the bulb, let drops fall between two volume marks.",
                    "Temperature must be constant (surface tension decreases with temperature).",
                    "γ_water at 20°C = 72.75 × 10⁻³ N/m (standard reference).",
                    "Use relative method as absolute drop volume is difficult to measure accurately."
                ]
            },
            procedure: [
                "Clean the stalagmometer thoroughly; fill with distilled water using a rubber tube at the top.",
                "Allow drops to fall slowly; count the number of drops (n_w) between the two calibration marks.",
                "Repeat 3 times and take the mean.",
                "Rinse; fill with the test liquid. Count drops n_L between same marks.",
                "Measure the density of both liquids using a specific gravity bottle.",
                "Calculate γ_liquid = γ_water × (n_w/n_L) × (ρ_L/ρ_w)."
            ],
            vivaQuestions: [
                { q: "Define surface tension.", a: "Surface tension is the force per unit length acting tangentially along the surface of a liquid, or equivalently, the energy required to increase the surface area by unit amount. Unit: N/m or J/m². It arises from the net inward attraction of surface molecules." },
                { q: "Why do drops form on a stalagmometer?", a: "A drop grows at the tip until the gravitational force on the drop (mg) exceeds the surface tension force holding it (2πrγ). The drop detaches — this is the principle of Tate's law." },
                { q: "How does temperature affect surface tension?", a: "Surface tension decreases with increasing temperature because higher thermal energy weakens cohesive (attractive) forces between molecules. At the critical temperature, surface tension becomes zero." },
                { q: "What does a surfactant do to surface tension?", a: "Surfactants (soaps, detergents) are amphiphilic molecules that accumulate at the water surface, disrupting hydrogen bonding. They significantly reduce surface tension — enabling soaps to wet and clean surfaces." },
                { q: "Give two daily-life examples of surface tension.", a: "1) Water strider insects walking on water — surface film supports their weight. 2) Needle floating on still water. 3) Spherical shape of water drops (minimise surface area for given volume). 4) Capillary action in plants." }
            ]
        },
        {
            id: 5, name: "Viscosity by Ostwald Viscometer",
            theory: {
                formulas: [
                    "Poiseuille's equation: η = (πr⁴ΔPt)/(8Vl)",
                    "Relative viscosity: η_liquid/η_water = (t_L × ρ_L)/(t_w × ρ_w)",
                    "Kinematic viscosity: ν = η/ρ (m²/s or cSt)"
                ],
                importantTopics: [
                    "Viscosity (η) is internal resistance of a fluid to flow — friction between layers.",
                    "Ostwald viscometer: measures time for fixed volume of liquid to flow through a capillary.",
                    "Poiseuille's law: flow rate ∝ r⁴ΔP/ηl — viscosity from flow rate measurement.",
                    "Viscosity decreases with temperature for liquids (more thermal energy → less intermolecular force)."
                ],
                usefulPoints: [
                    "Use the same volume of both reference (water) and unknown liquid.",
                    "Temperature must be controlled (use a water bath) — η is very temperature-sensitive.",
                    "η_water at 25°C ≈ 0.89 × 10⁻³ Pa·s.",
                    "Relative method is preferred as absolute measurement of r and l is difficult."
                ]
            },
            procedure: [
                "Set the Ostwald viscometer in a water thermostat at the required temperature.",
                "Pipette a fixed volume of distilled water into the lower bulb.",
                "Suck water up into the upper bulb above the upper mark using a rubber tube.",
                "Release; start the stopwatch when the meniscus crosses the upper mark; stop at the lower mark.",
                "Record time t_w. Repeat three times.",
                "Replace water with the test liquid (same volume). Measure t_L.",
                "Measure densities. Calculate η_L = η_water × (t_L × ρ_L)/(t_w × ρ_w)."
            ],
            vivaQuestions: [
                { q: "Define viscosity and its SI unit.", a: "Viscosity (η) is the measure of a fluid's resistance to flow — it is the shear stress required per unit velocity gradient (Newton's law of viscosity: τ = η × du/dy). SI unit: Pascal-second (Pa·s) or N·s/m²." },
                { q: "State Poiseuille's law.", a: "For steady, laminar flow of a viscous fluid through a cylindrical tube: Q = πr⁴ΔP/(8ηl), where Q = volume flow rate, r = radius, ΔP = pressure difference, l = length, η = viscosity." },
                { q: "Why does viscosity decrease with temperature for liquids?", a: "Viscosity in liquids is mainly due to intermolecular attractions. As temperature rises, molecules have more thermal energy and can overcome these attractions more easily — the liquid flows more freely, reducing η." },
                { q: "What is kinematic viscosity?", a: "Kinematic viscosity ν = η/ρ (unit: m²/s or Stokes). It represents momentum diffusivity — how quickly momentum is transferred through the fluid. Used in fluid dynamics problems where density effects are significant." },
                { q: "What is the difference between a Newtonian and non-Newtonian fluid?", a: "Newtonian fluid: viscosity is constant regardless of shear rate (e.g., water, ethanol). Non-Newtonian fluid: viscosity changes with shear rate — shear thinning (paint, blood), shear thickening (cornstarch), or plastic (toothpaste, ketchup)." }
            ]
        },
        {
            id: 6, name: "Partition Coefficient between Two Immiscible Liquids",
            theory: {
                formulas: [
                    "Partition coefficient (K): K = C_org / C_aq (at equilibrium, same temperature)",
                    "Nernst distribution law: K = concentration in organic phase / concentration in aqueous phase",
                    "If solute associates: K_app = K^n where n = association number"
                ],
                importantTopics: [
                    "Partition (distribution) coefficient: ratio of concentration of a substance in two immiscible solvents at equilibrium.",
                    "Nernst's Distribution Law: K is constant at fixed temperature for non-associating solutes.",
                    "Example: Iodine (I₂) between CCl₄ and water — K ≈ 85 (strongly favours CCl₄).",
                    "Applications: solvent extraction, drug distribution (logP), chromatography."
                ],
                usefulPoints: [
                    "Shake the two-phase system thoroughly and allow complete separation before sampling.",
                    "The partition coefficient K is independent of initial concentration.",
                    "If the solute associates in one phase, K varies with concentration — use modified equation.",
                    "logP (log K for octanol/water) is a key parameter in pharmacology (drug lipophilicity)."
                ]
            },
            procedure: [
                "Prepare a separating funnel. Add known volume of aqueous I₂ solution.",
                "Add an equal or fixed volume of the organic solvent (CCl₄ or toluene). Shake vigorously for 5 min.",
                "Allow complete separation of layers. Drain the organic layer carefully.",
                "Titrate both phases against standard Na₂S₂O₃ solution using starch indicator.",
                "From titre values, calculate concentration in each phase.",
                "K = C_org/C_aq. Repeat with different initial concentrations to verify K is constant."
            ],
            vivaQuestions: [
                { q: "State Nernst's distribution law.", a: "When a solute is distributed between two immiscible solvents at equilibrium (constant T, P), the ratio of its concentrations in the two phases is constant: K = C_A/C_B. This ratio K is the partition coefficient (distribution coefficient)." },
                { q: "What are the conditions for Nernst's law to hold?", a: "1) Fixed temperature and pressure. 2) The solute must not react with either solvent. 3) The solute must be in the same molecular form in both solvents (no association or dissociation). 4) The concentration should be dilute." },
                { q: "What is logP and why is it important?", a: "logP is the logarithm of the partition coefficient of a compound between n-octanol and water. It measures lipophilicity. In pharmacology, logP ≈ 1–3 indicates good oral bioavailability. Very high logP → poor water solubility; very low → poor membrane absorption." },
                { q: "What happens to the distribution coefficient if the solute dimerises in one phase?", a: "If the solute dimerises in the organic phase, K increases with concentration (apparent K depends on concentration). The effective distribution ratio must account for the equilibrium between monomer and dimer." },
                { q: "How is solvent extraction based on partition coefficient?", a: "In liquid-liquid extraction (LLE), a compound preferentially distributes into one solvent (high K). Multiple extractions using small volumes of organic solvent are more efficient than one large extraction (uses the distribution equilibrium repeatedly)." }
            ]
        },
        {
            id: 7, name: "Determination of Rate Constant of a Reaction",
            theory: {
                formulas: [
                    "First order: k = (2.303/t) × log(a/(a−x))",
                    "First order half-life: t₁/₂ = 0.693/k (independent of concentration)",
                    "Second order: k = (1/t) × [x/(a(a−x))]",
                    "Integrated first order: ln[A] = ln[A₀] − kt"
                ],
                importantTopics: [
                    "Rate constant k: proportionality constant in rate = k[A]^m[B]^n.",
                    "First order reaction: rate ∝ [reactant] — log(a/(a-x)) vs t is linear.",
                    "Typical: acid hydrolysis of an ester, or inversion of sucrose (clock reaction).",
                    "k has units of 1/time (first order), L/(mol·time) (second order)."
                ],
                usefulPoints: [
                    "For hydrolysis of ethyl acetate with HCl catalyst: sample aliquots at intervals, quench and titrate with NaOH.",
                    "Plot log(V_∞ − V_t) vs t; slope = −k/(2.303).",
                    "Verify by checking t₁/₂ is constant (first order only).",
                    "Temperature affects k via Arrhenius equation: k = A·e^(−Ea/RT)."
                ]
            },
            procedure: [
                "Prepare the reaction mixture (e.g., ethyl acetate + HCl in water) at a controlled temperature (thermostat).",
                "At t=0, take a 5 mL aliquot into excess ice-cold water (quench); titrate with standard NaOH. Note V₀.",
                "At regular intervals (5, 10, 15... min), take aliquots, quench, and titrate. Note Vt.",
                "After reaction is complete (let it run >>t₁/₂), titrate final aliquot. Note V∞.",
                "Tabulate t, Vt, (V∞−Vt), and log(V∞−Vt).",
                "Plot log(V∞−Vt) vs t. Calculate k = −2.303 × slope.",
                "Find t₁/₂ = 0.693/k."
            ],
            vivaQuestions: [
                { q: "What is a rate constant?", a: "Rate constant k is the proportionality constant in the rate law: rate = k[A]^m[B]^n. It is characteristic of the reaction at a given temperature. Its units depend on the overall order of the reaction." },
                { q: "How is a first-order reaction identified experimentally?", a: "1) The half-life is constant (independent of initial concentration). 2) Plot of ln[A] vs t is linear with slope −k. 3) k calculated from first-order formula is constant at all time intervals." },
                { q: "What is the Arrhenius equation?", a: "k = A·exp(−Ea/RT), where A = frequency factor, Ea = activation energy, R = 8.314 J/mol·K, T = temperature (K). Plot ln(k) vs 1/T gives slope = −Ea/R, allowing Ea to be determined." },
                { q: "Why is an aliquot quenched in ice-cold water?", a: "Quenching (chilling in ice) dramatically slows the reaction rate (by reducing temperature to ~0°C), effectively 'freezing' the reaction at time t so that the titration can be done accurately without further reaction during measurement." },
                { q: "What is pseudo-first order reaction?", a: "A second or higher order reaction that appears first-order because one reactant is in large excess (essentially constant concentration). Example: ester hydrolysis in excess water acts as pseudo-first order (acid catalyst & water concentration ≈ constant)." }
            ]
        },
        {
            id: 8, name: "Potentiometry — Redox Potentials and EMF",
            theory: {
                formulas: [
                    "Nernst equation: E = E° − (RT/nF) ln Q = E° − (0.0592/n) log Q (at 25°C)",
                    "Cell EMF: E_cell = E_cathode − E_anode",
                    "Free energy: ΔG = −nFE",
                    "Equivalence point in potentiometric titration → maximum dE/dV"
                ],
                importantTopics: [
                    "Electrode potential depends on ion concentration (Nernst equation).",
                    "Standard electrode potential E° measured versus SHE (Standard Hydrogen Electrode).",
                    "EMF of a cell: E_cell = E°_cathode − E°_anode (when both at standard conditions).",
                    "Potentiometric titration: EMF changes with added titrant; equivalence at steepest EMF change."
                ],
                usefulPoints: [
                    "Calomel electrode (SCE) commonly used as reference (E = +0.242 V vs SHE).",
                    "In redox titration (e.g., Fe²⁺ titrated with KMnO₄): Pt electrode measures potential.",
                    "At equivalence: sudden jump in E (large dE/dV) — no indicator needed.",
                    "ΔG = −nFE_cell: negative ΔG → spontaneous cell reaction."
                ]
            },
            procedure: [
                "Set up the electrochemical cell: reference electrode (calomel) + indicator electrode (Pt or glass) in the analyte solution.",
                "Connect to a high-impedance pH/mV meter.",
                "Take 25 mL of FeSO₄ solution (analyte); add titrant (KMnO₄) in small volumes (0.5 mL intervals).",
                "Record the EMF (mV) after each addition, stirring well.",
                "Near equivalence, add titrant in 0.1 mL intervals.",
                "Plot E vs Volume; identify equivalence from inflection point or peak of dE/dV vs V curve.",
                "Calculate standard electrode potentials using the Nernst equation."
            ],
            vivaQuestions: [
                { q: "State the Nernst equation and explain each term.", a: "E = E° − (RT/nF)lnQ. E = electrode potential, E° = standard potential, R = 8.314 J/mol·K, T = temperature, n = electrons transferred, F = Faraday constant (96485 C/mol), Q = reaction quotient. At 25°C: E = E° − (0.0592/n)log Q." },
                { q: "What is SHE and why is it used as a reference?", a: "Standard Hydrogen Electrode (SHE): Pt electrode in 1M H⁺ solution with H₂ gas at 1 atm. By convention, E°_SHE = 0.000 V. All other electrode potentials are measured relative to SHE. It provides a universal reference point for electrochemical measurements." },
                { q: "How does potentiometric titration detect the equivalence point?", a: "During a redox (or acid-base) potentiometric titration, the cell EMF changes as titrant is added. At the equivalence point, there is a sharp (nearly vertical) jump in EMF. The maximum of the dE/dV vs V graph marks the equivalence point precisely." },
                { q: "What is the relation between cell EMF and Gibbs free energy?", a: "ΔG = −nFE_cell. If E_cell > 0, ΔG < 0 (spontaneous); if E_cell < 0, ΔG > 0 (non-spontaneous). This relation ties thermodynamics to electrochemistry." },
                { q: "Why is a high-impedance voltmeter required for EMF measurement?", a: "A high-impedance voltmeter draws negligible current from the cell, so the cell is not significantly perturbed. If significant current flows, the electrode potential shifts (IR drop, polarisation), giving incorrect EMF readings." }
            ]
        },
        {
            id: 9, name: "Determination of Hardness of Water",
            theory: {
                formulas: [
                    "Total hardness (mg/L as CaCO₃) = (Vol EDTA × Molarity EDTA × 100.09 × 1000) / Vol sample",
                    "EDTA complexes Ca²⁺ and Mg²⁺ in a 1:1 ratio",
                    "Temporary hardness = Total hardness − Permanent hardness"
                ],
                importantTopics: [
                    "Hardness caused by dissolved Ca²⁺ and Mg²⁺ salts (carbonates/bicarbonates/sulphates/chlorides).",
                    "Temporary hardness: due to Ca(HCO₃)₂, Mg(HCO₃)₂ — removed by boiling.",
                    "Permanent hardness: due to CaSO₄, MgSO₄, CaCl₂ — removed only by chemical treatment/ion exchange.",
                    "EDTA (Ethylene Diamine Tetra Acetic Acid) forms stable 1:1 complexes with Ca²⁺ and Mg²⁺."
                ],
                usefulPoints: [
                    "Indicator: Eriochrome Black T (EBT) — wine red with Ca²⁺/Mg²⁺, blue at endpoint.",
                    "pH must be ~10 (ammoniacal buffer) for EBT to work properly.",
                    "For Ca hardness alone: use fluorescent indicator at pH ~12 (Mg(OH)₂ precipitates).",
                    "Express hardness in mg/L of CaCO₃ equivalent — compare to WHO standard (<500 mg/L)."
                ]
            },
            procedure: [
                "Take 100 mL of water sample in a conical flask.",
                "Add 2–3 mL of ammonium buffer solution (pH 10) and 5–6 drops of EBT indicator (solution turns wine-red).",
                "Titrate with standard EDTA solution (0.01 M) from the burette until colour changes from wine-red to blue (endpoint).",
                "Note volume of EDTA used (V₁). This gives total hardness.",
                "For Ca hardness alone: take another 100 mL sample; add NaOH to pH 12 (precipitates Mg(OH)₂); use Murexide indicator; titrate with EDTA.",
                "Calculate: Total hardness = V(EDTA) × M(EDTA) × 100000 / V(sample) mg/L as CaCO₃."
            ],
            vivaQuestions: [
                { q: "Define temporary and permanent hardness.", a: "Temporary hardness: due to Ca(HCO₃)₂ and Mg(HCO₃)₂; removed by boiling (carbonates precipitate). Permanent hardness: due to CaSO₄, MgSO₄, CaCl₂, MgCl₂; not removed by boiling — needs lime-soda process or ion exchange." },
                { q: "What is EDTA and why is it used to measure hardness?", a: "EDTA (H₄Y) is a hexadentate chelating agent that forms very stable 1:1 complexes with Ca²⁺ and Mg²⁺ (M + Y⁴⁻ → MY²⁻). Since it reacts stoichiometrically, the volume used directly gives the total Ca²⁺ + Mg²⁺ content." },
                { q: "What is the role of the EBT indicator?", a: "Eriochrome Black T (EBT) forms a wine-red complex with Ca²⁺ and Mg²⁺ at pH 10. EDTA has a stronger affinity for the metals than EBT does. During titration, EDTA displaces EBT from the metal complex; free EBT turns blue — sharp endpoint." },
                { q: "Why is the pH maintained at 10 for total hardness determination?", a: "EBT works best at pH 10 (ammoniacal buffer). At lower pH, complex stability decreases; at higher pH, Mg(OH)₂ precipitates (Mg²⁺ not detected). pH 10 allows both Ca²⁺ and Mg²⁺ to be complexed." },
                { q: "What are the harmful effects of hard water?", a: "1) Wastes soap (Ca/Mg soaps are insoluble). 2) Scales in boilers (CaCO₃, CaSO₄ — poor heat transfer, risk of explosion). 3) Blocks pipes. 4) Causes kidney stones in humans. 5) Affects taste of drinking water." }
            ]
        }
    ]
};

export default chemistryViva;
