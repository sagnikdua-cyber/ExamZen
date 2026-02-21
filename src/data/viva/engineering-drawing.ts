import type { VivaSubject } from "./physics";

const engineeringDrawingViva: VivaSubject = {
    slug: "engineering-drawing", name: "Engineering Drawing", short: "ED",
    color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: "📐",
    experiments: [
        {
            id: 1, name: "Drawing Instruments and Standards — Introduction",
            theory: {
                formulas: ["Scale: RF = Drawing size / Actual size", "Representative fraction: RF = 1:10 means 1 cm on paper = 10 cm actual"],
                importantTopics: [
                    "Drawing board sizes: A0 (841×1189mm), A1 (594×841mm), A2 (420×594mm), A3 (297×420mm), A4 (210×297mm).",
                    "Line types: Continuous thick (visible edges), Continuous thin (dimension/projection lines), Dashed thin (hidden edges), Long dash dot (centre lines), Long dash double dot (phantom lines).",
                    "Lettering: single stroke, ABCDEFG... 3.5mm or 5mm height as per IS:9609.",
                    "Title block: drawing number, scale, projection symbol (first/third angle), material, tolerances, date, drawn by."
                ],
                usefulPoints: [
                    "IS:696 — Code of practice for general engineering drawing in India.",
                    "BIS: Bureau of Indian Standards — governs Indian drawing conventions.",
                    "T-square used with drawing board for horizontal lines; set squares (30-60, 45°) for angles.",
                    "Mini drafter: combines protractor, T-square, and set square functions."
                ]
            },
            procedure: [
                "Identify and label all drawing instruments: drawing board, T-square, set squares, compass, divider, protractor, scale, french curve.",
                "Practice drawing different line types to IS standards with their applications.",
                "Practice IS lettering — uppercase single stroke vertical with correct proportions.",
                "Set up the title block on A3/A4 sheet as per IS format.",
                "Draw a plain scale at 1:2 and representative fraction (RF) = ½."
            ],
            vivaQuestions: [
                { q: "What is the Representative Fraction (RF) of a scale?", a: "RF = Length on drawing / Actual length of object. RF = 1:2 means the drawing is half the actual size. RF = 2:1 means the drawing is twice actual size (enlarged). Used to understand the relationship between drawing and real object dimensions." },
                { q: "Which angle of projection is used in India and why?", a: "India follows First Angle (European) projection. In first angle projection, the object is between the observer and the plane of projection — view appears on the FAR side. The US/Canada use Third Angle projection. The BIS standard (IS:696) specifies first angle." },
                { q: "Name 5 line types and their uses.", a: "1) Continuous thick: visible outlines. 2) Continuous thin: dimension/extension/hatching lines. 3) Short dashes (thin): hidden edges. 4) Long dash-dot (thin): centre lines, axes. 5) Long dash-double dot: phantom/adjacent parts." },
                { q: "What is the IS standard for lettering in engineering drawing?", a: "IS:9609 specifies lettering for technical drawings. Single-stroke uppercase Gothic letters, 2.5 to 10 mm height. Inclined (15°) or vertical. Height-to-width ratio ≈ 5:4. Spacing: letter spacing = 2/3 h; word spacing = 1.5 h." }
            ]
        },
        {
            id: 2, name: "Conic Sections — Ellipse, Parabola, Hyperbola",
            theory: {
                formulas: [
                    "Eccentricity: e = Distance from focus / Distance from directrix",
                    "Ellipse: e < 1. Parabola: e = 1. Hyperbola: e > 1.",
                    "Ellipse: (x/a)² + (y/b)² = 1; a = semi-major, b = semi-minor",
                    "Relationship: b² = a² − c² (c = focal distance from centre)"
                ],
                importantTopics: [
                    "Conic sections: shapes formed by cutting a cone at different angles.",
                    "Ellipse: oblique section (not parallel to base, not through apex). e < 1.",
                    "Parabola: section parallel to a slant edge (generator). e = 1.",
                    "Hyperbola: section parallel to axis (produces two curves). e > 1.",
                    "Circle: section parallel to base. e = 0 (special case of ellipse)."
                ],
                usefulPoints: [
                    "Methods for ellipse: Concentric circle method, Rectangle method, Oblong method, Arc of circles method.",
                    "Parabola methods: Rectangle (ordinate-abscissa) method, Tangent method.",
                    "Focus-directrix method works for all conics using eccentricity.",
                    "Applications: ellipse → satellite orbits, bridge arches; parabola → reflectors, projectile paths; hyperbola → cooling towers, GPS."
                ]
            },
            procedure: [
                "Ellipse (Concentric Circle Method): Draw two concentric circles (major and minor diameters). Divide into 12 parts. From outer circle divide points draw vertical lines; from inner circle draw horizontal lines; the intersections are ellipse points. Join with french curve.",
                "Ellipse (Oblong Method): Draw rectangle of dimensions major axis × minor axis. Divide each half side into equal parts; draw lines from endpoints of minor axis to division points on major axis — intersections give ellipse.",
                "Parabola (Rectangle Method): Draw enclosing rectangle of height h and base b. Divide base and height into equal parts; draw lines — intersections trace the parabola.",
                "Hyperbola (given eccentricity): Draw directrix and axis. Mark focus. Using focus-directrix method place points such that distance from focus / distance from directrix = e.",
                "Mark foci and directrices on all constructed curves."
            ],
            vivaQuestions: [
                { q: "Define conic sections and state the three types.", a: "Conic sections are curves formed by the intersection of a right circular cone with a plane at various angles. The three types are: Ellipse (e < 1): plane cuts one nappe, not through apex. Parabola (e = 1): plane parallel to one generator. Hyperbola (e > 1): plane cuts both nappes." },
                { q: "What is eccentricity and how does it classify conic sections?", a: "Eccentricity e = distance from moving point to focus / distance from moving point to directrix. e < 1: ellipse (closed curve). e = 1: parabola (open, symmetric). e > 1: hyperbola (two open branches). e = 0: circle (special ellipse)." },
                { q: "What are the practical applications of a parabola?", a: "1) Parabolic reflectors (dish antennas, car headlights) — parallel rays converge at focus. 2) Suspension bridge cables follow parabolic shape under uniform load. 3) Projectile motion follows a parabolic path (in uniform gravity). 4) Parabolic trough solar collectors." },
                { q: "Describe the concentric circle method for drawing an ellipse.", a: "Draw two circles with diameters equal to the major and minor axes (both centred at the origin). Divide both circles into equal sectors (12 equal parts). From division points on the outer circle, draw vertical lines; from corresponding points on the inner circle, draw horizontal lines. Intersections of corresponding verticals and horizontals are points on the ellipse. Connect with a smooth curve." }
            ]
        },
        {
            id: 3, name: "Engineering Curves — Cycloid, Involute, Helix",
            theory: {
                formulas: [
                    "Cycloid: generates when a circle rolls on a straight line",
                    "Involute: trace of a point on a taut string unwinding from a circle (gear tooth profile)",
                    "Helix (pitch): vertical distance per complete revolution"
                ],
                importantTopics: [
                    "Cycloid: curve traced by a point on the circumference of a circle rolling along a straight line. Arc length = 8r (for one revolution).",
                    "Epicycloid: rolling circle outside a base circle.",
                    "Hypocycloid: rolling circle inside a base circle.",
                    "Involute of a circle: curve traced by end of a string unwound from a cylinder — used for gear tooth profiles (provides constant velocity ratio).",
                    "Helix: curve on a cylinder/cone where a point moves with constant speed along the axis and constant angular speed around the axis."
                ],
                usefulPoints: [
                    "Involute used in gear tooth design — ensures smooth transfer of motion (constant velocity ratio).",
                    "Cycloid used in pendulum clocks (Huygens), cycloidal gear profiles.",
                    "Pitch of helix: distance moved axially per revolution.",
                    "Lead angle of helix: angle between helix tangent and horizontal plane."
                ]
            },
            procedure: [
                "Cycloid: Draw the rolling circle (R); mark the base line = 2πR. Divide circle and base line into 12 equal parts. For each position of the rolling circle, locate the centre and the traced point. Draw the smooth cycloid curve.",
                "Involute: Draw the given circle. Divide into 12 parts. Draw tangents at each division point. On each tangent, mark a length equal to the corresponding arc length from the starting point. Connect plotted points to form the involute.",
                "Helix: Draw the cylinder (front view: rectangle; top view: circle). Mark pitch on the vertical axis. Divide one revolution into 12 equal parts on both views. Project intersection points to draw the helix as a sinusoidal curve in front view."
            ],
            vivaQuestions: [
                { q: "Define a cycloid.", a: "A cycloid is a curve traced by a fixed point on the circumference of a circle as the circle rolls along a straight line without slipping. The total length of one arc equals 8r (r = radius of rolling circle). Applications: Huygens' pendulum clock, cycloidal gear profiles." },
                { q: "Why is the involute of a circle used for gear teeth profiles?", a: "The involute profile ensures that the contact point always moves along the same line of action (common tangent to the base circles) regardless of the centre distance. This guarantees a constant angular velocity ratio — smooth, vibration-free power transmission even with slight centre distance errors." },
                { q: "What is the difference between a cycloid, epicycloid, and hypocycloid?", a: "Cycloid: generating circle rolls on a STRAIGHT line. Epicycloid: generating circle rolls on the OUTSIDE of a base circle. Hypocycloid: generating circle rolls on the INSIDE of a base circle. All are mathematically related — different base curve configurations." },
                { q: "What is the pitch of a helix?", a: "Pitch of a helix is the axial distance advanced during one complete revolution of the helix. A right-hand helix advances when turned clockwise (when viewed from one end); left-hand when turned counterclockwise. Used for screws, springs, and helical gears." }
            ]
        },
        {
            id: 4, name: "Projection of Points and Lines",
            theory: {
                formulas: [
                    "True length of line: obtained when the line is parallel to the plane of projection",
                    "True inclination with HP (α): angle when line is parallel to VP",
                    "True inclination with VP (β): angle when line is parallel to HP"
                ],
                importantTopics: [
                    "Principal planes: HP (Horizontal Plane), VP (Vertical Plane). Front view from VP; top view from HP; side view from PP (Profile Plane).",
                    "First quadrant: above HP, in front of VP. Point → front view above XY, top view below XY.",
                    "Reference line XY: fold line between HP and VP (after rotation into same plane).",
                    "Lines in space: six cases based on relationship to HP and VP (parallel, perpendicular, inclined).",
                    "Auxiliary plane method: to find true length and true angles."
                ],
                usefulPoints: [
                    "Front view = elevation (FV); Top view = plan (TV).",
                    "For a line inclined θ to HP: apparent length in TV = TL × cos θ.",
                    "True length found by rotating line into plane of projection.",
                    "Apparent inclination (seen in FV or TV) is always greater than true inclination."
                ]
            },
            procedure: [
                "Plot points in all four quadrants on the VP-HP reference frame; project to XY line.",
                "For each point: FV above XY if above HP; FV below XY if below HP. TV below XY if in front of VP; TV above XY if behind VP.",
                "Project lines in space: given endpoints A and B with coordinates, draw FV and TV.",
                "Find true length using rotation method: rotate projected line to be parallel to projection plane.",
                "Draw auxiliary view to find true angle of inclination with HP and VP."
            ],
            vivaQuestions: [
                { q: "What are the three principal projection planes?", a: "1) VP (Vertical Plane) — front view (elevation) projected here. 2) HP (Horizontal Plane) — top view (plan) projected here. 3) PP/SP (Profile/Side Plane) — side view projected here. The fold line between HP and VP is the XY reference line." },
                { q: "How is a point in the first quadrant projected?", a: "First quadrant: above HP and in front of VP. Front view (FV): projected onto VP, above XY. Top view (TV): projected onto HP, below XY (because HP is rotated downward to flatten the drawing). Both views are connected by a vertical projector." },
                { q: "What is the apparent angle of inclination vs true angle?", a: "True angle: the actual angle the line makes with the plane (when the line lies IN a plane parallel to the projection plane). Apparent angle: the angle seen in a projection view when the line is inclined to the projection plane. Apparent inclination > true inclination." },
                { q: "How do you determine the true length of a line from its two views?", a: "Rotation method: rotate the FV (or TV) of the line until it is parallel to the XY line (reference line between HP and VP). The resulting view on the other projection plane shows the true length. Alternatively, draw an auxiliary plane parallel to the line." }
            ]
        },
        {
            id: 5, name: "Projection of Planes",
            theory: {
                formulas: [
                    "A plane perpendicular to a projection plane appears as a line (edge view) in that plane",
                    "A plane parallel to a projection plane shows its true shape in that plane"
                ],
                importantTopics: [
                    "Plane positions: parallel to HP (true shape in TV), parallel to VP (true shape in FV), perpendicular to HP (line in TV), perpendicular to VP (line in FV), perpendicular to both (line in both).",
                    "Inclined planes: oblique planes inclined to both HP and VP — require auxiliary projection.",
                    "True shape: found only when the projection is onto a plane parallel to the given plane.",
                    "Plane shapes to practice: square, rectangle, triangle, hexagon, pentagon, circle."
                ],
                usefulPoints: [
                    "When plane is inclined to HP at θ: FV shows inclined edge; TV shows foreshortened shape.",
                    "Auxiliary projection method: draw additional projection plane parallel to inclined plane.",
                    "Trace (line of intersection of plane with projection planes): VT = vertical trace, HT = horizontal trace.",
                    "Plane perpendicular to both HP and VP: only edge views visible in all standard views."
                ]
            },
            procedure: [
                "Draw the projections of a square plane in various positions: parallel to HP, parallel to VP, perpendicular to HP (inclined to VP), perpendicular to VP (inclined to HP).",
                "For inclined position: draw edge view first, then rotate to find second view.",
                "For oblique plane (inclined to both): use change-of-reference-line (auxiliary plane) method.",
                "Find VT and HT of the plane.",
                "Determine and draw the true shape of a plane seen obliquely by using auxiliary projection."
            ],
            vivaQuestions: [
                { q: "When does a plane appear as a line (edge view) in a projection?", a: "A plane appears as an edge (a straight line) in a projection when the projection plane is perpendicular to the given plane — in other words, when you are looking ALONG the plane (from the side). The edge view is also called the 'line view' and shows the true angle of inclination with the perpendicular axis." },
                { q: "When do we see the true shape of a plane?", a: "The true shape of a plane is seen when the projection is made onto a plane parallel to the given plane — the observer is looking straight at the face of the plane. If the plane is inclined, an auxiliary projection plane parallel to it must be drawn to reveal the true shape." },
                { q: "What are traces of a plane?", a: "Traces are the lines of intersection of the given plane with the principal projection planes. HT (Horizontal Trace) = intersection with HP. VT (Vertical Trace) = intersection with VP. Both traces, if extended, meet at the XY reference line." }
            ]
        },
        {
            id: 6, name: "Orthographic Projections of Solids",
            theory: {
                formulas: [
                    "1st Angle: Object between observer and plane; view on the FAR side of object",
                    "3rd Angle: Plane between observer and object; view on the NEAR side of object (US standard)"
                ],
                importantTopics: [
                    "Common solids: Prism (triangular, square, hexagonal), Pyramid, Cylinder, Cone, Sphere.",
                    "Orthographic projection: views from 6 directions — Front, Top, Right, Left, Bottom, Rear.",
                    "Engineering drawing uses 3 views minimum: FV (elevation), TV (plan), SV (side/end view).",
                    "Relationship: FV and TV share the same width. FV and SV share the same height. TV and SV share the same depth.",
                    "First angle projection: FV, TV below FV, SV to the left of FV (Right SV behind, to right of FV in third angle)."
                ],
                usefulPoints: [
                    "Symbol for 1st angle: truncated cone, wider end towards eye.",
                    "Symbol for 3rd angle: same truncated cone but wider end towards projection plane.",
                    "Hidden lines (dashed) represent edges not visible in that view.",
                    "Centre lines (long-dash dot): show axes of symmetry, centres of holes."
                ]
            },
            procedure: [
                "Draw three standard orthographic views (FV, TV, SV) of given solids: cube, square prism, hexagonal prism, square pyramid, cylinder, cone.",
                "Work methodically: draw FV first, project TV below and SV to the side.",
                "Add all visible edges as continuous thick lines; hidden edges as dashed lines.",
                "Add centre lines, dimension lines, and notes as per IS conventions.",
                "Draw the 1st angle projection symbol in the title block."
            ],
            vivaQuestions: [
                { q: "What is orthographic projection?", a: "Orthographic projection is a method of representing a 3D object on a 2D plane using parallel projectors perpendicular to the projection plane. All projectors are parallel and perpendicular to the plane — there is no perspective distortion. Gives true shape and size of faces parallel to the projection plane." },
                { q: "Explain first angle and third angle projection.", a: "First angle (IS, Europe): Object is between observer and projection plane. Views placed: FV in centre; TV below FV; Left SV to the right. Object seen from right → view placed at left. Third angle (US): Projection plane between observer and object. TV above FV; Right SV to the right. The symbol on drawings shows which system is used." },
                { q: "How are hidden edges shown in orthographic projection?", a: "Hidden edges (edges of the object not visible from the viewing direction) are shown as short, equally spaced dashes (hidden/dashed lines) in the respective view. They convey internal or far-side geometry without needing a section view." },
                { q: "How many views are typically needed for an engineering drawing?", a: "Minimum three views: Front View (elevation), Top View (plan), and one Side View (Left or Right, as needed) adequately describe most engineering objects. Simple objects may need only 2 views; complex or asymmetric objects may need more, including auxiliary views." }
            ]
        },
        {
            id: 7, name: "Sections of Solids — Sectional Views",
            theory: {
                formulas: ["Cutting plane lines: thick alternate long-short dashes (for section indication)"],
                importantTopics: [
                    "Section: imaginary cut through a solid to reveal internal features — removes front portion.",
                    "Cutting plane: position shown in adjacent view as a dashed line or chain line with arrowheads showing viewing direction.",
                    "Section hatching: 45° thin equidistant lines (cross-section material indicator).",
                    "Types: Full section, Half section (symmetric objects), Offset section (stepped cutting plane), Revolved section.",
                    "True shape of section: found by projecting onto a plane parallel to the cutting plane."
                ],
                usefulPoints: [
                    "Half section: only half the object is cut — used for symmetric objects (saves drawing; shows both inside and outside).",
                    "Removed section: the cross-section is drawn separately at a convenient location.",
                    "Do NOT hatch solid parts (ribs, webs, shafts in section — per IS convention).",
                    "Section of sphere: always a circle (great circle)."
                ]
            },
            procedure: [
                "Given a solid (prism, pyramid, cylinder, cone, sphere) and a cutting plane, determine: 1) The FV showing the cutting plane. 2) The true shape of the section.",
                "For a cylinder cut by an oblique plane: section is an ellipse — find major and minor axes.",
                "For a cone cut at various angles: identify the conic section type (circle, ellipse, parabola, hyperbola).",
                "Draw the sectional FV (hatched section area); draw true shape of section on the section plane.",
                "Add section plane symbol (A-A, B-B) and arrowheads indicating viewing direction."
            ],
            vivaQuestions: [
                { q: "What is a section of a solid in engineering drawing?", a: "A section is an imaginary cut through a solid by a cutting plane to reveal internal features that would otherwise be hidden. The cut surface (cross-section) is shown with 45° diagonal hatching. Sectional views are essential for showing complex internal geometry (holes, recesses, cores)." },
                { q: "What conic section is obtained when a cone is cut parallel to its slant edge?", a: "Parabola. This is because when the cutting plane is parallel to exactly one generator (slant edge), the eccentricity equals 1 — defining a parabola. Cone cut parallel to base → circle. Oblique cut (not through apex, not parallel to generator) → ellipse. Cut parallel to axis → hyperbola." },
                { q: "What is the difference between full section and half section?", a: "Full section: cutting plane passes completely through the entire solid — the entire interior is revealed. Half section: cutting plane cuts only half the object (along a plane of symmetry) — one half shows the exterior, the other shows the interior. Advantageous for symmetric objects as it conveys both exterior and interior in one view." },
                { q: "Why are ribs and webs typically not hatched in sectional views?", a: "Ribs (support bracing features), webs (thin connecting plates), and shafts are not hatched in section even when cut by the cutting plane. This IS convention (ISO standard) prevents misinterpretation — hatching these thin features would make them look like solid material blocks, misrepresenting their structural function." }
            ]
        },
        {
            id: 8, name: "Development of Surfaces",
            theory: {
                formulas: [
                    "Cylinder total surface area: 2πrh + 2πr² (lateral: 2πrh = πDh)",
                    "Cone lateral surface area: πrl (l = slant height = √(h²+r²))",
                    "Prism lateral surface area: perimeter of base × height"
                ],
                importantTopics: [
                    "Development: unrolling/unfolding the 3D surface onto a flat 2D plane — used for sheet metal work, packaging.",
                    "Parallel line development: for prisms and cylinders (generators/edges are parallel).",
                    "Radial line development: for pyramids and cones (generators meet at apex).",
                    "Triangulation development: for transition pieces (non-developable doubly-curved surfaces approximated).",
                    "Oblique cone/cylinder: development is more complex — use true lengths of generators."
                ],
                usefulPoints: [
                    "Line length on development must be TRUE LENGTH — use auxiliary view to find true lengths of oblique edges.",
                    "Applications: HVAC ducts, pipework, tin cans, cardboard boxes, funnels, hoppers.",
                    "Seam (joining edge): should be shortest edge for economy.",
                    "Add extra material for seam/flap if needed in actual fabrication."
                ]
            },
            procedure: [
                "Cylinder: Unroll the lateral surface into a rectangle (length = πD, height = H). Add top and bottom circles.",
                "Cone (radial line development): Draw a sector of radius l (slant height) and arc length = πD (base circumference). Angle θ = (r/l) × 360°.",
                "Square Prism: Lay out four rectangles (one for each face) in a row; add top and bottom squares.",
                "Truncated Cone (cut by oblique plane): Find true lengths of generators using FV. Draw development using radial method with varying generator lengths.",
                "Funnel/transition piece: Use triangulation development to approximate the non-planar surface."
            ],
            vivaQuestions: [
                { q: "What is development of a surface?", a: "Development (layout/stretchout) is the process of unfolding the outer surface of a 3D object onto a flat 2D plane without distortion. It is used in sheet metal fabrication, packaging, and HVAC ductwork to determine the flat shape to cut and fold/roll into the 3D object." },
                { q: "Distinguish between parallel line and radial line development.", a: "Parallel line development: used for prisms and cylinders — generators (edges/elements) are parallel. Surface is unrolled by laying generators side by side. Radial line development: used for pyramids and cones — generators (slant edges/elements) meet at a point (apex). Surface is unrolled as sectors from the apex." },
                { q: "Why must true lengths be used in development?", a: "The development must represent the actual surface dimensions accurately — any distortion would result in a part that doesn't fit correctly when fabricated. Projected lengths in FV or TV are foreshortened (shorter than actual) for edges inclined to the projection plane. True lengths (from rotation or auxiliary view) must be used." },
                { q: "What angle does the cone development sector subtend?", a: "The development of a cone is a sector of radius l (slant height). The arc length of the sector equals the base circumference πD. Angle of sector θ = (arc length / radius) in radians = πD/l radians = (D/l) × 360° = (r/l) × 360° in degrees." }
            ]
        },
        {
            id: 9, name: "Isometric Drawing",
            theory: {
                formulas: [
                    "Isometric scale: actual × cos 30° / cos 45° = actual × 0.816",
                    "Isometric axes: three mutually at 30° to horizontal (120° apart)"
                ],
                importantTopics: [
                    "Isometric drawing: 3D representation using three axes all at 30° to the horizontal and 120° apart.",
                    "Isometric line: parallel to one of the three principal isometric axes — can be measured directly.",
                    "Non-isometric line: not parallel to any axis — cannot be directly measured; draw from endpoints.",
                    "Isometric drawing uses the isometric scale (0.816 × true length) — but in practice, drawings are usually made using actual dimensions and called 'isometric drawings' (slightly enlarged vs isometric projection).",
                    "Circles in isometric: appear as ellipses — drawn using the four-centre (approximate) method."
                ],
                usefulPoints: [
                    "Isometric projection vs isometric drawing: projection uses isometric scale (foreshortened ~82%); drawing uses full true lengths (larger, for ease).",
                    "An isometric box/enclosing box method: draw the bounding box first, then locate features.",
                    "Curved surfaces: identify enclosing rectangles and draw corresponding ellipses.",
                    "Hidden lines are usually omitted in isometric drawings."
                ]
            },
            procedure: [
                "Set up isometric axes: two at 30° left and right of horizontal, one vertical.",
                "Draw isometric drawing of simple objects: cube, rectangular block, prism, L-shape.",
                "Four-centre method for ellipse: draw an isometric square (rhombus); perpendicular bisectors of sides intersect at 4 arc centres. Draw 4 arcs.",
                "Draw object with a cylindrical hole using the four-centre ellipse method.",
                "Draw an isometric drawing (full-scale) and an isometric projection (isometric scale)."
            ],
            vivaQuestions: [
                { q: "What is isometric projection and what are the isometric axes?", a: "Isometric projection is an axonometric projection where the three principal axes are equally inclined to the projection plane (at 35.26°). All three axes appear at 120° to each other in the drawing: two at 30° to horizontal and one vertical. All principal edges are equally foreshortened (to 0.816 of true length)." },
                { q: "What is the difference between isometric drawing and isometric projection?", a: "Isometric projection: uses the isometric scale (0.816× true length) — geometrically correct but smaller. Isometric drawing: uses actual dimensions directly on the isometric axes — easier to draw, slightly larger (1/0.816 ≈ 1.22× the projection). In practice, isometric drawings are more commonly used since the scale difference doesn't affect shape interpretation." },
                { q: "How is a circle represented in an isometric drawing?", a: "A circle appears as an ellipse in an isometric drawing. The approximate four-centre method: draw an isometric square (rhombus) of side = diameter. Draw perpendicular bisectors of each side — they intersect at 4 points. Using these as arc centres (two larger, two smaller), draw 4 circular arcs that join tangentially to form the approximate ellipse." }
            ]
        },
        {
            id: 10, name: "Dimensioning, Tolerances and Limits — Reading an Engineering Drawing",
            theory: {
                formulas: [
                    "Tolerance = Upper limit − Lower limit",
                    "Basic shaft H7/h6: H7 = hole tolerance grade 7; h6 = shaft tolerance grade 6",
                    "Clearance fit: shaft max < hole min. Interference fit: shaft min > hole max."
                ],
                importantTopics: [
                    "Dimensioning rules: each dimension once only, dimension fully, no duplication; dimension outside the drawing wherever possible.",
                    "Dimension line: thin line with arrowheads. Extension/projection lines: extend from object to dimension line.",
                    "Angular dimensions: shown with arc dimension line.",
                    "Limit system: Basic size (nominal), Tolerance (allowable variation), Upper deviation, Lower deviation.",
                    "Fits: Clearance (always clearance), Interference (always interference), Transition (may be either).",
                    "Surface finish symbols: Ra (arithmetic mean roughness). Machining symbol (√) in old IS; new: circle with lines."
                ],
                usefulPoints: [
                    "IS:919 — Limits, fits, and tolerances. Fundamental deviation letter + grade number = tolerance zone (e.g., H7).",
                    "Hole-basis system (preferred): H (holes) fundamental deviation = 0. Shaft varies.",
                    "Shaft-basis system: h (shafts) fundamental deviation = 0. Hole varies.",
                    "Geometric tolerances (GD&T): flatness, straightness, roundness, parallelism, perpendicularity, position, run-out — shown in rectangular feature control frames."
                ]
            },
            procedure: [
                "Study the IS drawing standards for dimensioning (IS:11669 — Guidelines for indicating surface texture).",
                "From a given engineering drawing, identify: basic size, upper deviation, lower deviation, tolerance, upper limit, lower limit for each dimension.",
                "Determine the type of fit (clearance, interference, transition) from shaft and hole tolerance zones.",
                "Calculate tolerance: T = EU − EL. Identify which part could be made easier to machine.",
                "Read surface finish symbols and interpret Ra values for machining method selection.",
                "Draw a dimensioned orthographic view (3 views) of a simple component with tolerances and surface finish noted."
            ],
            vivaQuestions: [
                { q: "What is the difference between 'limit' and 'tolerance' in a dimension?", a: "Limits are the extreme permissible sizes of a part: Upper Limit (UL) = maximum acceptable dimension; Lower Limit (LL) = minimum acceptable dimension. Tolerance = UL − LL = total permissible variation in size. A smaller tolerance means higher precision (more expensive machining)." },
                { q: "Explain clearance fit, interference fit, and transition fit.", a: "Clearance fit: shaft is always smaller than hole — there is always a gap (clearance) between them. Used for sliding/rotating parts. Example: H7/f7. Interference fit: shaft is always larger than hole — assembly requires force; parts are locked. Used for permanent joints. Example: H7/p6. Transition fit: tolerance zones overlap — may result in clearance or interference depending on actual sizes. Example: H7/k6." },
                { q: "What is GD&T?", a: "Geometric Dimensioning and Tolerancing (GD&T) is a system that specifies engineering tolerances on geometric characteristics (form, orientation, location, run-out) using standardised symbols in feature control frames. Goes beyond simple size tolerances to precisely control the 3D geometry of a part for functional assembly." },
                { q: "What is the hole-basis system?", a: "In the hole-basis system (preferred IS system), the basic hole (H) has its lower deviation at zero (H tolerance zone starts at the nominal size). Different fits are obtained by changing the shaft tolerance zone. Preferred because holes are harder to adjust after machining; changing the shaft (external feature) is easier." }
            ]
        }
    ]
};

export default engineeringDrawingViva;
