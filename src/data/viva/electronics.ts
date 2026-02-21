import type { VivaSubject } from "./physics";

const electronicsViva: VivaSubject = {
    slug: "electronics", name: "Electronics", short: "ELEC",
    color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", icon: "💡",
    experiments: [
        {
            id: 1, name: "Semiconductor Physics — Band Theory and Carrier Concepts",
            theory: {
                formulas: [
                    "Intrinsic carrier concentration: nᵢ = √(Nc·Nv)·exp(−Eg/2kT)",
                    "Mass action law: n·p = nᵢ²",
                    "Fermi level position (intrinsic): Eᶠ ≈ (Ec + Ev)/2",
                    "Drift current density: J_drift = (nμₙ + pμₚ)eE",
                    "Diffusion current: J_diff = eDₙ(dn/dx) − eDₚ(dp/dx)"
                ],
                importantTopics: [
                    "Band structure: valence band (VB), conduction band (CB), band gap Eg. Conductors: overlap. Semiconductors: Eg ~0.5–2 eV. Insulators: Eg > 4 eV.",
                    "n-type: donor impurities (Group V like P, As) add electrons near CB — Fermi level shifts towards CB.",
                    "p-type: acceptor impurities (Group III like B, Al) create holes near VB — Fermi level shifts towards VB.",
                    "Drift: carrier movement due to electric field. Diffusion: movement due to concentration gradient.",
                    "Generation/Recombination: thermal excitation generates e-h pairs; recombination annihilates them.",
                    "Density of states g(E): number of quantum states per unit energy per unit volume."
                ],
                usefulPoints: [
                    "At equilibrium: Fermi level is constant throughout the device.",
                    "Einstein relation: D/μ = kT/e (links diffusion and drift of carriers).",
                    "In extrinsic semiconductor: minority carrier lifetime τ is key device parameter.",
                    "Quantization in low-dimensional systems: quantum wells (2D), wires (1D), dots (0D)."
                ]
            },
            procedure: [
                "Study the classification chart comparing metals, semiconductors, and insulators via band diagrams.",
                "Distinguish active components (transistors, diodes — control/amplify) from passive (resistors, capacitors — no gain).",
                "Draw energy band diagrams for n-type (donor level below CB) and p-type (acceptor level above VB).",
                "Calculate nᵢ from given Eg using nᵢ formula at T = 300 K.",
                "Verify mass action law: n·p = nᵢ² for doped semiconductors.",
                "Compute drift current given carrier concentrations and mobilities."
            ],
            vivaQuestions: [
                { q: "What is the difference between a conductor, semiconductor, and insulator based on band theory?", a: "Conductor: conduction and valence bands overlap (Eg ≈ 0), so electrons flow freely. Semiconductor: small Eg (0.1–2 eV) — thermally excitable electrons. Insulator: large Eg (>4 eV) — electrons cannot reach CB at room temperature." },
                { q: "What is the Fermi level?", a: "The Fermi level (Ef) is the energy level at which the probability of electron occupancy is exactly 1/2 (Fermi-Dirac distribution). In intrinsic semiconductors, Ef lies near the middle of the band gap; in n-type it shifts toward CB; in p-type toward VB." },
                { q: "Explain the concept of holes in semiconductors.", a: "When a valence electron is excited to CB leaving behind a vacancy, this vacancy behaves as a positive charge carrier (hole). Holes move in the opposite direction to electrons under an electric field. Holes have effective mass m*p and mobility μp." },
                { q: "What is the mass action law?", a: "n·p = nᵢ² at thermal equilibrium. The product of electron and hole concentrations equals the square of the intrinsic carrier density, regardless of doping. Used to find minority carrier concentration from majority." },
                { q: "Distinguish drift and diffusion currents.", a: "Drift current: caused by electric field — J_drift = σE = e(nμn + pμp)E. Diffusion current: caused by concentration gradient — J_diff = eDn(dn/dx) for electrons. In equilibrium both cancel (no net current)." },
                { q: "What is the Einstein relation?", a: "D/μ = kT/e (for electrons or holes). It relates the diffusion coefficient D and drift mobility μ through the thermal voltage Vt = kT/e ≈ 26 mV at 300K, linking two carrier transport mechanisms." }
            ]
        },
        {
            id: 2, name: "P-N Junction Diode and Zener Diode — Characteristics",
            theory: {
                formulas: [
                    "Diode current equation: I = I₀[exp(V/nVT) − 1], VT = kT/e ≈ 26 mV at 300K",
                    "Built-in potential: V₀ = (kT/e)ln(Nd·Na/nᵢ²)",
                    "Zener breakdown: at high reverse voltage (sharp diode-like negative region)",
                    "Half-wave rectifier output: V_dc = V_m/π; Full-wave: V_dc = 2V_m/π"
                ],
                importantTopics: [
                    "p-n junction formation: diffusion of electrons from n to p and holes from p to n creates depletion region with built-in electric field opposing further diffusion.",
                    "Forward bias: external field opposes built-in, reduces barrier → exponential current increase.",
                    "Reverse bias: external field adds to built-in, widens depletion → tiny saturation current I₀.",
                    "Zener diode: heavily doped p-n junction — avalanche/Zener breakdown at specific V_Z → used as voltage regulator.",
                    "Rectifiers: Half-wave (1 diode, V_dc = V_m/π); Full-wave bridge (4 diodes, V_dc = 2V_m/π).",
                    "SCR (Silicon Controlled Rectifier): 4-layer PNPN device; gate trigger controls conduction."
                ],
                usefulPoints: [
                    "Knee voltage: ~0.3 V (Ge), ~0.7 V (Si) — voltage at which diode starts conducting.",
                    "Dynamic resistance: r_d = nVT/I ≈ 26/I mΩ for Si (n=1).",
                    "In clipper: cuts off parts of signal above/below voltage level. In clamper: shifts DC level.",
                    "Ripple factor for HW rectifier: 1.21; FW: 0.48 — FW has less ripple."
                ]
            },
            procedure: [
                "Connect the p-n junction diode in forward bias (p→+, n→−); vary voltage from 0 to ~1V in steps; record I and V.",
                "Connect in reverse bias; increase reverse voltage carefully; record reverse saturation current.",
                "Plot I-V characteristic (forward: exponential curve; reverse: flat until breakdown).",
                "For Zener diode: apply reverse bias; note the sharp conduction at V_Z. Plot the Zener I-V characteristic.",
                "Set up half-wave and full-wave bridge rectifier circuits; apply AC signal; observe output on CRO.",
                "Measure V_dc and compute ripple factor."
            ],
            vivaQuestions: [
                { q: "What is the depletion region in a p-n junction?", a: "The depletion region (space charge region) is the zone around the junction where free carriers have diffused away and recombined, leaving ionised donor (positive) and acceptor (negative) atoms. It creates a built-in electric field (from n to p) that opposes further diffusion." },
                { q: "What is the diode equation and what is the ideality factor n?", a: "I = I₀[exp(V/nVT) − 1]. I₀ = reverse saturation current, VT = kT/e = 26 mV (thermal voltage at 300 K). Ideality factor n: n=1 for ideal diffusion current (wide devices), n=2 for recombination-dominated current (narrow devices)." },
                { q: "Compare Zener and avalanche breakdown.", a: "Zener breakdown (V_Z < ~5 V): strong electric field directly breaks covalent bonds (tunnelling) — high doping. Avalanche breakdown (V_Z > ~5 V): high-energy carriers collide with lattice atoms, creating more carriers (impact ionisation) — multiplication process. Both give sharp, stable reverse voltage." },
                { q: "Why is the full-wave rectifier preferred over half-wave?", a: "Full-wave uses both halves of AC cycle → higher average dc output (2Vm/π vs Vm/π), lower ripple factor (0.48 vs 1.21), and higher efficiency. The capacitor filter is also more effective at the higher ripple frequency (2f vs f) of FW output." },
                { q: "What is the function of a clipper circuit?", a: "A clipper (limiter) removes parts of the waveform above (upper clipper) or below (lower clipper) a reference voltage, without distorting the remaining parts. Used in waveform shaping, overvoltage protection, and communication circuits." },
                { q: "How does the SCR work?", a: "SCR (4-layer PNPN device) remains off until a gate pulse triggers it into conduction (latches on). Once conducting, it stays on until the current drops below the holding current. Used in phase angle power control, motor drives, and inverters." }
            ]
        },
        {
            id: 3, name: "Bipolar Junction Transistor (BJT) — Characteristics and Amplifier",
            theory: {
                formulas: [
                    "α (CB current gain) = IC/IE, typically 0.95–0.99",
                    "β (CE current gain) = IC/IB = α/(1−α)",
                    "Transistor equation: IC = β·IB + (1+β)·ICBO ≈ β·IB",
                    "h-parameter model: Vbe = hie·ib + hre·Vce; ic = hfe·ib + hoe·Vce",
                    "Voltage gain (CE): Av = −hfe·RL/hie"
                ],
                importantTopics: [
                    "BJT: two p-n junctions (emitter-base, base-collector); npn or pnp type.",
                    "Three regions: Active (amp) — EB forward, CB reverse. Saturation — both forward. Cutoff — both reverse.",
                    "CB: input Ie, output Ic, gain α<1. CE: input Ib, output Ic, gain β>>1. CC: input Ib, output Ie, gain ~β+1.",
                    "h-parameters: hie (input impedance), hfe (forward current gain), hre (reverse voltage ratio), hoe (output admittance).",
                    "Punch-through: base too thin → depletion regions merge. Avalanche: high VCB multiplication."
                ],
                usefulPoints: [
                    "Small signal equivalent circuit: replace BJT with h-parameter model.",
                    "CE configuration has both current and voltage gain — most used for amplifiers.",
                    "Early effect: VCB increases → depletion into base → effective base width decreases → IC increases slightly with VCE.",
                    "β varies with IC and temperature: design circuits for β-independent biasing."
                ]
            },
            procedure: [
                "For CE input characteristics (IB vs VBE at constant VCE): vary VBE, record IB.",
                "For CE output characteristics (IC vs VCE at constant IB): set IB, vary VCE from 0 to max; record IC. Repeat for multiple IB.",
                "From output characteristics, identify active, saturation, and cutoff regions.",
                "Determine β = ΔIC/ΔIB (from output characteristics at fixed VCE).",
                "Set up CE amplifier circuit with bias; measure input and output voltage. Calculate Av.",
                "Verify small-signal gain using h-parameter model."
            ],
            vivaQuestions: [
                { q: "Explain the operation of an npn BJT in active region.", a: "EB junction is forward biased (VBE ~0.7V), CB junction is reverse biased. Electrons are injected from emitter into base. Base is thin and lightly doped — most electrons diffuse across without recombining and are swept into collector by CB field. IC >> IB, giving high current gain β." },
                { q: "What is the Early Effect?", a: "As VCE increases (reverse CB bias increases), the CB depletion region extends further into the thin base, reducing the effective base width (base width modulation). This increases IC slightly with VCE even in the active region — the output characteristics have a slight upward slope." },
                { q: "Compare CE, CB, and CC configurations.", a: "CE: input at base, output at collector — highest voltage and power gain, moderate impedance, 180° phase inversion — most common amplifier. CB: input at emitter, output at collector — current gain <1, high voltage gain, low input Z — RF amplifiers. CC (emitter follower): input at base, output at emitter — current gain ~β, voltage gain ≈1, high input Z, low output Z — buffer/impedance matching." },
                { q: "What are h-parameters and why are they used?", a: "h-parameters (hie, hfe, hre, hoe) are hybrid parameters that model BJT small-signal behaviour. They mix impedance and admittance parameters for port analysis. Easily measured from I-V characteristics. Used to calculate gain and impedance of amplifier circuits accurately." },
                { q: "What is punch-through in a BJT?", a: "Punch-through occurs when VCE is very large — the CB depletion region extends completely through the base to reach the EB junction. This causes a large uncontrolled current to flow, as the base barrier is eliminated. It is a destructive failure mode." }
            ]
        },
        {
            id: 4, name: "MOSFETs, IGBTs, and Op-Amps",
            theory: {
                formulas: [
                    "MOSFET triode region: ID = μCox(W/L)[(VGS−VT)VDS − VDS²/2]",
                    "MOSFET saturation: ID = (μCox W/2L)(VGS−VT)²",
                    "Op-amp gain (inverting): Av = −Rf/R1; Non-inverting: Av = 1 + Rf/R1",
                    "CMRR = 20 log(Ad/Ac) in dB; Ideal: CMRR → ∞",
                    "Integrator output: V_out = −(1/RC)∫V_in dt"
                ],
                importantTopics: [
                    "MOSFET: voltage-controlled device. n-channel enhancement MOSFET: gate (+) attracts electrons forming inversion layer. VT = threshold voltage.",
                    "Regions: subthreshold (below VT), triode (linear), saturation (ID ∝ (VGS−VT)²).",
                    "CMOS: complementary nMOS + pMOS — no static power dissipation; used in all digital ICs.",
                    "FinFET: multi-gate 3D transistor — better electrostatic control (for 14nm, 7nm nodes).",
                    "IGBT: combines MOSFET gate (voltage control) with BJT collector-emitter — low on-resistance, high current; used in power electronics.",
                    "Op-Amp: differential amplifier with very high gain A ≈ 10⁵–10⁶, CMRR >90dB, Rin→∞, Rout→0."
                ],
                usefulPoints: [
                    "Negative feedback in op-amp: stabilises gain = −Rf/R1; reduces distortion.",
                    "Ideal op-amp rules: V⁺ = V⁻ (virtual short), no current into inputs.",
                    "Schmitt trigger: positive feedback → hysteresis, used as comparator with noise immunity.",
                    "Differentiator: V_out = −RC(dV_in/dt) — noisy in practice. Integrator: V_out = −(1/RC)∫V_in dt."
                ]
            },
            procedure: [
                "Plot NMOS enhancement MOSFET drain characteristics (ID vs VDS for varying VGS).",
                "Identify triode and saturation regions; measure threshold voltage VT from ID vs VGS plot.",
                "Build inverting op-amp amplifier (Rf and R1); measure input and output; verify Av = −Rf/R1.",
                "Build integrator circuit; apply square wave input; observe triangular wave output.",
                "Set up Schmitt trigger; apply triangular wave input; observe square wave output with hysteresis.",
                "Calculate CMRR by measuring differential and common-mode gains."
            ],
            vivaQuestions: [
                { q: "How does an enhancement MOSFET work?", a: "Enhancement MOSFET: no channel at VGS=0. When VGS > VT (threshold voltage), the gate electric field inverts the surface of the lightly doped substrate, creating an n-channel between source and drain. Current flows when both VGS > VT and VDS > 0." },
                { q: "What is the advantage of CMOS over NMOS or PMOS alone?", a: "CMOS uses complementary pairs: one transistor is always off in steady state, so no static current flows (no power dissipation). NMOS/PMOS alone have a load resistor or transistor that always draws current. CMOS gives low power, full rail-to-rail output swing, and noise margins." },
                { q: "What are the characteristics of an ideal op-amp?", a: "Infinite open-loop gain (A→∞), infinite input impedance (Rin→∞), zero output impedance (Rout→0), infinite bandwidth, infinite CMRR, zero offset voltage, and zero input bias current." },
                { q: "What is CMRR?", a: "Common Mode Rejection Ratio = Ad/Ac (ratio of differential gain to common mode gain). High CMRR means the op-amp amplifies the difference signal while rejecting noise common to both inputs (e.g., 50 Hz pickup). Ideal op-amp: CMRR → ∞." },
                { q: "What is an IGBT and where is it used?", a: "IGBT (Insulated Gate Bipolar Transistor) combines MOSFET gate (high-speed voltage control) with BJT output stage (low saturation voltage, high current capacity). Used in power inverters (solar, EVs, motor drives), where both high frequency switching and high power handling are needed." },
                { q: "What is a Schmitt trigger and why is hysteresis important?", a: "A Schmitt trigger is a comparator with positive feedback giving two different threshold voltages (upper VUT and lower VLT). The hysteresis (dead band = VUT − VLT) prevents multiple toggling due to noise near the switching threshold. Used for clean digital signal generation from noisy inputs." }
            ]
        },
        {
            id: 5, name: "Digital Logic Gates — Boolean Algebra and Combinational Circuits",
            theory: {
                formulas: [
                    "De Morgan's theorems: ¬(A·B) = ¬A + ¬B; ¬(A+B) = ¬A·¬B",
                    "Half adder: Sum = A⊕B, Carry = A·B",
                    "Full adder: Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B)",
                    "NAND universal: any gate can be realised using only NAND",
                    "Propagation delay: t_pd = sum of gate delays along the critical path"
                ],
                importantTopics: [
                    "TTL: Transistor-Transistor Logic — uses BJTs. V_IL<0.8V, V_IH>2V, V_OL<0.4V, V_OH>2.4V.",
                    "Basic gates: AND, OR, NOT. Derived: NAND, NOR (universal), XOR, XNOR.",
                    "NAND/NOR are universal: any Boolean function can be built using only NAND or only NOR gates.",
                    "Combinational circuits: output depends only on present inputs (no memory). Examples: adder, MUX, decoder, comparator.",
                    "MUX: selects one of n inputs based on select lines. Demux: sends one input to one of n outputs.",
                    "Encoder: n lines → log₂n bits. Decoder: n bits → 2ⁿ lines."
                ],
                usefulPoints: [
                    "XOR: A⊕B = 1 when inputs differ (odd number of 1s). XNOR: complement of XOR.",
                    "2-to-1 MUX: Y = S'·A + S·B. 4-to-1 MUX needs 2 select lines.",
                    "Priority encoder: outputs the binary code of the highest-priority active input.",
                    "Magnitude comparator: compares two n-bit numbers → output: A>B, A=B, A<B."
                ]
            },
            procedure: [
                "Verify truth tables of AND, OR, NOT, NAND, NOR, XOR gates using Verilog simulation or IC (7400 series).",
                "Apply De Morgan's theorem: verify NAND(A,B) = OR(NOT A, NOT B) experimentally.",
                "Build a half adder using XOR and AND; test all input combinations.",
                "Build a full adder using two half adders and an OR gate; verify carry propagation.",
                "Implement 2-to-1 MUX using NAND gates; verify selection function.",
                "Design a 2-to-4 decoder; verify each output is activated by corresponding 2-bit input."
            ],
            vivaQuestions: [
                { q: "What is a universal gate? Which gates are universal?", a: "A universal gate is one from which any other logic gate can be constructed using only that gate type. NAND and NOR are both universal gates. For example: NOT A = NAND(A,A); AND(A,B) = NOT[NAND(A,B)]. Universal gates simplify IC manufacturing." },
                { q: "State and prove De Morgan's theorems.", a: "First: ¬(A·B) = ¬A + ¬B (NOT AND = OR of NOTs). Second: ¬(A+B) = ¬A·¬B (NOT OR = AND of NOTs). Proof by truth table: verify both sides give the same output for all input combinations. Used to convert between AND/OR forms." },
                { q: "Explain the difference between MUX and DEMUX.", a: "MUX (Multiplexer): multiple inputs, one output — selects one input based on select lines. DEMUX (Demultiplexer): one input, multiple outputs — routes input to one of the outputs based on select lines. They are inverse operations, used in data routing and bus systems." },
                { q: "What is the difference between combinational and sequential logic?", a: "Combinational: output depends only on current inputs (no memory). Examples: adder, decoder, MUX. Sequential: output depends on current inputs AND past states (has memory — flip-flops, registers). Examples: counters, registers, state machines." },
                { q: "What are the noise margins in TTL logic?", a: "Noise margin (NM) = acceptable voltage range for logic levels. NM_H = V_OH(min) − V_IH(min) = 2.4 − 2 = 0.4V. NM_L = V_IL(max) − V_OL(max) = 0.8 − 0.4 = 0.4V. Noise margins define the immunity of the circuit to voltage glitches on signal lines." }
            ]
        }
    ]
};

export default electronicsViva;
