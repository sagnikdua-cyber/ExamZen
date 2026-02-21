import type { VivaSubject } from "./physics";

const mechanicalWorkshopViva: VivaSubject = {
    slug: "mechanical-workshop", name: "Mechanical Workshop", short: "MW",
    color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "🔧",
    experiments: [
        {
            id: 1, name: "Workshop Safety and Tools Identification",
            theory: {
                formulas: ["No specific formula — fundamentals of safety", "Cutting speed: N = (1000 × V) / (π × D) rpm"],
                importantTopics: [
                    "PPE (Personal Protective Equipment): safety glasses, face shield, gloves (not for rotating machinery), safety shoes, ear protection for noisy operations.",
                    "Housekeeping: clear walkways, put tools after use, clean chips with brush (never bare hands), oil machine slideways.",
                    "Measuring tools: vernier calliper (0.02mm least count), micrometer (0.01mm), dial gauge (0.01mm), steel rule, try square.",
                    "Layout tools: scriber, marking gauge, divider, centre punch, combination set.",
                    "Hand tools: files (bastard, second cut, smooth), chisels, hammers, spanners, hacksaw, taps and dies."
                ],
                usefulPoints: [
                    "Never use a file without a handle — the tang can pierce your palm.",
                    "Always secure work in a vice before filing or sawing.",
                    "Vernier calliper: main scale + (Vernier coincidence × LC). LC = 1 mm/n (n = divisions).",
                    "Micrometer: reading = main scale + thimble scale + (vernier if 3rd graduation) × 0.001mm."
                ]
            },
            procedure: [
                "Identify and name all measuring instruments; state their least counts and uses.",
                "Identify all hand tools: files (flat, round, half-round, triangular), chisels (flat, cross-cut), hammers (ball-peen, cross-peen), hacksaw, taps and dies.",
                "Measure a given workpiece using vernier calliper and micrometer; record readings.",
                "Demonstrate safe vice clamping; practise marking a layout using scriber and centre punch.",
                "List 10 workshop safety rules specific to the bench-work and machine shop sections."
            ],
            vivaQuestions: [
                { q: "What is the least count of a vernier calliper?", a: "Least count (LC) = Smallest main scale division / Number of vernier divisions = 1mm / 50 (for a 50-division vernier) = 0.02 mm, or = MSD − VSD = 1mm − 49/50 mm = 0.02 mm. The vernier calliper reads to 0.02 mm accuracy. Some have 25-division vernier: LC = 0.04 mm. Digital callipers display directly to 0.01 mm." },
                { q: "Why must gloves NOT be worn near rotating machinery?", a: "Gloves can get caught in rotating parts (drill, lathe chuck, grinding wheel) and drag the hand/wrist into the machine. A rotating part can wrap the glove and pull the hand in with tremendous force before you can react. Bare hands slip free more easily. Gloves are only appropriate for non-rotating tasks like carrying sharp materials." },
                { q: "What are the different cuts of a file and their uses?", a: "Bastard cut: coarse — used for fast material removal on rough surfaces. Second cut: medium — smoothing after bastard cut. Smooth cut: fine — finishing operations. Dead smooth: ultra-fine finishing. Also: single cut (one set of teeth, for harder metals) and double cut (two sets at angles, more material removed, used for mild steel)." },
                { q: "What is a try-square used for?", a: "A try-square is used to check and mark lines at 90° (right angles) to a reference surface. It consists of a steel blade and a stock at 90° to each other. Used to verify squareness of machined faces, mark perpendicular lines, and set up workpieces at right angles." }
            ]
        },
        {
            id: 2, name: "Carpentry (Wood Working) — Joints and Fitting",
            theory: {
                formulas: ["No specific formula — woodworking geometry"],
                importantTopics: [
                    "Carpentry tools: marking gauge, mortise gauge, tenon saw, rip saw, cross-cut saw, mallet, chisels (firmer, bevel-edged, mortise), jack plane, smoothing plane, gimlet, brace and bit.",
                    "Wood defects: knots, shakes (cracks), warping, cupping, bowing, twisting.",
                    "Common joints: Butt joint (weakest), Lap joint, Halving joint (T, L), Mortise and tenon joint (strongest for frames), Dovetail joint (for box corners), Tongue and groove (for flooring).",
                    "Grain direction: always plane/chisel with the grain to avoid tear-out.",
                    "Wood species: hardwood (oak, teak, mahogany — close grain, strong) vs softwood (pine, cedar — faster growing, lighter)."
                ],
                usefulPoints: [
                    "Mark all wood before cutting: 'waste side' marked with X to avoid cutting wrong side.",
                    "Saw cut (kerf) is on the waste side of the line.",
                    "Mortise and tenon: tenon width = 1/3 of timber thickness; mortise depth = 2/3 of mating timber.",
                    "Adhesives: PVA wood glue (white glue) for most joints; epoxy for gaps; hide glue (traditional)."
                ]
            },
            procedure: [
                "Select, measure, and mark the wood piece for a given joint according to dimensions.",
                "Cut the pieces to length using the tenon saw (supports from both sides to prevent breakout).",
                "For the Half-Lap Joint: mark the waste area; chisel out the recess to half-depth on each piece. Fit together; check for flatness and squareness.",
                "For the Mortise and Tenon: mark mortise (hole) on one piece, tenon (protrusion) on the other. Cut tenon with saw; chop mortise with chisel. Fit, adjust, and assemble.",
                "Finishing: plane smooth, sand with sandpaper (coarse → fine), apply finish if required."
            ],
            vivaQuestions: [
                { q: "What is the strongest wood joint and why?", a: "The mortise and tenon joint is among the strongest because the tenon (male projection) interlocks mechanically with the mortise (female cavity), resisting pulling forces. When glued, the large glue surface area makes the joint stronger than the surrounding wood. Used in furniture frames and structural timber connections." },
                { q: "What is the difference between a rip saw and a cross-cut saw?", a: "Rip saw: teeth are shaped like chisels and cut along the grain (ripping). Teeth are larger and more widely spaced. Cross-cut saw: teeth are shaped like knife points and cut across the grain (cross-cutting). Teeth are smaller and more numerous (TPI — teeth per inch). Using the wrong saw across the grain tears fibres and gives poor results." },
                { q: "Why do you always mark and cut on the 'waste side' of a line?", a: "The saw blade has width (kerf — about 1.5–3 mm). If you cut ON the line, the material is reduced by half the kerf width, resulting in workpiece being slightly short. Cutting on the waste side (removing extra material) means the finished dimension matches the line exactly. Always mark waste with an X." },
                { q: "What are wood shakes and knots?", a: "Knots: sections of branches enclosed in the wood during growth — hard, dense, may cause weakness around them. Shakes: cracks or separations along the wood grain — caused by rapid drying, storms, or growth stresses. Dead knots can fall out. Both are defects that reduce strength and make machining/finishing difficult." }
            ]
        },
        {
            id: 3, name: "Sheet Metal Work — Forming, Joining, and Finishing",
            theory: {
                formulas: [
                    "Bend allowance: BA = π × θ/180 × (r + t/2), r = inner radius, t = thickness, θ = bend angle°",
                    "Blank length = sum of flat lengths + bend allowances"
                ],
                importantTopics: [
                    "Sheet metal operations: shearing (cutting), bending (forming angles), drawing (cups), rolling (cylinders), punching (holes), blanking (flat shape).",
                    "Tools: snips (straight, bent, aviation/compound), stakes (creasing, hatcher, square, blow-horn), mandrel, mallet (wooden/plastic), groove-joint pliers, rivet set, swage.",
                    "Joining: riveted joints, soldered joints (soft solder: lead-tin, hard solder: silver solder), folded seam (grooved seam, lap seam).",
                    "Sheet thickness gauge: SWG (Standard Wire Gauge): higher SWG = thinner sheet (SWG 14 = 2 mm, SWG 20 = 0.9 mm).",
                    "Material: galvanised iron (GI) sheet — zinc coated for corrosion resistance. Tinplate: tin over steel. Aluminium sheet: lightweight."
                ],
                usefulPoints: [
                    "Soft soldering: clean with flux (hydrochloric acid or resin flux) → heat → apply solder (60% tin, 40% lead). Joint strength ~20 MPa.",
                    "Hard soldering (brazing/silver soldering): higher temperature, stronger joint.",
                    "Riveting: rivet diameter = 1.2√t (t = sheet thickness). Snap head, countersunk head, pan head rivets.",
                    "Lap seam (folded): interlock bent edges of two sheets — no solder needed if watertight."
                ]
            },
            procedure: [
                "Measure and cut a sheet metal blank for a square tray or cylindrical can using snips.",
                "Mark out the development (layout) on the sheet; score fold lines with a scriber.",
                "Bend the sides using a straight-edged stake and wooden mallet.",
                "Form the cylindrical shape (if applicable) over the blow-horn stake.",
                "Join the seam using a grooved seam (folder) or riveting.",
                "Solder the corner joints: clean, apply flux, heat with soldering iron, run solder."
            ],
            vivaQuestions: [
                { q: "What is bend allowance and why is it important?", a: "Bend allowance (BA) is the extra length of material needed in the bend region to account for the fact that the neutral axis (which neither stretches nor compresses) is not at the outer surface. BA = π(r + t/2)/180 × θ. Without bend allowance, bent parts would be shorter than designed; the blank size must include BA to achieve the correct final dimensions." },
                { q: "What is the gauge system for sheet metal thickness?", a: "SWG (Standard Wire Gauge) is a numeric system where higher numbers = thinner sheets. SWG 10 ≈ 3.25 mm, SWG 16 ≈ 1.6 mm, SWG 20 ≈ 0.9 mm. It is confusingly inverse to what beginners expect. The gauge number was historically based on the number of drawing passes to produce the wire/sheet." },
                { q: "What is the purpose of flux in soldering?", a: "Flux removes the oxide layer on the metal surface (which would prevent solder adhesion) and prevents re-oxidation during heating. Without flux, the solder would bead up and not wet the surface. Common fluxes: hydrochloric acid (corrosive, must be washed off after), resin flux (non-corrosive, used in electronics)." },
                { q: "What is the difference between lap seam and groove seam joints in sheet metal?", a: "Lap seam: one sheet overlaps the other; joined by rivets, solder, or adhesive. Simple but not very neat. Groove seam (locked seam): the edges of both sheets are folded and interlocked by hammering — a mechanical, solder-free joint used for cylindrical cans and ducts. It is clean, watertight (if soldered), and aesthetically neat." }
            ]
        },
        {
            id: 4, name: "Fitting — Filing, Drilling, Tapping, and Die Work",
            theory: {
                formulas: [
                    "Drill speed: N = (1000 × Vc) / (π × D) rpm; Vc = cutting speed (m/min), D = drill dia (mm)",
                    "Tap drill size = Major diameter − Pitch (for metric threads)",
                    "Thread designation: M10 × 1.5 = Metric, 10mm nominal dia, 1.5mm pitch"
                ],
                importantTopics: [
                    "Fitting: precision bench work to make components that fit together accurately.",
                    "File types: flat, square, round, triangular, half-round — each for different surfaces.",
                    "Drilling: twist drill (HSS), point angle 118° for general purpose; correct cutting speed = Vc(m/min) = π×D×N/1000.",
                    "Tapping: creating internal threads. Dies: creating external threads. Both done in 3 stages (taper, plug, bottoming for taps).",
                    "Metric thread: M dia × pitch (e.g., M10 × 1.5). ISO standard.",
                    "BSW (Whitworth): older British standard. BSP (Pipe threads): for plumbing."
                ],
                usefulPoints: [
                    "Tapping drill size (approx) = Major dia − (1.0825 × pitch) for metric threads. Example: M10×1.5 → drill = 10 − 1.5 = 8.5 mm (approx).",
                    "Use tapping fluid/cutting oil to reduce heat and wear.",
                    "Turn tap ½ turn forward, ¼ turn back to break chips — prevents tap breakage.",
                    "Countersink = tapered recess for flat/countersunk head screw; counterbore = cylindrical recess for hex socket head."
                ]
            },
            procedure: [
                "File the given mild steel workpiece to a flat, smooth surface; check flatness with a try-square and surface plate.",
                "Mark out the drilling positions using scriber, centre punch (dot the centre), and steel rule.",
                "Drill pilot hole, then drill to final diameter using bench drill; hold work in machine vice.",
                "Use a tap set (taper tap first, then plug tap) to cut internal thread in the drilled hole. Apply cutting oil.",
                "Using a die and die stock, cut external thread on a rod. Check with a thread gauge.",
                "Fit bolt into the tapped hole; verify the fit — smooth threading indicates correct operation."
            ],
            vivaQuestions: [
                { q: "Why must a centre punch be used before drilling?", a: "A centre punch creates a small conical indentation at the marked drilling point. This locates the drill tip precisely — preventing the drill from 'walking' (wandering off the marked position as it starts rotating). Without a punch mark, the drill tip wanders on the flat surface, giving inaccurate hole placement." },
                { q: "What is the point angle of a general-purpose twist drill?", a: "The standard included point angle for a general-purpose HSS twist drill bit is 118° (59° per side). For harder materials (stainless steel): 135°. For soft materials (plastics, wood): 90°. The point angle affects chip formation, cutting force, and hole quality." },
                { q: "Why do you turn the tap back (reverse) when tapping a thread?", a: "Turning the tap back breaks the chip that has built up in the flutes of the tap. Unbroken chips can pack the flutes, increasing torque dramatically until the tap breaks (snapping in the hole is a serious problem — tap removal is extremely difficult). Back-turning clears chips and maintains cutting conditions." },
                { q: "What is the meaning of M12 × 1.75 thread designation?", a: "M = Metric standard thread. 12 = Nominal (major) diameter in mm. 1.75 = Pitch in mm (distance between thread crests). So M12 × 1.75 means a 12 mm diameter bolt/hole with 1.75 mm between threads. The equivalent TPI (threads per inch) would be 25.4/1.75 ≈ 14.5 TPI." }
            ]
        },
        {
            id: 5, name: "Casting — Sand Moulding",
            theory: {
                formulas: [
                    "Shrinkage allowance: Pattern larger than casting by ~1% (cast iron) to 2% (aluminium)",
                    "Permeability number: P = V × H / (A × P × T), where V=gas volume, H=specimen height, A=area, P=gauge pressure, T=time"
                ],
                importantTopics: [
                    "Sand casting process: Pattern → Mould → Pouring → Solidification → Shakeout → Cleaning → Finishing.",
                    "Green sand mould: moist sand + clay binder + water. No baking needed. Most common.",
                    "Dry sand mould: baked in oven — stronger, better surface finish for large castings.",
                    "Flask: drag (lower) and cope (upper); sprue (vertical inlet), runner (horizontal), gate (into cavity), riser (overflow — monitors fill, feeds shrinkage).",
                    "Pattern allowances: shrinkage, draft (taper for pattern removal), machining, shake (rapping), distortion.",
                    "Core: sand shape placed in mould to create hollow interior; held by core prints."
                ],
                usefulPoints: [
                    "Properties of moulding sand: permeability (gas escape), cohesiveness (strength), refractoriness (heat resistance), adhesiveness (sticks to flask), collapsibility (breaks after casting).",
                    "Casting defects: shrinkage (insufficient feed metal), porosity (trapped gas), cold shut (two streams not fusing), misrun (metal not filling cavity), hot tear (solidification shrinkage cracking), scab (sand erosion).",
                    "Draft angle: 1°–3° on vertical surfaces for easy pattern removal.",
                    "Sprue should be tapered (top wider) to maintain constant pressure and avoid aspiration."
                ]
            },
            procedure: [
                "Place the pattern in the drag (lower flask); ram moulding sand around the pattern in layers; strike off level.",
                "Invert the cope (upper flask) on the drag; dust with parting sand (chalk); position riser pins and sprue pin.",
                "Ram sand in cope; lift off cope; remove sprue pin and riser pins to form gate openings.",
                "Draw (remove) the pattern carefully; touch up any damage to the cavity.",
                "Assemble cope and drag; pour molten metal through the sprue (for demonstration or with low-melting alloys).",
                "After cooling, break open (shakeout) and retrieve the casting; identify any casting defects."
            ],
            vivaQuestions: [
                { q: "What is green sand moulding?", a: "Green sand is a mixture of silica sand (85–90%), bentonite clay (4–10% binder), and water (3–5%). It is called 'green' because the mould is used in the moist state without any baking/drying. It is the most common, cheapest, and fastest moulding method, suitable for iron, steel, and non-ferrous alloys." },
                { q: "What is a riser and why is it important?", a: "A riser (header/feeder) is a reservoir of molten metal placed above the casting cavity. During solidification, metal shrinks by 3–6% in volume. The riser feeds molten metal into the shrinking casting to prevent shrinkage voids (cavities) in the casting. A properly designed riser solidifies last. Without a riser, the casting would have internal shrinkage defects." },
                { q: "What is draft allowance on a pattern?", a: "Draft (taper) allowance is the slight taper (1°–3°) given to vertical surfaces of the pattern so it can be withdrawn cleanly from the mould without tearing the sand walls. Without draft, the pattern sides would scrape against and damage the mould cavity during removal. External surfaces: tapered inward; internal surfaces: tapered outward." },
                { q: "What is porosity in casting and how is it caused?", a: "Porosity = small holes/voids in the casting. Gas porosity: dissolved gases (H₂, CO) in molten metal that come out of solution on cooling, forming bubbles trapped in the solidifying metal. Prevented by degassing the melt, controlling pouring temperature, and ensuring mould permeability. Shrinkage porosity: insufficient feed metal — prevented by proper riser design." }
            ]
        },
        {
            id: 6, name: "Welding — Arc Welding and Gas Welding",
            theory: {
                formulas: [
                    "Heat input: Q = (V × I × 60) / (welding speed in mm/min) J/mm",
                    "Oxygen:Acetylene ratio: Neutral flame = 1:1; Oxidising = excess O₂; Carburising = excess C₂H₂"
                ],
                importantTopics: [
                    "Arc welding (SMAW/MMAW): electric arc between electrode and workpiece (~3000–4000°C) melts metal. Electrode: flux-coated (shielded metal arc welding).",
                    "Gas welding (oxy-acetylene): oxygen + acetylene → ~3200°C neutral flame. Used for thin sheets, brazing.",
                    "Joint types: butt, lap, T-joint, corner joint, edge joint.",
                    "Welding positions: flat (1G/1F), horizontal (2G), vertical (3G), overhead (4G) — progressively more difficult.",
                    "Electrode classification: E6013 (E=electrode, 60=tensile strength ksi, 1=all positions, 3=flux type).",
                    "Post Weld Heat Treatment (PWHT): stress relieving of thick welds to prevent cracking."
                ],
                usefulPoints: [
                    "Welding hazards: UV/IR radiation (eye protection — welding helmet #10–12 shade), fumes (ventilation), burns, electric shock.",
                    "Heat affected zone (HAZ): region adjacent to weld bead that has been altered metallurgically by heat but not melted.",
                    "Welding defects: undercutting, porosity, slag inclusion, incomplete fusion, cracks, spatter.",
                    "Neutral oxy-acetylene flame: three zones — inner luminous cone (~3200°C hottest), reducing zone, outer envelope. Used for most welding."
                ]
            },
            procedure: [
                "Setup arc welder: connect earth clamp, select electrode (E6013, 2.5mm or 3.2mm), set current (60–90A for 2.5mm electrode).",
                "Strike the arc: scratch/tap the electrode on the workpiece; maintain arc length ≈ electrode diameter.",
                "Run a straight bead on mild steel plate; maintain consistent speed and angle (70–80° to plate, 10–15° travel angle).",
                "Observe and sketch the weld bead cross-section after cutting and etching.",
                "Gas welding (demonstration): connect cylinders, adjust regulator pressures (O₂: 1–2 bar, C₂H₂: 0.1–0.5 bar), light torch, adjust to neutral flame.",
                "Identify the three flame types (neutral, oxidising, carburising) and their applications."
            ],
            vivaQuestions: [
                { q: "What is the difference between neutral, oxidising, and carburising oxy-acetylene flames?", a: "Neutral flame (O₂:C₂H₂ = 1:1): clearly defined inner cone, no excess oxygen or carbon — used for most welding. Oxidising flame (excess O₂): shorter, more pointed inner cone, hissing sound — used for brass/copper welding (oxidises zinc). Carburising (reducing) flame (excess C₂H₂): feathery inner cone with carbon halo — used for hard-facing and high-carbon steel welding." },
                { q: "What does electrode designation E6013 mean?", a: "E = Electrode (arc welding). 60 = minimum tensile strength of weld metal = 60 ksi (420 MPa). 1 = usable in all positions (flat, horizontal, vertical, overhead). 3 = flux coating type (rutile/titania, medium penetration, AC/DC, easy slag). E7018 is a commonly used low-hydrogen electrode for structural steel." },
                { q: "What is the Heat Affected Zone (HAZ)?", a: "The HAZ is the region of the base metal adjacent to the weld bead that has been subjected to high temperatures (but not melted) sufficient to alter its microstructure and mechanical properties. In steels, the HAZ often becomes harder and more brittle than the base or weld metal. PWHT (stress relief annealing) is used to reduce HAZ hardness and improve toughness." },
                { q: "What are the common weld defects and their causes?", a: "Porosity: trapped gas (damp electrode, contaminated surface). Undercutting: excessive current or wrong angle — groove along weld toe. Incomplete fusion: insufficient heat or poor technique. Slag inclusion: improper inter-pass cleaning. Hot cracks: high sulphur content or rapid cooling. Spatter: too high current, wrong polarity, wet flux." }
            ]
        },
        {
            id: 7, name: "Lathe Machine — Turning, Facing, and Knurling",
            theory: {
                formulas: [
                    "Cutting speed: Vc = πDN/1000 (m/min), D=diameter(mm), N=rpm",
                    "Machining time: T = L/(f × N), L=length(mm), f=feed(mm/rev), N=rpm",
                    "Material removal rate (MRR): MRR = Vc × f × d (m/min × mm/rev × mm)"
                ],
                importantTopics: [
                    "Lathe parts: headstock (spindle, gearbox), tailstock (for drills/centres), carriage (saddle, cross-slide, compound rest, tool post), bed, lead screw/feed rod.",
                    "Operations: turning (reduce diameter), facing (flat end), taper turning, threading, drilling, boring, knurling, parting.",
                    "Tool geometry: rake angle, clearance angle, nose radius. HSS or carbide tool. Positive rake for soft materials; negative rake for hardened steel.",
                    "Work holding: 3-jaw chuck (self-centering), 4-jaw chuck (independent, for irregular shapes), collets (precision, thin-wall), between centres, face plate.",
                    "Cutting parameters: speed (rpm), feed (mm/rev or mm/min), depth of cut (mm)."
                ],
                usefulPoints: [
                    "Chatter (vibration + sound): caused by too high speed, tool overhang, worn bearings — reduce speed or increase feed.",
                    "Knurling: not cutting — roller presses pattern onto surface (diamond or straight). Increases grip; used on handles, thimbles.",
                    "Taper turning methods: offset tailstock, compound slide method, taper turning attachment.",
                    "Thread cutting: engage lead screw; half-nut (split nut) engaged at same dial position each pass."
                ]
            },
            procedure: [
                "Mount the workpiece in the 3-jaw chuck; check for runout with a dial gauge.",
                "Facing: align tool centre height; traverse cross-slide inward (or auto-feed) to face the end flat.",
                "Turning: set speed (e.g., N = 400 rpm for Vc ≈ 30 m/min on 25 mm dia mild steel); set depth of cut (0.5–1 mm); engage auto feed (f = 0.1–0.2 mm/rev); turn to required diameter.",
                "Measure diameter with vernier calliper; adjust depth of cut for next pass.",
                "Knurling: mount knurling tool; press into workpiece surface at low rpm and moderate feed; observe pattern formation.",
                "Safety: remove chuck key before starting; use chip shield; wear safety glasses."
            ],
            vivaQuestions: [
                { q: "Name the six basic lathe operations.", a: "1) Facing: machining flat end surface. 2) Turning: reducing outer diameter. 3) Taper turning: producing conical surface. 4) Drilling/Boring: axial/enlarging holes. 5) Threading (screw cutting): using lead screw and half-nut. 6) Knurling: pressing pattern for grip. Also: parting/grooving, reaming." },
                { q: "What is the difference between a 3-jaw and 4-jaw chuck?", a: "3-jaw chuck: self-centering (all three jaws move simultaneously) — auto-centers round/hexagonal stock. Quick to set up. 4-jaw chuck: each jaw moves independently — can centre irregular shapes, offset work for eccentric turning. More versatile but requires setup time with a dial gauge." },
                { q: "What factors affect surface finish in turning?", a: "1) Nose radius of tool: larger radius → better finish. 2) Feed rate: lower feed → better finish. 3) Cutting speed: higher speed generally → better finish. 4) Depth of cut: shallower finishes better. 5) Vibration/chatter: must be eliminated. 6) Work/tool rigidity. 7) Coolant: reduces heat and BUE (built-up edge)." },
                { q: "What is built-up edge (BUE) and how is it prevented?", a: "BUE is a mass of work material that adheres to the cutting edge due to adhesive forces at low cutting temperatures. It alters effective tool geometry and causes poor surface finish and intermittent cutting. Prevented by: 1) Increasing cutting speed (moves past low-temperature BUE zone). 2) Using coolant/lubricant. 3) Increasing rake angle. 4) Using harder, smoother tool material." }
            ]
        },
        {
            id: 8, name: "Plumbing — Pipe Fitting and Connections",
            theory: {
                formulas: ["No specific formula — fittings and layout", "Pipe flow: Q = AV (continuity equation for incompressible flow)"],
                importantTopics: [
                    "Pipe materials: GI (galvanised iron) — water supply; PVC — drainage; CPVC — hot water; copper — medical gas; CI (cast iron) — drainage, sewers.",
                    "Pipe fittings: elbow (90°, 45°), tee, union, coupler, reducer, bush, plug, cap, gate valve, ball valve, globe valve, check valve.",
                    "Thread type in plumbing: BSP (British Standard Pipe) taper thread — seals at the thread. Teflon (PTFE) tape used as thread sealant.",
                    "Joining methods: threaded (GI), solvent cement (PVC), push-fit, capillary soldering (copper), flanged (industrial).",
                    "Water supply system: overhead tank, float valve, distribution pipes. Drainage: fall (slope 1:80 floor, 1:40 pipe minimum)."
                ],
                usefulPoints: [
                    "PTFE (Teflon) tape: wrap 2–3 turns clockwise (as seen from open end) before threading.",
                    "Pipe wrench: adjustable jaw wrench for gripping round pipe — primary plumbing tool.",
                    "Hacksaw for cutting GI; PVC cutter or hacksaw for plastic pipes.",
                    "Always use two wrenches when tightening joints — one to hold the fitting, one to turn the pipe."
                ]
            },
            procedure: [
                "Cut a GI pipe to required length using a pipe cutter or hacksaw; file/ream the ends.",
                "Thread the pipe end using a pipe die (3-die stock); clean threads with oil.",
                "Wrap PTFE tape on threads; assemble the joint (elbow, tee, union) hand-tight then wrench-tight.",
                "Assemble a small plumbing layout (L-shape or T-shape circuit with gate valve).",
                "For PVC: cut, deburr, apply PVC solvent cement on both surfaces, insert with ¼ turn, hold 30 sec.",
                "Pressure test the assembled circuit (water test or air test); check for leaks."
            ],
            vivaQuestions: [
                { q: "Why is PTFE tape used in pipe threading?", a: "PTFE (polytetrafluoroethylene) tape is wrapped around male pipe threads to fill the small gaps between thread peaks and valleys, creating a watertight seal. It also lubricates the threads during assembly, reducing the force needed and preventing thread galling. PTFE is chemically inert — compatible with water, gas, steam, and most chemicals." },
                { q: "What is the difference between a gate valve and a ball valve?", a: "Gate valve: rises a flat or wedge disk (gate) out of the flow path — fully open or closed. Slow to operate (many turns), low pressure drop when open. Used for infrequently operated isolation. Ball valve: a sphere with a hole rotated 90° — quarter-turn on/off, very quick operation, tight shutoff. Modern standard for residential plumbing." },
                { q: "What is the minimum slope for drainage pipes?", a: "Drainage pipes require a minimum slope (fall) of 1:40 (approximately 2.5%) for horizontal waste pipes (75mm–100mm dia) to ensure self-cleaning velocity (the flow must be fast enough to carry solids). For floor channels and gullies: 1:80 to 1:100. Too little slope → blockage; too much → liquid outruns solids and blockage still occurs." }
            ]
        }
    ]
};

export default mechanicalWorkshopViva;
