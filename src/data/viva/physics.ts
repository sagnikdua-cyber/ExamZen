export interface VivaQuestion { q: string; a: string; }
export interface VivaExperiment {
    id: number;
    name: string;
    theory: { formulas: string[]; importantTopics: string[]; usefulPoints: string[]; };
    procedure: string[];
    vivaQuestions: VivaQuestion[];
}
export interface VivaSubject {
    slug: string; name: string; short: string;
    color: string; bg: string; border: string; icon: string;
    experiments: VivaExperiment[];
}

const physicsViva: VivaSubject = {
    slug: "physics", name: "Physics", short: "PHY",
    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "⚛️",
    experiments: [
        {
            id: 1, name: "Newton's Ring — Radius of Curvature of Plano-Convex Lens",
            theory: {
                formulas: [
                    "Diameter of nth dark ring: Dₙ² = 4nλR",
                    "Radius of curvature: R = (Dₘ² − Dₙ²) / [4(m−n)λ]",
                    "Wavelength from ring diameters: λ = (Dₘ² − Dₙ²) / (4R(m−n))"
                ],
                importantTopics: [
                    "Newton's rings are interference fringes formed by thin air film between a plano-convex lens and a flat glass plate.",
                    "The air film thickness t at radius r: 2t = mλ (bright) or (2m+1)λ/2 (dark)",
                    "Centre ring is always dark (destructive interference due to phase reversal at the denser medium).",
                    "Rings get closer together as we move outward — spacing ∝ 1/√n."
                ],
                usefulPoints: [
                    "Use sodium light (λ ≈ 589 nm) for monochromatic illumination.",
                    "Measure diameters (not radii) to reduce measurement error.",
                    "Plot Dₙ² vs n — slope gives 4λR, from which R is found.",
                    "Avoid parallax error when viewing the eyepiece crosswire."
                ]
            },
            procedure: [
                "Clean the plano-convex lens and flat glass plate; mount lens (curved side down) on the plate.",
                "Place the arrangement on the stage of the travelling microscope.",
                "Illuminate with sodium light at 45° using a glass plate reflector.",
                "Focus the microscope until clear concentric rings are visible.",
                "Move the microscope to the left extreme and record the lateral position for each ring (from n=5 to n=20) moving to the right.",
                "Measure the diameter Dₙ = left reading − right reading for each ring n.",
                "Plot Dₙ² vs n; find slope = 4λR.",
                "Calculate R = slope / (4λ)."
            ],
            vivaQuestions: [
                { q: "Why is the central ring dark in Newton's rings?", a: "At the centre, the air film thickness is zero. Reflected rays from the top and bottom of the air film undergo a phase difference of π (due to reflection at a denser medium at the glass plate), giving destructive interference — hence a dark centre." },
                { q: "What is the effect of using white light instead of monochromatic light?", a: "White light produces coloured rings (each wavelength forms its own ring set). The rings overlap and become indistinct beyond 8–10 orders. Only the first few rings appear coloured — no clear measurement is possible." },
                { q: "Why is the diameter squared (Dₙ²) plotted against the ring number n?", a: "Because Dₙ² = 4nλR is a linear relation between Dₙ² and n. Plotting Dₙ² vs n gives a straight line whose slope = 4λR, allowing easy calculation of R." },
                { q: "What happens if the glass plate is not flat?", a: "The rings become distorted (non-circular), introducing errors in diameter measurement and making the formula inapplicable." },
                { q: "Why is sodium light used?", a: "Sodium light is nearly monochromatic (λ ≈ 589 nm, doublet close together), giving sharp, well-defined rings without colour overlap." },
                { q: "What type of interference occurs in Newton's rings?", a: "Localised thin film interference (equal inclination / equal thickness) — the two interfering beams originate from a thin air film of varying thickness." }
            ]
        },
        {
            id: 2, name: "Diffraction Grating — Wavelength of Light",
            theory: {
                formulas: [
                    "Grating equation: (a+b) sin θ = nλ",
                    "Wavelength: λ = (a+b) sin θ / n",
                    "Grating element: (a+b) = 1/N, where N = number of lines per cm"
                ],
                importantTopics: [
                    "A diffraction grating has thousands of equally-spaced slits. (a+b) is the grating element (slit + opaque part).",
                    "Constructive interference occurs when path difference = nλ (n = order of diffraction).",
                    "Higher order gives farther angular separation but lower intensity.",
                    "The spectrum is dispersed on both sides of the central maximum (n=0)."
                ],
                usefulPoints: [
                    "Adjust the spectrometer to give sharp, vertical, parallel slit image before placing grating.",
                    "The grating must be normal to the incident light (use auto-collimation method).",
                    "Measure angle on both sides of normal and take average θ = (θ_L + θ_R)/2.",
                    "For a 15000 LPI grating: (a+b) = 1/15000 cm."
                ]
            },
            procedure: [
                "Set up and level the spectrometer; adjust eyepiece for sharp cross-wire.",
                "Illuminate the slit with the given light source; focus the collimator for parallel rays.",
                "Mount the diffraction grating on the prism table normal to the incident light.",
                "Observe the 1st and 2nd order diffraction maxima on both sides of the direct beam.",
                "Record the vernier reading for each spectral line on both sides; compute θ = (θ_L − θ_R)/2.",
                "Apply λ = (a+b) sinθ / n to calculate the wavelength.",
                "Repeat for different orders and find the mean λ."
            ],
            vivaQuestions: [
                { q: "What is a diffraction grating?", a: "A diffraction grating is an optical device consisting of a large number of equally-spaced parallel slits ruled on a glass or metal surface. It disperses light into its component wavelengths by diffraction." },
                { q: "State the grating equation.", a: "(a+b) sin θ = nλ, where (a+b) is the grating element, θ is the diffraction angle for order n, and λ is wavelength." },
                { q: "Why is the grating placed normal to the incident light?", a: "To ensure the path difference formula (a+b) sinθ = nλ holds correctly. If tilted, the formula needs modification, introducing error." },
                { q: "What is the difference between diffraction and interference?", a: "Interference is superposition of waves from discrete sources; diffraction is bending of waves around obstacles/slits. In a grating, both occur — diffraction at each slit, interference between slits." },
                { q: "Why are higher-order spectra dimmer?", a: "The intensity of diffracted orders decreases because the single-slit diffraction envelope modulates the multi-slit interference pattern. Higher orders fall further into the weaker regions of this envelope." },
                { q: "What is the dispersive power of a grating?", a: "Dispersive power = dθ/dλ = n/[(a+b) cos θ]. It is higher for larger n (order) and smaller grating element." }
            ]
        },
        {
            id: 3, name: "Franck-Hertz Experiment — Excitation Potential of Gas",
            theory: {
                formulas: [
                    "Excitation energy: E = eV₀ (eV), where V₀ = excitation potential",
                    "Wavelength of emitted photon: λ = hc/E = hc/(eV₀)",
                    "Energy levels: ΔE = hν = E₂ − E₁"
                ],
                importantTopics: [
                    "Demonstrates quantisation of atomic energy levels — electrons lose discrete energy in inelastic collisions with gas atoms.",
                    "Regular drops in anode current occur each time electron energy equals the excitation potential (≈ 4.9 V for Mercury).",
                    "The spacing between successive current minima equals the excitation potential of the gas.",
                    "For Hg: excitation potential ≈ 4.9 V; emitted UV photon at 254 nm."
                ],
                usefulPoints: [
                    "Current drops are not zero — some electrons reach the anode without collision.",
                    "The retarding voltage between grid and anode is set to a small value (~ 1.5 V) to block slow electrons.",
                    "Plot I (anode current) vs V (accelerating voltage) — peaks separated by ~4.9 V.",
                    "Temperature of the Hg tube must be controlled (~180°C) for proper vapour pressure."
                ]
            },
            procedure: [
                "Set up the Franck-Hertz apparatus; heat the mercury-filled tube to the required temperature.",
                "Set the retarding voltage (V_R) between grid G2 and anode A to ~1.5 V.",
                "Increase the accelerating voltage (V_A) slowly from 0 to ~60 V in small steps.",
                "Record the anode current I at each voltage step using a microammeter.",
                "Note the voltage values at which the current drops sharply (collision events).",
                "Calculate the excitation potential as the average spacing between successive minima.",
                "Plot I vs V_A and identify the periodic minima."
            ],
            vivaQuestions: [
                { q: "What does the Franck-Hertz experiment prove?", a: "It proves that atomic energy levels are quantised — electrons can only excite atoms by discrete amounts of energy (the excitation potential), confirming Bohr's atomic model." },
                { q: "Why does the anode current drop periodically?", a: "When electron kinetic energy equals the excitation energy of the gas atoms (4.9 eV for Hg), electrons lose their energy in inelastic collisions, becoming too slow to overcome the retarding voltage — hence the current drops." },
                { q: "What is the significance of the spacing between successive minima?", a: "Each spacing equals the excitation potential of the gas. For Hg it is ~4.9 V, corresponding to the 6s→6p electron transition." },
                { q: "What is the retarding voltage and why is it applied?", a: "Retarding voltage (applied between grid G2 and anode A) slows down all electrons. Only those with sufficient energy to overcome it reach the anode. This ensures detected current drops sharply." },
                { q: "What type of collision do electrons undergo in this experiment?", a: "Elastic collisions (when eV < excitation energy, energy is conserved) and inelastic collisions (when eV ≥ excitation energy, electron gives up a quantum of energy to the atom)." },
                { q: "Why is mercury (Hg) vapour used in the standard experiment?", a: "Mercury has a well-defined first excitation potential of 4.9 eV, its vapour pressure can be controlled, and the corresponding UV emission (254 nm) is well-documented." }
            ]
        },
        {
            id: 4, name: "Young's Modulus by Flexure Method",
            theory: {
                formulas: [
                    "Young's Modulus: Y = MgL³ / (4bd³δ)",
                    "Depression at midpoint: δ = MgL³ / (4Ybd³)",
                    "For rectangular cross-section: I = bd³/12 (second moment of area)"
                ],
                importantTopics: [
                    "Young's Modulus (Y) measures the stiffness of a material — ratio of longitudinal stress to strain.",
                    "In flexure method, a beam supported at two ends is loaded at the centre; the sagging is measured.",
                    "The neutral surface (middle plane) has zero stress — above is compressed, below is stretched.",
                    "b = breadth, d = depth (thickness) of beam, L = length between knife-edges, M = added mass."
                ],
                usefulPoints: [
                    "Depth d appears as d³ — measure it accurately with a screw gauge (most sensitive parameter).",
                    "Take readings for both increasing and decreasing loads to eliminate hysteresis.",
                    "Ensure beam is horizontal before loading; knife-edges must be parallel.",
                    "Plot δ vs M; Y = gL³ / (4bd³ × slope)."
                ]
            },
            procedure: [
                "Measure the length L between the knife-edges with a metre scale.",
                "Measure breadth b and depth d of the beam at several points with Vernier callipers and screw gauge.",
                "Place the beam symmetrically on the knife-edges; set the pin at the midpoint.",
                "Mount a travelling microscope focused on the tip of the pin for depression measurement.",
                "Start with an initial load (to straighten the beam), note the microscope reading.",
                "Add masses M in equal steps; record the microscope reading (depression δ) for each.",
                "Repeat for unloading. Tabulate M and δ; find mean δ for each M.",
                "Calculate Y = MgL³ / (4bd³δ)."
            ],
            vivaQuestions: [
                { q: "What is Young's Modulus?", a: "Young's Modulus is the ratio of longitudinal stress to longitudinal strain within the elastic limit. Y = (F/A)/(ΔL/L). It measures the stiffness of a material." },
                { q: "Why is d³ more important to measure accurately than b?", a: "In the formula Y = MgL³/(4bd³δ), d appears as the cube while b is linear. A small error in d contributes three times more error to Y than the same fractional error in b." },
                { q: "What is the neutral axis?", a: "The neutral axis/surface is the longitudinal plane in a bent beam where neither compression nor tension exists. Above it the beam is compressed; below it is stretched (for a downward load). Stress is zero at this surface." },
                { q: "Why do we take readings for both loading and unloading?", a: "To eliminate hysteresis — the beam may not return exactly to its original position due to internal friction. Averaging loading and unloading readings gives the true elastic depression." },
                { q: "How does Young's modulus differ from Modulus of Rigidity?", a: "Young's modulus (Y) relates to longitudinal (tensile/compressive) deformation. Modulus of Rigidity (η) relates to shear deformation. They are related by: Y = 2η(1 + σ), where σ is Poisson's ratio." },
                { q: "What is the effect of increasing beam length on depression δ?", a: "δ ∝ L³. Doubling L increases the depression 8 times, making the experiment more sensitive for longer beams." }
            ]
        },
        {
            id: 5, name: "Band Gap of Semiconductor — Four-Probe Method",
            theory: {
                formulas: [
                    "Resistivity: ρ = (V/I) × 2πs (for thin sample, correction factor applied)",
                    "Conductivity: σ = 1/ρ",
                    "Band gap energy: Eg = 2k × slope of ln(ρ) vs 1/T graph",
                    "Intrinsic carrier density: σ = σ₀ exp(−Eg/2kT)"
                ],
                importantTopics: [
                    "In an intrinsic semiconductor, conductivity increases with temperature (more carriers generated).",
                    "Band gap Eg separates the valence band from conduction band.",
                    "Four-probe method eliminates contact resistance — current flows through outer probes, voltage measured across inner probes.",
                    "For Germanium: Eg ≈ 0.67 eV; Silicon: 1.1 eV"
                ],
                usefulPoints: [
                    "Plot graph of ln(ρ) vs 1/T (Kelvin); slope = Eg/2k.",
                    "Temperature range: 300 K to ~450 K. Convert all temperature readings to Kelvin.",
                    "The current I is kept constant throughout the experiment.",
                    "The probe spacing s must be uniform and much smaller than sample dimensions."
                ]
            },
            procedure: [
                "Mount the semiconductor chip on the four-probe setup; connect to the temperature-controlled oven.",
                "Connect the outer probes to the current source and inner probes to a millivoltmeter.",
                "Set a constant current (say 5 mA) using the current source.",
                "Heat the sample gradually; record the temperature T and voltage V at regular intervals.",
                "Calculate resistivity ρ = (V/I) × 2πs (with correction factor) at each temperature.",
                "Tabulate T, 1/T, ρ, and ln(ρ).",
                "Plot ln(ρ) vs 1/T — fit a straight line; slope = Eg/2k.",
                "Calculate Eg = 2k × |slope|."
            ],
            vivaQuestions: [
                { q: "Why is the four-probe method used instead of two probes?", a: "Two probes include contact resistance in the measurement, which can be comparable to the sample resistance. Four probes separate current injection from voltage measurement, eliminating contact resistance error." },
                { q: "Why does resistivity decrease with temperature in a semiconductor?", a: "As temperature rises, more electrons gain enough thermal energy to jump to the conduction band. The increase in carrier concentration outweighs the decrease in mobility, so conductivity increases and resistivity decreases." },
                { q: "What is the band gap and what does it represent?", a: "Band gap (Eg) is the energy difference between the top of the valence band and the bottom of the conduction band. It represents the minimum energy needed to excite an electron from the valence band to the conduction band." },
                { q: "Why do we plot ln(ρ) vs 1/T instead of ρ vs T?", a: "Because σ = σ₀ exp(−Eg/2kT), so ln(ρ) = ln(1/σ₀) + (Eg/2k)(1/T). This is linear in 1/T, so the slope directly gives Eg/2k — a straight-line graph is easier to analyse." },
                { q: "What is an intrinsic semiconductor?", a: "An intrinsic semiconductor is a pure semiconductor (no intentional impurities) where carrier concentration is determined purely by temperature-dependent thermal generation. At absolute zero it behaves as an insulator." },
                { q: "How does the band gap differ between conductors, semiconductors, and insulators?", a: "Conductors: ~0 eV (overlapping bands). Semiconductors: ~0.1–2 eV (Eg can be overcome thermally). Insulators: >4 eV (thermal excitation is negligible at room temperature)." }
            ]
        },
        {
            id: 6, name: "Carey Foster's Bridge — Low Resistance",
            theory: {
                formulas: [
                    "Wheatstone bridge balance: P/Q = R/S",
                    "Carey Foster formula: X = R − σ(l₂ − l₁), where σ = resistance per unit length",
                    "Resistance per unit length: σ = (R₁−R₂)/(l₁−l₂) [using two known resistances]"
                ],
                importantTopics: [
                    "Carey Foster's bridge is a modified Wheatstone bridge used to measure very small (low) resistances.",
                    "The bridge wire replaces the ratio arms — provides continuous comparison.",
                    "Resistance per unit length σ is first determined by swapping two equal resistances.",
                    "The balance point shifts when unknown resistance X is introduced instead of a known R."
                ],
                usefulPoints: [
                    "Use a long, uniform bridge wire (typically 1 m).",
                    "Null deflection in the galvanometer → bridge balanced.",
                    "Steady the current by using a rheostat and checking battery stability.",
                    "σ must be determined precisely — systematic error propagates to X."
                ]
            },
            procedure: [
                "Set up the Carey Foster's bridge with battery, galvanometer, and bridge wire.",
                "First determine σ: replace P and Q with two equal resistances (P=Q). Place two similar resistances R₁ in both gaps. Note balance point l₁.",
                "Swap R₁ and R₁ (or replace one with slightly different R₂); note new balance point l₂. Then σ = (R₁−R₂)/(l₁−l₂).",
                "Now place unknown resistance X in one gap and the known R in the other.",
                "Find balance point l₁' with P and Q in original positions.",
                "Swap P and Q, find new balance l₂'.",
                "Calculate X = R − σ(l₁' − l₂') or X = R + σ(l₂' − l₁') depending on the setup."
            ],
            vivaQuestions: [
                { q: "What is the principle of Wheatstone bridge?", a: "When the bridge is balanced, P/Q = R/S, and no current flows through the galvanometer. This null condition is used to find an unknown resistance accurately." },
                { q: "Why is Carey Foster's bridge preferred for low resistance measurement?", a: "Ordinary Wheatstone bridge has errors due to contact and lead resistances at terminals, which are significant compared to very low resistances. Carey Foster's bridge compensates for these by measuring the shift in balance point on a calibrated wire." },
                { q: "How is the resistance per unit length (σ) determined?", a: "By placing two equal resistances in the ratio arms and two known resistances in the remaining gaps, then finding the balance points before and after swapping. σ = (R₁−R₂)/(l₁−l₂)." },
                { q: "What is the condition for Carey Foster's bridge balance?", a: "P/(bridge wire up to balance) = Q/(rest of bridge wire), equivalent to Wheatstone bridge null: P·S = Q·R." },
                { q: "What errors must be minimised in this experiment?", a: "End error (contact resistance at wire ends), thermoelectric EMF effects (copper-manganin junctions), resistance variations due to heating, and parallax error in reading the wire scale." },
                { q: "What materials are used for the bridge wire and why?", a: "Manganin or Nichrome — they have high resistivity (good sensitivity), low temperature coefficient (stable readings), and low thermoelectric EMF against copper." }
            ]
        },
        {
            id: 7, name: "Modulus of Rigidity — Static Method (Wire Twist)",
            theory: {
                formulas: [
                    "Modulus of Rigidity: η = 2gLMr² / (πa⁴θ)",
                    "Restoring torque of wire: τ = (πηa⁴/2L)θ",
                    "Angle of twist θ (radians) measured at equilibrium under applied torque τ = Mgr"
                ],
                importantTopics: [
                    "Modulus of Rigidity (η) is the ratio of shear stress to shear strain.",
                    "When a cylinder (wire) is twisted, each cross-section rotates relative to the next — shear strain.",
                    "In static method: a known torque (couple) is applied and the resulting twist angle is measured.",
                    "a = radius of wire, L = length, r = radius of the disc where weights are hung."
                ],
                usefulPoints: [
                    "Measure wire radius a very accurately (screw gauge) — it appears as a⁴.",
                    "Take θ readings for increasing and decreasing loads to average out hysteresis.",
                    "Ensure the wire is straight and not kinked before starting.",
                    "Plot θ vs M — slope gives 2gLr²/(πa⁴η), allowing η calculation."
                ]
            },
            procedure: [
                "Set up the experimental wire (clamped at top, disc at bottom). Measure L and a.",
                "Note the position of the pointer at zero load.",
                "Apply masses M on the disc's rim weights (tangentially); record twist angle θ from the graduated scale.",
                "Increase M in steps; at each step note θ. Repeat for decreasing M.",
                "Tabulate M and θ, find mean θ for each M.",
                "Plot θ vs M; find slope = 2gLr²/(πa⁴η).",
                "Calculate η = 2gLr²/(πa⁴ × slope)."
            ],
            vivaQuestions: [
                { q: "Define Modulus of Rigidity.", a: "Modulus of Rigidity (η or G) is the ratio of shear stress to shear strain. η = τ/γ, where τ is shear stress and γ is shear angle. It quantifies a material's resistance to shape change (twisting/shearing)." },
                { q: "What is the difference between static and dynamic methods for η?", a: "Static method: apply a known torque and measure the resulting angle of twist. Dynamic method: allow the disc to oscillate under the restoring torque of the wire and measure the time period. Dynamic method is more accurate as it eliminates friction effects." },
                { q: "Why does wire radius appear as a⁴ in the formula?", a: "Torque resisting twist integrates the shear stress over the cross-section. The contribution of each ring element is proportional to r³·dr, and integrating from 0 to a gives ∫r³dr = a⁴/4, hence the a⁴ dependence." },
                { q: "What is shear strain?", a: "Shear strain is the angular deformation produced by shear stress — the tangent of the angle by which the material has been deformed (small angle ≈ angle in radians). γ = x/y for a rectangular element displaced by x over height y." },
                { q: "How does the length L of the wire affect the rigidity calculation?", a: "Longer wire twists more for the same torque (more compliant). The twist angle θ ∝ L. So η ∝ L/θ — a longer wire gives a larger, more accurately measured θ." }
            ]
        },
        {
            id: 8, name: "Modulus of Rigidity — Dynamic Method (Torsional Pendulum)",
            theory: {
                formulas: [
                    "Time period: T = 2π√(I/C), where C = πηa⁴/(2L)",
                    "Modulus of Rigidity: η = 8πIL / (a⁴T²)",
                    "Moment of inertia of disc: I = MR²/2"
                ],
                importantTopics: [
                    "The disc performs torsional oscillations — wire provides restoring couple.",
                    "Torsional constant C = πηa⁴/(2L): stiffness of the wire.",
                    "Moment of inertia I can be changed by adding known masses at known distances on the disc.",
                    "T²= 4π²I/C — plot T² vs I gives C, hence η."
                ],
                usefulPoints: [
                    "Count oscillations over at least 20 cycles to reduce timing error.",
                    "Give a small initial twist (< 5°) to keep motion in elastic limit.",
                    "Measure a with screw gauge at multiple points and take mean.",
                    "Avoid air currents near the pendulum during oscillation."
                ]
            },
            procedure: [
                "Suspend the disc from the wire clamped at the top. Measure L and a.",
                "Set the disc into torsional oscillation with a small twist (~3–5°). Start timing.",
                "Measure the time for 20 oscillations; calculate T₀ (period without extra masses).",
                "Place two equal masses m symmetrically at distance d₁ from centre; measure T₁.",
                "Move masses to d₂; measure T₂.",
                "Calculate I₀ (disc only) from T₀²/I₀ = constant, and the added moments of inertia.",
                "Use η = 8πIL/(a⁴T²) to compute η."
            ],
            vivaQuestions: [
                { q: "What is a torsional pendulum?", a: "A torsional pendulum consists of a disc/body suspended from a wire. When twisted and released, it undergoes SHM under the restoring torque of the wire, with period T = 2π√(I/C)." },
                { q: "Why is the dynamic method more accurate than the static method?", a: "Dynamic method measures time period (easily timed accurately over many cycles). Static method relies on friction-free application of torque and accurate reading of small angles, which is more error-prone." },
                { q: "What is the torsional constant C?", a: "C = πηa⁴/(2L) — it is the restoring torque per unit angle of twist (analogous to spring constant k in linear SHM). Higher C means a stiffer wire." },
                { q: "How do you increase the sensitivity of this experiment?", a: "Use a longer and thinner wire (reduces C, increases T), which gives a longer, more easily measurable time period. Large period reduces percentage timing error." },
                { q: "Why must the amplitude of oscillation be kept small?", a: "To remain within the elastic limit of the wire where Hooke's law holds (restoring torque ∝ twist angle). Large amplitudes cause non-linear behaviour and Hooke's law breaks down." }
            ]
        },
        {
            id: 9, name: "Solar Cell Characteristics",
            theory: {
                formulas: [
                    "FF (Fill Factor) = (V_mp × I_mp) / (V_oc × I_sc)",
                    "Efficiency η = P_max / P_in = (V_oc × I_sc × FF) / (P_light × A)",
                    "Diode equation: I = I_sc − I_0[exp(eV/nkT) − 1]"
                ],
                importantTopics: [
                    "Photovoltaic effect: incident photons generate electron-hole pairs at the p-n junction.",
                    "V_oc (open-circuit voltage): maximum voltage at zero current.",
                    "I_sc (short-circuit current): maximum current at zero voltage.",
                    "Fill Factor (FF) measures how 'rectangular' the I-V curve is — ideal = 1."
                ],
                usefulPoints: [
                    "Study the I-V characteristics under illumination (solar or lamp).",
                    "V_mp and I_mp are at the maximum power point (MPP).",
                    "Dark characteristics follow normal diode behaviour.",
                    "Increasing light intensity increases I_sc but V_oc changes logarithmically."
                ]
            },
            procedure: [
                "Connect the solar cell to a variable resistance (rheostat), voltmeter, and ammeter.",
                "Illuminate the cell with a regulated lamp at a fixed distance.",
                "Vary the load resistance from 0 (short circuit) to ∞ (open circuit).",
                "Record V (voltage) and I (current) at each resistance setting.",
                "Plot I-V characteristic curve; mark I_sc, V_oc, and the maximum power point (V_mp, I_mp).",
                "Calculate FF and efficiency.",
                "Repeat for different light intensities and plot."
            ],
            vivaQuestions: [
                { q: "What is the photovoltaic effect?", a: "The photovoltaic effect is the generation of voltage or current in a material upon exposure to light. In a solar cell, photons with energy ≥ band gap create electron-hole pairs at the p-n junction; the built-in field separates them, producing current." },
                { q: "What is the Fill Factor and what does it indicate?", a: "FF = (V_mp × I_mp)/(V_oc × I_sc). It measures how close the actual I-V curve is to a perfect rectangle. FF close to 1 means high efficiency. Typical crystalline Si FF ≈ 0.7–0.85." },
                { q: "What affects the short-circuit current (I_sc)?", a: "I_sc is directly proportional to light intensity (more photons → more carriers generated). It also depends on cell area and quantum efficiency of the cell material." },
                { q: "What is the open-circuit voltage (V_oc) and what affects it?", a: "V_oc is the voltage when no current flows (infinite load). V_oc ≈ (nkT/e) ln(I_sc/I_0 + 1). It increases logarithmically with light intensity and depends on the band gap and recombination rates." },
                { q: "What is the maximum power point (MPP)?", a: "The MPP is the point on the I-V curve where the product V×I is maximum — giving maximum power output. MPPT (Maximum Power Point Tracking) circuits continuously find this point in real systems." }
            ]
        },
        {
            id: 10, name: "e/m Ratio by J.J. Thomson Method",
            theory: {
                formulas: [
                    "In electric field only: eE = evy₁/L → y₁ = eEL²/(2mv²)",
                    "Balancing condition: eE = evB → v = E/B",
                    "e/m = v²/(B²r) = E/(B²r) [circular path in magnetic field alone]",
                    "e/m = 2V/(B²r²) where V = accelerating voltage, r = radius of circular beam path"
                ],
                importantTopics: [
                    "JJ Thomson (1897) used cathode ray tube to measure e/m of electron.",
                    "Crossed electric and magnetic fields: E field deflects up, B field deflects down — adjust for straight beam.",
                    "With only B: beam curves in a circle of radius r = mv/(eB).",
                    "e/m ≈ 1.76 × 10¹¹ C/kg."
                ],
                usefulPoints: [
                    "First balance E and B to get the velocity v = E/B.",
                    "Then remove E; the circular radius r gives e/m = v/(Br) = E/(B²r).",
                    "Measure E from the plate voltage and separation: E = V_plates/d.",
                    "Measure B from the coil current using Biot-Savart law for Helmholtz coils."
                ]
            },
            procedure: [
                "Set up the JJ Thomson apparatus (cathode ray tube with Helmholtz coils and deflection plates).",
                "Apply accelerating voltage V_a; observe the electron spot on the fluorescent screen.",
                "Apply vertical electric field E (plates) to deflect the beam upward; note deflection.",
                "Apply magnetic field B (increasing coil current) to bring the beam back to the original position (E = vB condition).",
                "Measure E = V_plates/d and B = k×I (calibration constant of coil).",
                "Remove electric field; note the circular path radius r from the deflection.",
                "Calculate e/m = E/(B²r)."
            ],
            vivaQuestions: [
                { q: "What did J.J. Thomson discover?", a: "J.J. Thomson (1897) discovered the electron — the first subatomic particle — by measuring its charge-to-mass ratio (e/m ≈ 1.76 × 10¹¹ C/kg) and showing it was the same regardless of cathode material." },
                { q: "Why are crossed E and B fields used?", a: "To act as a velocity selector. When E and B are crossed, the electric force (eE) and magnetic force (evB) act in opposite directions. Only electrons with velocity v = E/B pass undeflected, allowing v to be determined." },
                { q: "How does the electron move in only a magnetic field?", a: "The magnetic force (evB) always acts perpendicular to the velocity — doing no work but changing direction. This results in uniform circular motion with radius r = mv/(eB)." },
                { q: "Why cannot the mass m be found individually from this experiment?", a: "The experiment measures the ratio e/m, not e or m separately. To find m individually, the charge e must be known from another experiment (like Millikan's oil drop experiment)." },
                { q: "What is the role of the Helmholtz coils?", a: "Helmholtz coils (two identical coils separated by a distance equal to their radius) produce a nearly uniform magnetic field in the region between them, which is ideal for bending the electron beam uniformly." }
            ]
        },
        {
            id: 11, name: "Deflection of Charged Particle under Electric and Magnetic Fields",
            theory: {
                formulas: [
                    "Force due to electric field: F_E = qE",
                    "Force due to magnetic field: F_B = qvB sin θ",
                    "Parabolic trajectory in uniform E field: y = (qE/2mv²)x²",
                    "Circular path in uniform B field: r = mv/(qB)"
                ],
                importantTopics: [
                    "Lorentz force: F = q(E + v×B)",
                    "In E field alone: motion is parabolic (analogous to projectile).",
                    "In B field alone: motion is circular (force ⊥ velocity).",
                    "Crossed fields (E ⊥ B): velocity selector when qE = qvB."
                ],
                usefulPoints: [
                    "E field does work on charge, changing its kinetic energy.",
                    "B field does no work — only changes direction.",
                    "In CRT: E deflects beam vertically (electrostatic), B deflects beam laterally (magnetic).",
                    "Cyclotron frequency: ω = qB/m (independent of speed — used in cyclotron)."
                ]
            },
            procedure: [
                "Set up the CRT tube with deflecting plates (for E) and coils (for B).",
                "Apply E field only: measure vertical deflection y at horizontal distance x. Verify parabolic path.",
                "Remove E; apply B field only: observe circular deflection. Measure radius r = mv/(qB).",
                "Apply both E and B in the crossed configuration: adjust until beam is straight (velocity selector condition E = vB).",
                "Record and compare deflections with theoretical predictions."
            ],
            vivaQuestions: [
                { q: "State the Lorentz force law.", a: "F = q(E + v×B). The total force on a charged particle is the sum of the electric force (qE, along E) and the magnetic force (qv×B, perpendicular to both v and B)." },
                { q: "Why does a magnetic field do no work on a moving charge?", a: "The magnetic force F = qv×B is always perpendicular to the velocity v. Since power P = F·v = 0, the magnetic force does no work — it changes the direction but not the speed/energy of the particle." },
                { q: "What is a cyclotron and what principle does it use?", a: "A cyclotron accelerates charged particles using alternating electric fields. It uses the fact that the cyclotron frequency ω = qB/m is independent of particle speed, so the same alternating voltage can continuously accelerate the particle as it spirals outward." },
                { q: "What shape is the path of a charge in only an electric field?", a: "If the particle enters perpendicular to E: parabolic path (like projectile in gravity). If along E: accelerated straight-line motion." }
            ]
        },
        {
            id: 12, name: "Piezoelectric Effect — Vibration to Voltage",
            theory: {
                formulas: [
                    "Piezoelectric voltage: V = g × σ × t, where g = voltage sensitivity, σ = stress, t = thickness",
                    "Charge generated: Q = d × F, where d = piezoelectric charge coefficient, F = force",
                    "Resonant frequency: f = v/(2t), where v = speed of sound in material"
                ],
                importantTopics: [
                    "Piezoelectric effect: mechanical stress on certain crystals (quartz, PZT) generates electric charge/voltage.",
                    "Converse piezoelectric effect: applied voltage causes mechanical deformation.",
                    "Materials: Quartz (natural), BaTiO₃, PZT (Lead Zirconate Titanate).",
                    "Applications: microphones, sonar, MEMS sensors, gas lighters, ultrasound."
                ],
                usefulPoints: [
                    "The effect exists only in non-centrosymmetric crystal structures.",
                    "Direct effect: stress → charge; Converse: voltage → strain.",
                    "PZT has a much higher piezoelectric coefficient than natural quartz.",
                    "Operates at resonant frequency for maximum output."
                ]
            },
            procedure: [
                "Mount the piezoelectric transducer (PZT disc) rigidly.",
                "Connect a vibrating source (function generator + speaker or mechanical shaker) to excite vibration.",
                "Connect the output of the piezoelectric element to an oscilloscope.",
                "Vary the vibration frequency; observe the output voltage waveform.",
                "At resonance, observe peak output voltage.",
                "Record amplitude of vibration vs output voltage .",
                "Verify the linear relationship between applied force/stress and output voltage."
            ],
            vivaQuestions: [
                { q: "What is the piezoelectric effect?", a: "The piezoelectric effect is the generation of an electric voltage (charge separation) in certain asymmetric crystals when mechanical stress (pressure, vibration) is applied. It is a transduction mechanism — converts mechanical energy to electrical energy." },
                { q: "What is the converse piezoelectric effect?", a: "When an electric voltage is applied to a piezoelectric material, it undergoes mechanical deformation (expansion or contraction). Used in actuators, speakers, and ultrasonic transducers." },
                { q: "Name four applications of piezoelectric materials.", a: "1) Ultrasonic transducers (medical imaging, sonar), 2) Microphones and hydrophones, 3) Gas lighters (high voltage spark from impact), 4) MEMS sensors (accelerometers, gyroscopes), 5) Quartz crystal oscillators (clocks, frequency standards)." },
                { q: "Which crystal structures show the piezoelectric effect?", a: "Only non-centrosymmetric crystal structures (no centre of symmetry) show piezoelectricity. Of the 32 crystal classes, 20 are non-centrosymmetric and show the effect. Examples: quartz (α-SiO₂), BaTiO₃, PZT." }
            ]
        },
        {
            id: 13, name: "Thermoelectric Effect — Thermal Energy to Voltage",
            theory: {
                formulas: [
                    "Seebeck voltage: V = S × ΔT, where S = Seebeck coefficient (V/K)",
                    "Peltier heat: Q = Π × I × t, where Π = Peltier coefficient",
                    "Thomson coefficient: τ = T × dS/dT"
                ],
                importantTopics: [
                    "Seebeck effect: temperature difference between two junctions of dissimilar metals → EMF.",
                    "Peltier effect: current through junction of dissimilar metals → heat absorbed or released.",
                    "Thomson effect: current through a conductor with temperature gradient → heat absorbed/released.",
                    "Thermocouple types: K (Cr-Al), J (Fe-Constantan), T (Cu-Constantan)."
                ],
                usefulPoints: [
                    "The Seebeck coefficient S is material-dependent (typically μV/K to mV/K).",
                    "Thermoelectric generators (TEG) convert waste heat to electricity.",
                    "Peltier coolers: used in CPU coolers, portable refrigerators.",
                    "Kelvin relations: Π = ST (connects Seebeck and Peltier effects)."
                ]
            },
            procedure: [
                "Set up the thermoelectric module (Peltier/thermocouple generator) with hot and cold junctions.",
                "Connect cold junction to ice water (reference, 0°C) and heat the hot junction using a controlled heater.",
                "Measure the temperature of the hot junction with a thermometer at fixed intervals.",
                "Measure the EMF (voltage) generated across the thermocouple output terminals with a millivoltmeter.",
                "Plot EMF vs ΔT; calculate Seebeck coefficient S = V/ΔT.",
                "Connect the output to a small load (LED or motor) to demonstrate power generation."
            ],
            vivaQuestions: [
                { q: "What is the Seebeck effect?", a: "When two different conducting materials are joined at two points (junctions) and the junctions are at different temperatures, an EMF (Seebeck voltage) is generated proportional to the temperature difference: V = S·ΔT." },
                { q: "What is the Peltier effect?", a: "When an electric current passes through the junction of two dissimilar conductors, heat is either absorbed or released at the junction (reversing current reverses heating/cooling). It is the converse of the Seebeck effect." },
                { q: "What is a thermocouple and how does it work?", a: "A thermocouple is a temperature sensor made of two dissimilar metal wires joined at one end (measurement junction). The other ends (reference junction, kept at known temperature) produce a Seebeck EMF proportional to the temperature difference." },
                { q: "What is a thermoelectric generator (TEG)?", a: "A TEG is a solid-state device that converts a temperature gradient directly into electricity using the Seebeck effect. It has no moving parts, is reliable, and is used in waste heat recovery, spacecraft power (RTGs), and remote sensors." },
                { q: "How is the Peltier effect used in cooling devices?", a: "By passing DC current through a Peltier module, one side absorbs heat (gets cold) and the other releases heat. Used in CPU coolers, portable cold boxes, laser diode cooling, and wine coolers." }
            ]
        },
        {
            id: 14, name: "Cymatics — Visualisation with Sand and Water",
            theory: {
                formulas: [
                    "Wave equation: ∂²y/∂t² = v² ∂²y/∂x²",
                    "Standing wave condition: L = nλ/2 (for fixed ends), frequency f = nv/(2L)",
                    "Chladni patterns form at resonant frequencies of the plate",
                    "Frequency of nth harmonic: fₙ = n × f₁"
                ],
                importantTopics: [
                    "Cymatics: study of visible patterns of sound vibration — sand/particles move to nodal lines.",
                    "Chladni figures: patterns formed on a vibrating plate where sand accumulates at nodes (zero displacement).",
                    "Resonant modes depend on plate geometry, boundary conditions, and driving frequency.",
                    "Water surface responds with ripples and complex patterns at resonance."
                ],
                usefulPoints: [
                    "Sand accumulates at nodes (lines of zero vibration), revealing standing wave patterns.",
                    "Different frequencies produce different Chladni patterns.",
                    "Simple shapes (square, circular) produce predictable symmetric patterns.",
                    "Real-world connection: Chladni patterns are used in acoustic violin design."
                ]
            },
            procedure: [
                "Sprinkle fine sand evenly on a rigid plate (metal, glass) clamped at its centre.",
                "Set up a function generator connected to a speaker or electromagnetic vibrator beneath the plate.",
                "Slowly increase the frequency from low (e.g., 200 Hz) to higher values.",
                "At resonant frequencies, observe sand rearrange into symmetric Chladni patterns.",
                "Sketch and photograph the patterns at each resonant frequency.",
                "Repeat with water in a shallow container — observe different surface ripple patterns.",
                "Identify nodal lines (where sand accumulates/water is still) and antinodal regions."
            ],
            vivaQuestions: [
                { q: "What are Chladni figures?", a: "Chladni figures are visible patterns formed when sand on a vibrating plate is driven to the nodal lines — regions of zero displacement of the standing wave. Named after Ernst Chladni (1787), different frequencies produce different symmetric patterns." },
                { q: "Why does sand accumulate at nodal lines?", a: "At nodal lines, the plate does not vibrate (zero amplitude). Sand is repeatedly thrown away from antinodes (maximum vibration) and settles at nodal lines where there is no force to displace it." },
                { q: "What is a standing wave?", a: "A standing wave is formed by the superposition of two identical waves travelling in opposite directions. It has fixed nodal points (zero amplitude) and antinodes (maximum amplitude). Energy is stored in the wave, not transported." },
                { q: "What is the condition for resonance in a plate?", a: "Resonance occurs when the driving frequency matches one of the plate's natural frequencies (normal modes). At resonance, amplitude builds up greatly and clear Chladni patterns form." },
                { q: "What is cymatics and what are its applications?", a: "Cymatics is the study of visible effects of sound and vibration. Applications: acoustic engineering (speaker design, concert hall acoustics), violin/guitar plate tuning, medical ultrasound calibration, and artistic visualisation." }
            ]
        }
    ]
};

export default physicsViva;
