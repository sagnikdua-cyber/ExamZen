import type { VivaSubject } from "./physics";

const electricalViva: VivaSubject = {
    slug: "electrical", name: "Electrical Engineering", short: "EEL",
    color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: "⚡",
    experiments: [
        {
            id: 1, name: "Safety, Electrical Instruments & Colour Codes",
            theory: {
                formulas: [
                    "Ohm's Law: V = IR; Power: P = VI = I²R = V²/R",
                    "Resistor colour code: (Band1 × 10 + Band2) × 10^Band3 Ω ± tolerance"
                ],
                importantTopics: [
                    "DO's: insulated tools, one hand, rubber mats, de-energise before working.",
                    "DON'Ts: never touch live wires bare, no damaged equipment, no moisture near circuits.",
                    "Ammeter: low resistance → series. Voltmeter: high resistance → parallel.",
                    "Wattmeter: current coil (series) + voltage coil (parallel) → reads P = VI cos φ.",
                    "Variac: single-winding autotransformer with movable tap for variable AC output.",
                    "Colour mnemonic (0–9): Black Brown Red Orange Yellow Green Blue Violet Grey White."
                ],
                usefulPoints: [
                    "Gold = ±5%, Silver = ±10%, no band = ±20% tolerance.",
                    "MCB: protects against overload (thermal) and short circuit (electromagnetic).",
                    "AC machine cut-sections: identify stator, rotor, commutator (DC), slip rings (AC).",
                    "LT switchgear: MCBs, ELCBs, isolators, contactors — all protection/control devices."
                ]
            },
            procedure: [
                "List safety precautions for the lab (do's and don'ts) on observation sheet.",
                "Examine ammeter, voltmeter, wattmeter, variac; record type, range, and construction.",
                "Decode given resistors using colour code; verify with multimeter.",
                "Observe AC/DC machine cut-sections; identify and label all major parts.",
                "Inspect LT switchgear elements; note rated current, voltage, and interrupting capacity."
            ],
            vivaQuestions: [
                { q: "Why is an ammeter connected in series?", a: "An ammeter measures current through a branch. It must be in series so the full branch current flows through it. Its resistance must be very low to minimise voltage drop and not disturb the circuit." },
                { q: "What does an MCB do?", a: "MCB (Miniature Circuit Breaker) provides overload protection (bimetallic thermal strip) and short-circuit protection (solenoid trip). It can be manually reset after clearing the fault, unlike fuses which must be replaced." },
                { q: "Decode: Red-Violet-Orange-Gold.", a: "Red=2, Violet=7, Orange=10³ (multiplier), Gold=±5%. Value = 27 kΩ ± 5%." },
                { q: "What is a Variac?", a: "A Variac (variable autotransformer) has a single winding with a sliding tap, providing continuously variable AC output (0 to ~110% of input). Unlike a transformer, it has no electrical isolation between input and output." },
                { q: "What is the wattmeter measuring principle?", a: "Wattmeter deflection ∝ instantaneous power = v×i averaged over time = V·I·cos φ (real power). The current coil (low R) senses current; the voltage coil (high R) senses voltage; their interaction gives torque proportional to real power." }
            ]
        },
        {
            id: 2, name: "Superposition Theorem Verification",
            theory: {
                formulas: [
                    "I_total = I₁ (V₁ acting alone, V₂ shorted) + I₂ (V₂ acting alone, V₁ shorted)",
                    "Deactivation: voltage source → short (wire); current source → open (remove)"
                ],
                importantTopics: [
                    "Valid ONLY for linear circuits. Not applicable to power (P = I²R is nonlinear).",
                    "Deactivating a voltage source: replace with short (V=0). Current source: replace with open (I=0).",
                    "Non-ideal source deactivation: replace with its internal resistance only.",
                    "Works for any number of sources: sum of n individual responses = total response."
                ],
                usefulPoints: [
                    "Theoretical calculation via Ohm's/KVL; experimental via direct measurement.",
                    "Verify: I₁+I₂ ≈ I_total within 5% experimental error.",
                    "Algebraic sum — signs matter (current direction must be consistent).",
                    "Power is NOT superimposable: P_total ≠ P₁ + P₂."
                ]
            },
            procedure: [
                "Connect multi-source circuit; measure branch current I_total with both sources active.",
                "Short V₂ (keep its internal R); measure I₁ due to V₁ alone.",
                "Restore V₂; short V₁; measure I₂ due to V₂ alone.",
                "Verify I₁ + I₂ ≈ I_total.",
                "Repeat for multiple branches; tabulate theoretical and experimental values."
            ],
            vivaQuestions: [
                { q: "State the Superposition Theorem.", a: "In a linear circuit with multiple sources, any response (V or I) equals the algebraic sum of responses due to each source acting independently while all others are replaced by their internal impedances (VS → short, IS → open)." },
                { q: "Why can't superposition be applied to power?", a: "Power P = I²R is quadratic: (I₁+I₂)²R = I₁²R + I₂²R + 2I₁I₂R. The cross term 2I₁I₂R makes P_total ≠ P₁ + P₂. Superposition holds only for linear V-I relationships." },
                { q: "What is a linear circuit?", a: "A circuit where V-I relationship obeys linearity: superposition holds and proportionality holds (kV → kI). Linear elements: R, L, C. Nonlinear: diodes, transistors in large signal." }
            ]
        },
        {
            id: 3, name: "Thevenin's Theorem Verification",
            theory: {
                formulas: [
                    "V_th = V_OC (open-circuit voltage at load terminals)",
                    "R_th = R seen from load terminals, all sources deactivated",
                    "I_L = V_th / (R_th + R_L)"
                ],
                importantTopics: [
                    "Any linear two-terminal network → V_th in series with R_th.",
                    "V_th measured as open-circuit terminal voltage.",
                    "R_th: deactivate sources, measure resistance at terminal.",
                    "With dependent sources: apply test voltage/current to find R_th."
                ],
                usefulPoints: [
                    "Dual: Norton theorem (I_N in parallel with R_N = R_th).",
                    "Most useful for variable load analysis — V_th & R_th computed once.",
                    "I_sc = I_N = V_th/R_th (short-circuit current at output).",
                    "Max power transfer when R_L = R_th."
                ]
            },
            procedure: [
                "Remove load R_L; measure V_OC across terminals = V_th.",
                "Deactivate all sources; measure resistance at terminals = R_th.",
                "Reconnect R_L; calculate I_L = V_th/(R_th+R_L).",
                "Measure I_L directly and compare.",
                "Tabulate and compute % error."
            ],
            vivaQuestions: [
                { q: "State Thevenin's Theorem.", a: "Any linear two-terminal network can be replaced by a single voltage source V_th (= open-circuit voltage) in series with R_th (resistance seen from terminals with sources deactivated)." },
                { q: "How do dependent sources affect R_th calculation?", a: "With dependent sources present, you cannot simply remove/short independent sources and compute R_th from the network. Instead: apply a test voltage V_x, measure resulting I_x, R_th = V_x/I_x (or apply test current, measure voltage)." },
                { q: "What is the relationship between Thevenin and Norton equivalents?", a: "They are duals: V_th = I_N × R_N; R_th = R_N. Thevenin: voltage source + series R. Norton: current source + parallel R. Convert via source transformation." }
            ]
        },
        {
            id: 4, name: "Maximum Power Transfer Theorem",
            theory: {
                formulas: [
                    "P_max = V_th² / (4R_th) when R_L = R_th",
                    "Efficiency at MPT = 50%",
                    "For AC: Z_L = Z_th* (complex conjugate) for max power"
                ],
                importantTopics: [
                    "Maximum power to load when R_L = R_th (source Thevenin resistance).",
                    "50% efficiency at MPT — other 50% lost in R_th.",
                    "Used in RF/audio matching (max power priority over efficiency).",
                    "In power systems: efficiency is priority — MPT not used (50% loss unacceptable)."
                ],
                usefulPoints: [
                    "Plot P_L vs R_L — peak at R_L = R_th.",
                    "For complex loads: R_L = R_th AND X_L = −X_th (reactive parts cancel).",
                    "Applications: antenna matching, audio amplifier speaker matching."
                ]
            },
            procedure: [
                "Set up Thevenin equivalent circuit (V_th, R_th); connect variable R_L.",
                "Vary R_L over range 0.25 R_th to 4 R_th; measure V_L and I_L at each setting.",
                "Calculate P_L = V_L × I_L for each R_L.",
                "Plot P_L vs R_L; identify maximum at R_L = R_th.",
                "Verify: P_max = V_th²/(4R_th)."
            ],
            vivaQuestions: [
                { q: "State Maximum Power Transfer Theorem.", a: "Maximum power is delivered to a load when the load resistance R_L equals the Thevenin resistance R_th of the source. P_max = V_th²/(4R_th). For AC with complex impedances: Z_L = Z_th* (complex conjugate)." },
                { q: "Why is efficiency only 50% at MPT?", a: "At R_L = R_th: voltage splits equally between R_th and R_L, so half the source power is wasted in R_th. Always: P_R_th = P_R_L = P_max." },
                { q: "Why is MPT not used in power transmission?", a: "MPT gives only 50% efficiency — meaning 50% of generated power is lost as heat in line resistance. Power utilities need >95% efficiency. They minimise line resistance and use high voltage (low I) to reduce I²R losses." }
            ]
        },
        {
            id: 5, name: "Norton's Theorem Verification",
            theory: {
                formulas: [
                    "I_N = I_sc (short-circuit current at terminals)",
                    "R_N = R_th (same as Thevenin resistance)",
                    "I_L = I_N × R_N / (R_N + R_L)"
                ],
                importantTopics: [
                    "Norton dual of Thevenin: current source I_N parallel with R_N.",
                    "I_N measured by directly shorting terminals with ammeter.",
                    "R_N same as R_th — found by same deactivation method.",
                    "Source transformation: convert Thevenin ↔ Norton for easier analysis."
                ],
                usefulPoints: [
                    "Useful for parallel circuit analysis (current divider more natural).",
                    "Consistency check: V_th = I_N × R_N.",
                    "Chose Thevenin or Norton based on circuit topology — parallel → Norton."
                ]
            },
            procedure: [
                "Short load terminals with ammeter; measure I_sc = I_N.",
                "Deactivate sources; measure R_N looking into terminals.",
                "Reconnect R_L; calculate I_L using current divider.",
                "Measure directly and compare.",
                "Tabulate; verify V_th = I_N × R_N (consistency)."
            ],
            vivaQuestions: [
                { q: "State Norton's Theorem.", a: "Any linear two-terminal circuit can be replaced by a current source I_N (= short-circuit current) in parallel with R_N (= Thevenin resistance). Load connects across this parallel combination." },
                { q: "What is source transformation?", a: "Converting Thevenin (V_th series R_th) ↔ Norton (I_N parallel R_N): I_N = V_th/R_th, R_N = R_th. Simplifies analysis by selecting the more convenient form." }
            ]
        },
        {
            id: 6, name: "R-L-C Series Circuit — Steady State Analysis",
            theory: {
                formulas: [
                    "Z = √(R² + (XL−XC)²); φ = arctan[(XL−XC)/R]",
                    "XL = 2πfL; XC = 1/(2πfC)",
                    "Resonant frequency: f₀ = 1/(2π√LC); at resonance Z = R",
                    "Power factor: pf = cos φ = R/Z; P = VI cos φ"
                ],
                importantTopics: [
                    "R-L: voltage leads current. R-C: current leads voltage. R-L-C: depends on XL vs XC.",
                    "Series resonance: Z minimum = R; I maximum; VL = VC (large, equal, opposite).",
                    "Q factor: Q = XL₀/R = (1/R)√(L/C) — sharpness of resonance / bandwidth.",
                    "Phasor diagram: VR in phase with I; VL leads 90°; VC lags 90°."
                ],
                usefulPoints: [
                    "Measure V (voltmeter), I (ammeter), P (wattmeter); compute Z = V/I, pf = P/(VI).",
                    "Vary frequency to find f₀ (maximum I, minimum Z).",
                    "High Q → narrow bandwidth, sharp resonance (useful in tuned circuits).",
                    "Draw phasor diagram for operating conditions."
                ]
            },
            procedure: [
                "Connect R, L, C in series; apply AC supply at 50 Hz.",
                "Measure V, I, P; calculate Z = V/I, cos φ = P/(VI), XL = 2πfL, XC = 1/(2πfC).",
                "Vary frequency; record I at each frequency; plot I vs f to find resonance.",
                "At resonance: verify I_max = V/R; VL ≈ VC.",
                "Draw vector/phasor diagram at three frequencies (below, at, above resonance)."
            ],
            vivaQuestions: [
                { q: "What happens at series resonance?", a: "XL = XC → net reactance = 0 → Z = R (minimum). Current is V/R (maximum). VL and VC cancel (equal magnitude, 180° apart). Power factor = 1 (unity), purely resistive." },
                { q: "What is the Q-factor?", a: "Quality factor Q = XL₀/R = (1/R)√(L/C). It represents the sharpness of resonance: bandwidth BW = f₀/Q. High Q = narrow bandwidth = sharp, selective resonance. Used in radio tuning circuits." },
                { q: "Why does a capacitor cause current to lead voltage?", a: "For capacitor: I = C·dV/dt. If V = Vm·sin(ωt), then I = ωCVm·cos(ωt). The current waveform peaks 90° before voltage — current leads voltage by 90° in a pure capacitor." }
            ]
        },
        {
            id: 7, name: "Instrument Calibration — Ammeter, Voltmeter, Wattmeter",
            theory: {
                formulas: [
                    "% Error = [(Measured − True) / True] × 100%",
                    "Correction = True − Measured"
                ],
                importantTopics: [
                    "Calibration: compare test meter against certified sub-standard reference.",
                    "Calibration curve: % error vs test-meter reading — used to apply corrections.",
                    "Systematic errors: constant offset or scale error — correctable.",
                    "Random errors: statistical fluctuations — reduced by averaging."
                ],
                usefulPoints: [
                    "Use potentiometer method for high-accuracy voltage/current calibration.",
                    "For wattmeter: true P = V_standard × I_standard × cos φ (calculated).",
                    "Plot curve, draw best-fit line; note maximum error.",
                    "Sources of error in ammeter: shunt resistance variation, friction in bearing."
                ]
            },
            procedure: [
                "Connect test ammeter in series with sub-standard; vary current in steps.",
                "Record test reading I_t and standard reading I_s at each step.",
                "% error = (I_t − I_s)/I_s × 100; plot vs I_t.",
                "Repeat for voltmeter (in parallel with standard).",
                "For wattmeter: verify P_wattmeter ≈ V_cal × I_cal × cos φ."
            ],
            vivaQuestions: [
                { q: "What is calibration and why is it needed?", a: "Calibration is comparing a meter against a known reference to find its error. Needed because instruments drift with age, temperature, and wear — calibration tells users how much to correct their readings." },
                { q: "What is a potentiometer and why is it preferred for precision measurement?", a: "A potentiometer is a null-deflection device that compares unknown EMF with a standard (Weston cell). At balance: zero current → no IR errors → very high accuracy for voltage/current measurement." }
            ]
        },
        {
            id: 8, name: "Transformer OC and SC Tests — Efficiency",
            theory: {
                formulas: [
                    "OC test: core loss Pc = V₀I₀cos φ₀",
                    "SC test: copper loss Pcu = Vsc·Isc·cos φsc (at rated current)",
                    "Efficiency: η = (x·S·cos φ) / (x·S·cos φ + Pc + x²·Pcu) × 100%",
                    "Max η when x = √(Pc/Pcu_FL)"
                ],
                importantTopics: [
                    "OC test (rated V, LV side, HV open): measures constant core (iron) loss Pc.",
                    "SC test (rated I, HV side, LV shorted, reduced V): measures full-load copper loss Pcu.",
                    "Core loss: constant (hysteresis + eddy current). Copper loss: varies as I² (load-dependent).",
                    "Efficiency is maximum when Cu loss = Fe loss (at fractional load x)."
                ],
                usefulPoints: [
                    "OC: low current (~2–5% rated), rated voltage on LV side.",
                    "SC: rated current, low voltage (~5–10% rated) on HV side.",
                    "Plot efficiency curve vs fractional load x at given power factor.",
                    "Voltage regulation VR% = (VNL−VFL)/VFL × 100% from SC parameters."
                ]
            },
            procedure: [
                "OC Test: LV side energised at rated V; HV open. Record V₀, I₀, P₀ → Pc = P₀.",
                "SC Test: HV side supply, LV shorted. Increase until rated Isc; record Vsc, Isc, Psc → Pcu = Psc.",
                "Calculate efficiency at full, 3/4, 1/2, and 1/4 loads.",
                "Plot efficiency vs fractional load; find x at maximum η.",
                "Calculate voltage regulation from SC parameters."
            ],
            vivaQuestions: [
                { q: "Why is OC test done on LV side?", a: "OC test is at rated voltage on LV side (lower voltage, more accessible). HV side is open, drawing no current from HV supply. Instruments are easier and safer to use at lower voltage." },
                { q: "When is transformer efficiency maximum?", a: "When copper loss = iron loss: I²R = Pc. Fractional load at max η: x = √(Pc/Pcu_FL). At unity power factor." },
                { q: "What is voltage regulation?", a: "VR = (V_NL − V_FL)/V_FL × 100%. Measures terminal voltage variation with load. Ideal: 0%. Practical: 2–5%. High regulation means poor supply quality." }
            ]
        },
        {
            id: 9, name: "R-L-C Parallel Circuit — Impedance & Power Factor",
            theory: {
                formulas: [
                    "Admittance: Y = 1/R − j/XL + j/XC",
                    "Impedance: Z = 1/|Y|",
                    "Parallel resonance: f₀ = 1/(2π√LC); at resonance Z = L/(CR) (maximum)"
                ],
                importantTopics: [
                    "Parallel resonance (antiresonance): Z maximum, source current minimum.",
                    "Tank circuit: large circulating current between L and C at resonance.",
                    "Below f₀: inductive. Above f₀: capacitive (opposite to series circuit).",
                    "Admittance Y = G + jB; conductance G = 1/R; susceptance B = 1/XC − 1/XL."
                ],
                usefulPoints: [
                    "Use admittances for parallel circuits (they add directly).",
                    "Q = R/XL₀ = R√(C/L) for parallel circuit.",
                    "Applications: bandpass filters, oscillators, power factor correction."
                ]
            },
            procedure: [
                "Connect R, L, C in parallel; measure V, I_total, P.",
                "Calculate Z = V/I, cos φ = P/(VI), Y components.",
                "Measure individual branch currents I_R, I_L, I_C.",
                "Vary frequency; find antiresonance (minimum I_total).",
                "Draw phasor diagram."
            ],
            vivaQuestions: [
                { q: "What is admittance?", a: "Y = 1/Z (S). For parallel elements: Y_total = Y₁ + Y₂ + Y₃ (admittances add). Easier than reciprocal-sum formula for impedances." },
                { q: "Compare series vs parallel resonance.", a: "Series: Z min = R, I max, acts as current amplifier. Parallel: Z max = L/CR, I min, acts as voltage amplifier. Both at f₀ = 1/(2π√LC) for ideal L, C." }
            ]
        },
        {
            id: 10, name: "DC Shunt Motor — Torque-Speed Characteristics",
            theory: {
                formulas: [
                    "Back EMF: Eb = V − IaRa",
                    "Speed: N ∝ Eb/φ (φ ≈ const for shunt)",
                    "Torque: T = KφIa ∝ Ia (since φ const)"
                ],
                importantTopics: [
                    "Shunt motor: field in parallel with armature → φ constant → near constant speed.",
                    "Speed slightly drops with load (5–10%) — called 'shunt characteristic'.",
                    "Starting: Ia = V/Ra at N=0 → huge current → use starter resistance.",
                    "Speed regulation = (N_NL − N_FL)/N_FL × 100%."
                ],
                usefulPoints: [
                    "Torque via brake drum: T = (W₁−W₂)×r.",
                    "Plot T vs N: slightly drooping straight line.",
                    "Plot T vs Ia: straight line through origin (T∝Ia).",
                    "Used where constant speed required: lathes, fans, pumps."
                ]
            },
            procedure: [
                "Start motor with starter; bring to rated speed at rated field.",
                "Apply load incrementally via brake drum; record Ia, N (tachometer), W₁, W₂.",
                "Calculate T = (W₁−W₂)×r at each load.",
                "Tabulate T, N, Ia; plot T vs N and T vs Ia.",
                "Find speed regulation."
            ],
            vivaQuestions: [
                { q: "Why is a starter needed for a DC motor?", a: "At startup N=0 → Eb=0 → Ia = V/Ra. Since Ra is very small (<1 Ω), current would be 10–20× rated, damaging the motor. Starter adds series resistance, limiting initial current to safe levels." },
                { q: "What happens if the shunt field circuit opens suddenly?", a: "φ → 0, so speed N ∝ 1/φ → ∞ (runaway). Residual magnetism prevents true infinity, but the motor accelerates dangerously, risking mechanical destruction. Always protect against open field." },
                { q: "Why is the shunt motor preferred for constant-speed loads?", a: "Shunt motor maintains nearly constant speed regardless of load changes because φ is constant (field connected to constant supply). Speed drops only slightly (by IaRa/Kφ) with increasing Ia (load)." }
            ]
        },
        {
            id: 11, name: "DC Shunt Generator — No-Load (OCC) Characteristics",
            theory: {
                formulas: [
                    "E ∝ φ × N (EMF proportional to flux and speed)",
                    "V_terminal = E − Ia × Ra (at any load)"
                ],
                importantTopics: [
                    "OCC (Open Circuit Characteristic): E vs If at constant N — shows magnetic saturation.",
                    "Separately excited: external field supply. Self-excited (shunt): field from terminal.",
                    "Residual magnetism starts the self-excitation process.",
                    "Critical resistance: max field circuit R for voltage build-up."
                ],
                usefulPoints: [
                    "Take readings for increasing and decreasing If (shows hysteresis in OCC).",
                    "Knee point: where B-H (OCC) starts to saturate significantly.",
                    "Critical speed and critical resistance define limits of self-excitation.",
                    "Self-excitation condition: OCC slope > field resistance line slope."
                ]
            },
            procedure: [
                "Drive generator at rated speed via prime mover; set If = 0; note residual EMF.",
                "Increase If in steps; record E at each step until saturation.",
                "Decrease If; record E (hysteresis branch).",
                "Plot E vs If — OCC with both ascending and descending curves.",
                "Mark knee point and rated voltage on the graph."
            ],
            vivaQuestions: [
                { q: "What is an OCC?", a: "OCC (Open Circuit Characteristic or Magnetisation Curve) is E vs If at rated constant N with LV open. It shows increasing E with If, then saturation, due to the magnetic B-H characteristic of the core." },
                { q: "Why is residual magnetism essential for self-excitation?", a: "At startup, If = 0 but residual flux generates a small E, which drives a small If, which increases flux, which increases E — a regenerative process until saturation. Without residual magnetism, this chain cannot start." }
            ]
        },
        {
            id: 12, name: "Speed Control of DC Shunt Motor",
            theory: {
                formulas: [
                    "Armature control: N = (V − Ia(Ra+R_ext))/(Kφ) — below base speed",
                    "Field weakening: N = (V − IaRa)/(Kφ) with reduced φ — above base speed"
                ],
                importantTopics: [
                    "Armature resistance control: add R_ext in series → speed decreases. Inefficient (I²R waste).",
                    "Field weakening: increase field rheostat → φ decreases → N increases. Efficient.",
                    "Ward-Leonard system: motor-generator set for smooth armature voltage control.",
                    "Modern: PWM chopper for armature control — highly efficient."
                ],
                usefulPoints: [
                    "Armature control range: 0 to base speed. Field control: base speed to max.",
                    "Field control: reduce φ → same Ia gives less torque → used for light loads at high speed.",
                    "Plot N vs If (field control) and N vs R_ext (armature control)."
                ]
            },
            procedure: [
                "Start motor; achieve rated speed at rated field and no-load.",
                "Armature control: add R in series with armature in steps; measure N at each R.",
                "Field control: increase field rheostat resistance (reduce If); measure N at each step.",
                "Plot two sets of characteristic curves.",
                "Compare speed range and note efficiency considerations for each method."
            ],
            vivaQuestions: [
                { q: "Compare armature vs field control of DC shunt motor speed.", a: "Armature control: below base speed, adds series R, wastes power. Field control: above base speed, reduces φ, efficient (low field power). Use armature for low speed, field for high speed." },
                { q: "What is Ward-Leonard control?", a: "AC motor drives a DC generator; generator output voltage is varied by adjusting its field. Variable DC voltage applied to drive motor armature — gives smooth, stepless, reversible speed control. Used in rolling mills, elevators." }
            ]
        },
        {
            id: 13, name: "3-Phase Power — Two-Wattmeter Method",
            theory: {
                formulas: [
                    "Total power: P = W₁ + W₂",
                    "Power factor: tan φ = √3(W₁−W₂)/(W₁+W₂)",
                    "Reactive power: Q = √3(W₁−W₂)",
                    "Check: P = √3·VL·IL·cos φ"
                ],
                importantTopics: [
                    "Two-wattmeter method: measures total 3-phase power in any 3-wire system (balanced/unbalanced).",
                    "W₁ = W₂: unity PF. W₂ = 0: PF = 0.5. W₂ negative: PF < 0.5.",
                    "Blondel's theorem: n-wire system needs (n−1) wattmeters.",
                    "Each wattmeter measures line current and line-to-line voltage."
                ],
                usefulPoints: [
                    "Reverse pressure coil connection if meter deflects backwards (record as negative).",
                    "Calculate both power (W₁+W₂) and PF from the same readings.",
                    "Valid for star and delta loads; doesn't need neutral access.",
                    "Observe how W₁ and W₂ change as load PF changes (vary motor excitation)."
                ]
            },
            procedure: [
                "Connect 3-phase load; W₁ in line R, W₂ in line B (pressure coils to line Y).",
                "Apply 3-phase supply; record W₁ and W₂.",
                "P = W₁ + W₂; compute tan φ = √3(W₁−W₂)/(W₁+W₂).",
                "Measure VL and IL; verify P = √3·VL·IL·cos φ.",
                "Vary load PF; observe how W₁ and W₂ change."
            ],
            vivaQuestions: [
                { q: "State Blondel's theorem.", a: "The total power in an n-wire polyphase system can be measured with (n−1) wattmeters. 3-wire 3-phase: 2 wattmeters. 4-wire 3-phase (with neutral): 3 wattmeters." },
                { q: "What does a negative wattmeter reading indicate?", a: "Power factor < 0.5 (highly inductive load). One instrument gives negative reading because the current and voltage phasors for that wattmeter are more than 90° apart. Reverse CC or PC connection and subtract: P = W₁ − |W₂|." }
            ]
        }
    ]
};

export default electricalViva;
