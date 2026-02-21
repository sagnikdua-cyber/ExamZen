// Others Section — Study Material + Sample Questions
// Physical Education, Soft Skills, Japanese, French

export interface StudySection {
    title: string;
    content: string; // markdown-like text
}

export interface SampleQuestion {
    id: number;
    topic: string;
    question: string;
    options: [string, string, string, string];
    answer: number;
    explanation: string;
}

export interface OthersSubjectData {
    slug: string;
    name: string;
    short: string;
    color: string;
    bg: string;
    border: string;
    description: string;
    studyMaterial: StudySection[];
    sampleQuestions: SampleQuestion[];
}

// ─── PHYSICAL EDUCATION ───────────────────────────────────────────────────────
const physicalEducation: OthersSubjectData = {
    slug: "physical-education",
    name: "Physical Education",
    short: "PE",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    description: "Yoga (Asanas, Pranayama & Meditation) and Karate-Do (Kihon techniques and competition rules).",
    studyMaterial: [
        {
            title: "Yoga — Theory",
            content: `**Meaning of Yoga**
The word "Yoga" comes from the Sanskrit root "Yuj" meaning to unite or to join. It is a spiritual, mental, and physical discipline originating in ancient India. Yoga unites the individual self (Atma) with the universal consciousness.

**Importance of Asana**
• Asanas (physical postures) improve flexibility, strength, and posture.
• They stimulate internal organs and improve blood circulation.
• Regular practice reduces stress and improves concentration.
• Helps maintain a healthy body weight and metabolism.

**Importance of Pranayama**
• Pranayama = Prana (life force / breath) + Ayama (control).
• Controls breathing patterns to regulate energy flow.
• Benefits: improves lung capacity, reduces anxiety, purifies blood.
• Major pranayamas: Anulom-Vilom, Kapalbhati, Bhastrika, Bhamri.

**Importance of Meditation**
• Meditation trains attention and awareness for mental clarity.
• Types: Breathe Awareness, Mantra Meditation, Progressive Relaxation, Focused Meditation.
• Benefits: reduces cortisol (stress hormone), improves focus, promotes emotional health.`
        },
        {
            title: "Yoga — Key Asanas",
            content: `**Sitting Poses**
• Gomukhasana — Cow-face pose; stretches hips and shoulders.
• Ardha-Matsyendrasana — Half spinal twist; improves spine flexibility.
• Janusirasana — Head-to-knee forward bend; stretches hamstrings.
• Trikonasana — Triangle pose; strengthens legs and stretches torso.
• Naukasana — Boat pose; strengthens core and hip flexors.

**Lying Poses (Supine)**
• Halasana — Plow pose; stretches spine and shoulders.
• Sarvangasana — Shoulder stand; stimulates thyroid gland.
• Pavanamuktasana — Wind-relieving pose; aids digestion.
• Setubandhasana — Bridge pose; stretches chest, neck and spine.
• Matsyasana — Fish pose; stretches chest and neck.

**Prone Poses**
• Bhujangasana — Cobra pose; strengthens spine and opens chest.
• Ustrasana — Camel pose; stretches the entire front of the body.
• Adho Mukha Svanasana — Downward Dog; full body stretch.
• Salvasana — Locust pose; strengthens back muscles.

**Standing Poses**
• Utkatasana — Chair pose; strengthens thighs and ankles.
• Vrikshasana — Tree pose; improves balance and concentration.
• Virabhadrasana — Warrior pose; builds strength and stamina.
• Garudasana — Eagle pose; improves balance and focus.
• Tadasana — Mountain pose; improves posture and grounding.

**Pranayama Techniques**
| Pranayama | Method | Benefit |
|---|---|---|
| Anulom-Vilom | Alternate nostril breathing | Balances left/right brain |
| Kapalbhati | Forceful exhalation | Cleanses respiratory tract |
| Bhastrika | Bellows breath (rapid in/out) | Energises body |
| Sheetkari | Inhale through teeth | Cools the body |
| Bhamri | Humming bee breath | Reduces anxiety |
| Samavritti | Equal ratio breathing | Calms nervous system |`
        },
        {
            title: "Karate-Do — Theory",
            content: `**Meaning of Karate-Do**
"Karate" = Kara (empty) + Te (hand). "Do" = way/path. Literally: "The Way of the Empty Hand." It is a martial art that uses strikes, kicks, and blocks without weapons. It emphasises discipline, respect, and self-improvement.

**History of Karate-Do**
• Originated in Okinawa, Japan, influenced by Chinese martial arts (Kung Fu).
• Gichin Funakoshi brought it to mainland Japan in 1922 and founded Shotokan Karate.
• Became an Olympic sport at Tokyo 2020 (first time).

**Karate as a Sport in Olympics**
• Included in Tokyo 2020 Olympics; features Kata (forms) and Kumite (sparring).
• Governed by World Karate Federation (WKF).
• Scoring: Yuko (1 pt), Waza-ari (2 pts), Ippon (3 pts).

**Karate Stances (Dachi)**
| Stance | Description |
|---|---|
| Heisoku-dachi | Closed feet stance |
| Musubi-dachi | V-stance |
| Heiko-dachi | Parallel stance |
| Shizentai | Natural / normal feet stance |
| Zenkutsu-dachi | Forward leaning stance |
| Kiba-dachi | Sumo/square feet stance |
| Kokutsu-dachi | Backward leaning stance |
| Neko-ashi-dachi | Cat stance |

**Basic Techniques (Kihon)**
• Punch (Zuki): Face Level (Jodan), Middle/Stomach (Chudan), 3-Level Consecutive, Back Fist.
• Strike (Uchi): Open Hand Strike, Knife Hand Strike, Front Elbow Strike.
• Kick (Geri): Front Kick (Mae Geri), Round Kick (Mawashi Geri), Side Kick (Yoko Geri), Back Leg Kick.
• Block (Uke): Middle Level (Chudan Uke), Lower Level (Gedan Barai), Open Hand Block, Knife-Hand Block.`
        }
    ],
    sampleQuestions: [
        { id: 1, topic: "Yoga", question: "The word 'Yoga' is derived from the Sanskrit root 'Yuj' which means:", options: ["To stretch", "To unite", "To breathe", "To meditate"], answer: 1, explanation: "'Yuj' in Sanskrit means to unite or join — yoga unites the individual self with universal consciousness." },
        { id: 2, topic: "Yoga", question: "Which pranayama involves alternate nostril breathing?", options: ["Kapalbhati", "Bhastrika", "Anulom-Vilom", "Bhamri"], answer: 2, explanation: "Anulom-Vilom is the alternate nostril breathing technique — breathe in from one nostril, out from the other. It balances the brain hemispheres." },
        { id: 3, topic: "Yoga", question: "Sarvangasana is known as the 'Queen of Asanas'. Which body part does it primarily stimulate?", options: ["Liver", "Thyroid gland", "Kidneys", "Heart"], answer: 1, explanation: "Sarvangasana (Shoulder Stand) puts pressure on the throat region and stimulates the thyroid gland, improving metabolism." },
        { id: 4, topic: "Yoga", question: "Kapalbhati pranayama mainly involves:", options: ["Slow inhalation only", "Forceful exhalation with passive inhalation", "Equal ratio breathing", "Humming sound during breathing"], answer: 1, explanation: "Kapalbhati = forceful, rapid exhalations with passive inhalations. It cleanses the respiratory tract and energises the mind." },
        { id: 5, topic: "Yoga", question: "Which asana is also called the 'Boat Pose'?", options: ["Halasana", "Naukasana", "Bhujangasana", "Ustrasana"], answer: 1, explanation: "Naukasana = Nauka (boat) + asana. The body forms a V-shape like a boat, strengthening the core and hip flexors." },
        { id: 6, topic: "Karate-Do", question: "What does 'Karate-Do' literally mean?", options: ["Way of the Sword", "Way of the Empty Hand", "Way of the Peaceful Mind", "Way of Discipline"], answer: 1, explanation: "Karate = Kara (empty) + Te (hand). Do = path/way. So Karate-Do = 'The Way of the Empty Hand', meaning fighting without weapons." },
        { id: 7, topic: "Karate-Do", question: "Karate made its Olympic debut at which games?", options: ["Rio 2016", "London 2012", "Tokyo 2020", "Paris 2024"], answer: 2, explanation: "Karate was introduced as an Olympic sport at the Tokyo 2020 Olympics (held in 2021), featuring Kata and Kumite events." },
        { id: 8, topic: "Karate-Do", question: "What is the Japanese term for 'Front Kick' in Karate?", options: ["Mawashi Geri", "Yoko Geri", "Mae Geri", "Ura Geri"], answer: 2, explanation: "Mae Geri is the front kick. Mawashi Geri = round/roundhouse kick, Yoko Geri = side kick." },
        { id: 9, topic: "Karate-Do", question: "Zenkutsu-dachi is which type of karate stance?", options: ["Backward leaning stance", "Cat stance", "Forward leaning stance", "Parallel stance"], answer: 2, explanation: "Zenkutsu-dachi = forward leaning stance, where the front knee is bent and body weight leans forward. Used for attacking." },
        { id: 10, topic: "Karate-Do", question: "In WKF competition, how many points is an 'Ippon' worth?", options: ["1", "2", "3", "5"], answer: 2, explanation: "In WKF scoring: Yuko=1 point, Waza-ari=2 points, Ippon=3 points. Ippon is typically scored for kicks to the head or throwing techniques." },
    ]
};

// ─── SOFT SKILLS ──────────────────────────────────────────────────────────────
const softSkills: OthersSubjectData = {
    slug: "soft-skills",
    name: "Soft Skills",
    short: "SS",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    description: "Communication, body language, life skills, and corporate skills for professional excellence.",
    studyMaterial: [
        {
            title: "Module 1 — Communication Skills",
            content: `**Introduction to Soft Skills vs Hard Skills**
• Hard Skills: Technical, measurable abilities (coding, maths, engineering).
• Soft Skills: Interpersonal, social abilities (communication, teamwork, empathy).
• Both are required for professional success; soft skills enable you to use hard skills effectively.

**Importance and Purpose of Communication**
• Communication is the process of exchanging information, ideas, and feelings.
• Purpose: inform, persuade, entertain, and build relationships.
• 7 C's of Communication: Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous.

**Inter-cultural and Cross-cultural Communication**
• Inter-cultural: communication between people of different cultures.
• Cross-cultural: comparing communication styles across cultures.
• Key nuances: directness vs indirectness, eye contact norms, personal space, hierarchy.

**Building Rapport**
• Rapport = a close and harmonious relationship in which people understand each other.
• Techniques: active listening, using the person's name, mirroring body language, finding common ground.
• Trust is the foundation of all professional relationships.`
        },
        {
            title: "Module 2 — Body Language & Basic Etiquettes",
            content: `**Body Language**
• 55% of communication is body language, 38% is tone of voice, 7% is words (Mehrabian's rule).
• Positive signals: open posture, firm handshake, eye contact, nodding.
• Negative signals: crossed arms, avoiding eye contact, fidgeting, slouching.
• Mirroring: subtly matching another person's body language builds trust.

**Basic Etiquettes**
• Professional etiquette: punctuality, formal attire, respectful greeting.
• Dining etiquette: proper use of cutlery, not speaking with mouth full, phone-free meals.
• Digital etiquette (Netiquette): professional email tone, timely replies, no ALL CAPS.

**Emotional Intelligence (EQ)**
• EQ = ability to understand and manage your own emotions, and recognise emotions in others.
• 5 components (Goleman): Self-awareness, Self-regulation, Motivation, Empathy, Social skills.
• High EQ → better teamwork, leadership, and conflict resolution.

**Interpersonal Skills**
• Active Listening: give full attention, don't interrupt, paraphrase to confirm understanding.
• Assertiveness: express needs/opinions confidently without being aggressive or passive.
• Feedback: constructive feedback uses the sandwich method (positive → improve → positive).`
        },
        {
            title: "Module 3 — Life Skills",
            content: `**Critical Thinking Skills**
• Definition: objective analysis and evaluation of information to form a judgement.
• Steps: Identify the problem → Gather information → Analyse alternatives → Choose best solution.
• Avoid: confirmation bias, logical fallacies, emotional reasoning.

**Problem-Solving Skills**
• PDCA Cycle: Plan → Do → Check → Act (continuous improvement model).
• 5 Whys technique: ask "why" five times to reach root cause.
• Brainstorming: generate as many ideas as possible without judgement first.

**Conflict Resolution Skills**
• 5 styles: Competing, Collaborating, Compromising, Avoiding, Accommodating.
• Win-Win: Collaborating style = best long-term outcome.
• Steps: Listen fully → acknowledge feelings → find common ground → agree on solution.

**Employability Skills**
• Resume writing: tailor to each job, highlight achievements with numbers.
• Interview skills: STAR method (Situation, Task, Action, Result).
• Professional networking: LinkedIn profile, informational interviews.`
        },
        {
            title: "Module 4 — Corporate Skills",
            content: `**Collaborative & Teamwork Skills**
• Forming → Storming → Norming → Performing → Adjourning (Tuckman's stages).
• Effective team: clear roles, shared goals, open communication, mutual trust.

**Negotiation Skills**
• BATNA: Best Alternative To a Negotiated Agreement — know your walkaway point.
• Principled negotiation: focus on interests, not positions (Win-Win).
• Tactics: active listening, asking open questions, silence is power.

**Presentation Skills**
• Structure: Hook → Tell them what you'll tell them → Tell them → Tell them what you told them.
• Delivery: confident posture, steady eye contact, varied pace, avoid filler words (um, uh).
• Slides: 1 idea per slide, minimal text, high-quality visuals.

**Stress & Time Management**
• Eisenhower Matrix: Urgent+Important → Do Now; Important+Not Urgent → Schedule; Urgent+Not Important → Delegate; Neither → Delete.
• Pomodoro Technique: 25 min focused work + 5 min break.
• Stress management: deep breathing, exercise, journaling, talking to someone.

**Work Ethics & Telephonic Etiquette**
• Work Ethics: punctuality, accountability, integrity, professionalism.
• Phone etiquette: answer within 3 rings, introduce yourself, speak clearly, don't put on hold without asking, end politely.

**Leadership Styles**
| Style | Description | Best For |
|---|---|---|
| Autocratic | Leader decides alone | Crisis situations |
| Democratic | Team participates in decisions | Creative teams |
| Laissez-faire | Leader gives full autonomy | Expert teams |
| Transformational | Inspires & motivates change | Innovation-driven orgs |`
        }
    ],
    sampleQuestions: [
        { id: 1, topic: "Communication", question: "According to Mehrabian's Rule, what percentage of communication is conveyed through body language?", options: ["7%", "38%", "55%", "70%"], answer: 2, explanation: "Mehrabian's rule states: 55% body language, 38% tone of voice, and only 7% words. Non-verbal communication dominates." },
        { id: 2, topic: "Communication", question: "Which of the following is NOT one of the 7 C's of Communication?", options: ["Clear", "Concise", "Creative", "Correct"], answer: 2, explanation: "The 7 C's are: Clear, Concise, Concrete, Correct, Coherent, Complete, Courteous. 'Creative' is not part of this framework." },
        { id: 3, topic: "Emotional Intelligence", question: "Which component of Emotional Intelligence involves recognising emotions in others and responding appropriately?", options: ["Self-awareness", "Motivation", "Empathy", "Self-regulation"], answer: 2, explanation: "Empathy = the ability to recognise and understand the emotions of others. It is a cornerstone of strong interpersonal skills." },
        { id: 4, topic: "Life Skills", question: "The STAR method in interviews stands for:", options: ["Skill, Task, Achievement, Result", "Situation, Task, Action, Result", "Strength, Test, Analysis, Review", "Strategy, Target, Action, Report"], answer: 1, explanation: "STAR = Situation (context) → Task (your responsibility) → Action (what you did) → Result (outcome). Ideal for answering behavioural questions." },
        { id: 5, topic: "Corporate Skills", question: "In the Eisenhower Matrix, tasks that are Important but NOT Urgent should be:", options: ["Done immediately", "Scheduled for later", "Delegated", "Deleted"], answer: 1, explanation: "Important but not urgent tasks (e.g., long-term planning, studying) should be Scheduled — they are key to long-term success." },
        { id: 6, topic: "Corporate Skills", question: "BATNA in negotiation stands for:", options: ["Best Approach To Negotiated Agreement", "Best Alternative To a Negotiated Agreement", "Basic Attitudes Toward Negotiation Analysis", "Balanced Approach To Negotiated Aims"], answer: 1, explanation: "BATNA = Best Alternative To a Negotiated Agreement — it is your fallback position if the negotiation fails. Knowing your BATNA gives you power." },
        { id: 7, topic: "Communication", question: "Which is the correct sequence of Tuckman's team development model?", options: ["Forming→Norming→Storming→Performing", "Forming→Storming→Norming→Performing", "Storming→Forming→Norming→Performing", "Performing→Forming→Norming→Storming"], answer: 1, explanation: "Tuckman's model: Forming (orientation) → Storming (conflict) → Norming (cohesion) → Performing (productivity) → Adjourning (closure)." },
        { id: 8, topic: "Conflict Resolution", question: "The 'Win-Win' conflict resolution style corresponds to:", options: ["Competing", "Avoiding", "Accommodating", "Collaborating"], answer: 3, explanation: "Collaborating = both parties work together to find a solution that fully satisfies everyone. This is the Win-Win approach." },
        { id: 9, topic: "Corporate Skills", question: "The Pomodoro Technique involves working for:", options: ["15 min then 10 min break", "25 min then 5 min break", "45 min then 15 min break", "60 min then 20 min break"], answer: 1, explanation: "Pomodoro: 25 minutes of focused work → 5-minute break → repeat. After 4 cycles, take a longer 15-30 minute break." },
        { id: 10, topic: "Critical Thinking", question: "The '5 Whys' technique is used to:", options: ["Generate new ideas", "Find the root cause of a problem", "Present solutions to stakeholders", "Analyse market competitors"], answer: 1, explanation: "5 Whys: ask 'Why?' five consecutive times. Each answer forms the basis of the next question, drilling down to the root cause of a problem." },
    ]
};

// ─── JAPANESE ─────────────────────────────────────────────────────────────────
const japanese: OthersSubjectData = {
    slug: "japanese",
    name: "Japanese",
    short: "JPN",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    description: "Beginner Japanese for 1st year students — Hiragana, greetings, numbers, and everyday conversation.",
    studyMaterial: [
        {
            title: "Unit 1 — Japanese Scripts",
            content: `**Three Writing Systems**
| Script | Usage | Example |
|---|---|---|
| Hiragana | Japanese native words | あ (a), か (ka), さ (sa) |
| Katakana | Foreign/loanwords | コーヒー (kōhī = coffee) |
| Kanji | Chinese-origin characters | 日 (sun/day), 本 (origin/book) |

**Hiragana Vowels (α-line)**
あ (a) い (i) う (u) え (e) お (o)

**Core Hiragana Table**
| | a | i | u | e | o |
|---|---|---|---|---|---|
| K | か | き | く | け | こ |
| S | さ | し | す | せ | そ |
| T | た | ち | つ | て | と |
| N | な | に | ぬ | ね | の |
| H | は | ひ | ふ | へ | ほ |
| M | ま | み | む | め | も |
| Y | や | - | ゆ | - | よ |
| R | ら | り | る | れ | ろ |
| W | わ | - | - | - | を |
| N | ん | | | | |`
        },
        {
            title: "Unit 2 — Greetings & Basic Expressions",
            content: `**Essential Greetings**
| Japanese | Romaji | Meaning |
|---|---|---|
| おはようございます | Ohayou gozaimasu | Good morning (formal) |
| こんにちは | Konnichiwa | Hello / Good afternoon |
| こんばんは | Konbanwa | Good evening |
| さようなら | Sayounara | Goodbye |
| ありがとうございます | Arigatou gozaimasu | Thank you (formal) |
| すみません | Sumimasen | Excuse me / Sorry |
| はい / いいえ | Hai / Iie | Yes / No |
| わかりました | Wakarimashita | I understand |
| わかりません | Wakarimasen | I don't understand |
| もういちどいってください | Mou ichido itte kudasai | Please say it again |

**Self-Introduction (Jikoshoukai)**
• わたしは [Name] です。 → Watashi wa [Name] desu. → I am [Name].
• [University] のがくせいです。 → I am a student of [University].
• よろしくおねがいします。 → Yoroshiku onegaishimasu. → Nice to meet you.`
        },
        {
            title: "Unit 3 — Numbers, Time & Days",
            content: `**Numbers (1–20)**
| Number | Romaji |  |Number | Romaji |
|---|---|---|---|---|
| 1 = いち | ichi | | 11 = じゅういち | juuichi |
| 2 = に | ni | | 12 = じゅうに | juuni |
| 3 = さん | san | | 13 = じゅうさん | juusan |
| 4 = し/よん | shi / yon | | 14 = じゅうし | juushi |
| 5 = ご | go | | 15 = じゅうご | juugo |
| 6 = ろく | roku | | 20 = にじゅう | nijuu |
| 7 = しち/なな | shichi / nana | | 30 = さんじゅう | sanjuu |
| 8 = はち | hachi | | 100 = ひゃく | hyaku |
| 9 = きゅう | kyuu | | 1000 = せん | sen |
| 10 = じゅう | juu |

**Days of the Week**
| Japanese | Romaji | Day |
|---|---|---|
| げつようび | Getsuyoubi | Monday |
| かようび | Kayoubi | Tuesday |
| すいようび | Suiyoubi | Wednesday |
| もくようび | Mokuyoubi | Thursday |
| きんようび | Kin'youbi | Friday |
| どようび | Doyoubi | Saturday |
| にちようび | Nichiyoubi | Sunday |

**Telling Time**
• ~じ (ji) = o'clock | ~ふん/ぷん (fun/pun) = minutes
• いまなんじですか？ → Ima nanji desu ka? → What time is it now?
• さんじごふんです → Sanji gofun desu → It is 3:05.`
        },
        {
            title: "Unit 4 — Basic Sentences & Classroom",
            content: `**Sentence Structure: Subject は Object です**
• Japanese is SOV (Subject-Object-Verb), unlike English (SVO).
• は (wa) = topic marker | を (wo) = object marker | が (ga) = subject marker

**Classroom Phrases**
| Japanese | Meaning |
|---|---|
| もういちどいってください | Please say it once more |
| ゆっくりはなしてください | Please speak slowly |
| これはなんですか？ | What is this? |
| トイレはどこですか？ | Where is the toilet? |
| しつもんがあります | I have a question |

**Common Verbs (Polite -masu form)**
| Verb | Romaji | Meaning |
|---|---|---|
| たべます | tabemasu | to eat |
| のみます | nomimasu | to drink |
| いきます | ikimasu | to go |
| きます | kimasu | to come |
| みます | mimasu | to see/watch |
| かきます | kakimasu | to write |
| よみます | yomimasu | to read |
| ねます | nemasu | to sleep |`
        }
    ],
    sampleQuestions: [
        { id: 1, topic: "Greetings", question: "How do you say 'Good morning' (formal) in Japanese?", options: ["Konnichiwa", "Konbanwa", "Ohayou gozaimasu", "Sayounara"], answer: 2, explanation: "Ohayou gozaimasu (おはようございます) = Good morning (formal). 'Ohayou' alone is informal. Konnichiwa = Good afternoon, Konbanwa = Good evening." },
        { id: 2, topic: "Numbers", question: "What is 'じゅうさん' in numerals?", options: ["30", "13", "103", "23"], answer: 1, explanation: "じゅう (juu) = 10, さん (san) = 3. Together, じゅうさん (juusan) = 13." },
        { id: 3, topic: "Script", question: "Which Japanese script is used for loanwords and foreign names?", options: ["Hiragana", "Kanji", "Katakana", "Romaji"], answer: 2, explanation: "Katakana is used for loanwords (e.g., コーヒー = kōhī = coffee, テレビ = terebi = TV) and foreign names." },
        { id: 4, topic: "Basic Sentences", question: "How do you say 'I am a student' in Japanese?", options: ["わたしはせんせいです", "わたしはがくせいです", "わたしはにほんじんです", "わたしはいしゃです"], answer: 1, explanation: "がくせい (gakusei) = student. わたしはがくせいです = Watashi wa gakusei desu = I am a student." },
        { id: 5, topic: "Days", question: "What is 'Wednesday' in Japanese?", options: ["げつようび", "かようび", "すいようび", "もくようび"], answer: 2, explanation: "すいようび (Suiyoubi) = Wednesday. The days follow planetary elements: 水 (sui) = water = Wednesday." },
        { id: 6, topic: "Greetings", question: "What does 'Sumimasen' (すみません) mean?", options: ["Thank you", "Goodbye", "Excuse me / Sorry", "Good night"], answer: 2, explanation: "Sumimasen is a very versatile phrase used to say 'Excuse me' (to get attention), 'Sorry' (apologise), or 'Thank you' (in some contexts)." },
        { id: 7, topic: "Verbs", question: "Which verb means 'to eat' in polite Japanese?", options: ["Nomimasu", "Tabemasu", "Ikimasu", "Mimasu"], answer: 1, explanation: "Tabemasu (たべます) = to eat. Nomimasu = to drink, Ikimasu = to go, Mimasu = to see." },
        { id: 8, topic: "Script", question: "Which script are the characters 日本 written in?", options: ["Hiragana", "Katakana", "Kanji", "Romaji"], answer: 2, explanation: "日本 = Nihon (Japan) is written in Kanji. 日 = sun/day, 本 = origin/book. Together they mean 'origin of the sun' = Japan." },
        { id: 9, topic: "Numbers", question: "How do you say 100 in Japanese?", options: ["じゅう", "ひゃく", "せん", "まん"], answer: 1, explanation: "ひゃく (hyaku) = 100. じゅう (juu) = 10, せん (sen) = 1000, まん (man) = 10,000." },
        { id: 10, topic: "Basic Sentences", question: "What does 'Wakarimasen' (わかりません) mean?", options: ["I understand", "I don't understand", "Please repeat", "I agree"], answer: 1, explanation: "Wakarimasen = I don't understand. The positive form 'Wakarimashita' (わかりました) = I understood / I understand now." },
    ]
};

// ─── FRENCH ───────────────────────────────────────────────────────────────────
const french: OthersSubjectData = {
    slug: "french",
    name: "French",
    short: "FRN",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Beginner French for 1st year students — pronunciation, greetings, numbers, and everyday phrases.",
    studyMaterial: [
        {
            title: "Unit 1 — Pronunciation & Alphabet",
            content: `**The French Alphabet**
French uses the same 26 letters as English but with different pronunciation and special characters.

**Special Characters (Diacritics)**
| Mark | Example | Name |
|---|---|---|
| é | été (summer) | Accent aigu |
| è | père (father) | Accent grave |
| ê | être (to be) | Accent circumflex |
| ç | garçon (boy/waiter) | Cédille |
| ë | Noël (Christmas) | Tréma |

**Key Pronunciation Rules**
• Final consonants are usually silent: "Paris" = "Pa-ri" (silent 's').
• H is always silent: "hôtel" = "oh-tel".
• Nasal vowels: 'an', 'en', 'in', 'on', 'un' are nasalised.
• Liaison: link the final consonant of one word to the vowel of the next: "les amis" = "lay-za-mee".
• 'R' is pronounced from the throat (uvular R).`
        },
        {
            title: "Unit 2 — Greetings & Introductions",
            content: `**Essential Greetings**
| French | Meaning |
|---|---|
| Bonjour | Good morning / Hello (formal) |
| Bonsoir | Good evening |
| Salut | Hi / Bye (informal) |
| Au revoir | Goodbye |
| Bonne nuit | Good night |
| Comment vous appelez-vous ? | What is your name? (formal) |
| Je m'appelle... | My name is... |
| Comment allez-vous ? | How are you? (formal) |
| Ça va ? | How are you? (informal) |
| Très bien, merci. | Very well, thank you. |
| S'il vous plaît | Please (formal) |
| Merci (beaucoup) | Thank you (very much) |
| De rien | You're welcome |
| Excusez-moi | Excuse me |
| Pardon | Sorry / Pardon |

**Self-Introduction**
• Je m'appelle Sagnik. → My name is Sagnik.
• J'ai 18 ans. → I am 18 years old.
• Je suis étudiant(e) en ingénierie. → I am an engineering student.
• Je suis indien(ne). → I am Indian.
• Enchanté(e). → Nice to meet you. (m/f)`
        },
        {
            title: "Unit 3 — Numbers, Time & Colours",
            content: `**Numbers 0–20**
| # | French | | # | French |
|---|---|---|---|---|
| 0 | zéro | | 11 | onze |
| 1 | un/une | | 12 | douze |
| 2 | deux | | 13 | treize |
| 3 | trois | | 14 | quatorze |
| 4 | quatre | | 15 | quinze |
| 5 | cinq | | 16 | seize |
| 6 | six | | 17 | dix-sept |
| 7 | sept | | 18 | dix-huit |
| 8 | huit | | 19 | dix-neuf |
| 9 | neuf | | 20 | vingt |
| 10 | dix | | 100 | cent |

**Days of the Week (Les Jours de la Semaine)**
lundi (Mon), mardi (Tue), mercredi (Wed), jeudi (Thu), vendredi (Fri), samedi (Sat), dimanche (Sun)

**Months: janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre**

**Colours**
rouge (red), bleu(e) (blue), vert(e) (green), jaune (yellow), noir(e) (black), blanc/blanche (white), orange (orange), rose (pink), violet(te) (purple)

**Telling Time**
• Quelle heure est-il ? → What time is it?
• Il est trois heures. → It is 3 o'clock.
• Il est midi / minuit. → It is noon / midnight.
• Il est trois heures et demie. → It is 3:30 (half past three).`
        },
        {
            title: "Unit 4 — Grammar Basics & Common Phrases",
            content: `**Articles (Determiners)**
| Type | Masculine | Feminine | Plural |
|---|---|---|---|
| Definite (the) | le | la | les |
| Indefinite (a/an) | un | une | des |

**Subject Pronouns & Être (to be)**
| Pronoun | Être | Translation |
|---|---|---|
| Je | suis | I am |
| Tu | es | You are (informal) |
| Il/Elle | est | He/She is |
| Nous | sommes | We are |
| Vous | êtes | You are (formal/plural) |
| Ils/Elles | sont | They are |

**Common Useful Phrases**
| French | English |
|---|---|
| Je ne comprends pas. | I don't understand. |
| Répétez, s'il vous plaît. | Please repeat. |
| Parlez plus lentement. | Speak more slowly. |
| Où est... ? | Where is... ? |
| Combien coûte... ? | How much does... cost? |
| Je voudrais... | I would like... |
| C'est combien ? | How much is it? |
| Je parle un peu français. | I speak a little French. |

**Negation**
• French negation: ne … pas wraps the verb.
• Je parle français. → Je ne parle pas français. (I don't speak French.)`
        }
    ],
    sampleQuestions: [
        { id: 1, topic: "Greetings", question: "Which French greeting is used in the evening?", options: ["Bonjour", "Salut", "Bonsoir", "Au revoir"], answer: 2, explanation: "Bonsoir = Good evening. Bonjour = Good morning/Hello (used during the day). Salut = informal Hi/Bye. Au revoir = Goodbye." },
        { id: 2, topic: "Numbers", question: "What is 'quatorze' in numerals?", options: ["4", "40", "14", "44"], answer: 2, explanation: "Quatorze = 14. quatre = 4, quarante = 40. The '-orze' suffix often appears in teens: onze(11), douze(12), treize(13), quatorze(14), quinze(15), seize(16)." },
        { id: 3, topic: "Grammar", question: "Which is the correct conjugation of 'être' for 'Nous' (We)?", options: ["sont", "êtes", "sommes", "est"], answer: 2, explanation: "Être: Je suis, Tu es, Il/Elle est, Nous sommes, Vous êtes, Ils/Elles sont. 'Nous sommes' = We are." },
        { id: 4, topic: "Greetings", question: "How do you say 'My name is Sagnik' in French?", options: ["Je suis Sagnik", "J'appelle Sagnik", "Je m'appelle Sagnik", "Mon nom est Sagnik"], answer: 2, explanation: "Je m'appelle = I call myself (reflexive verb 's'appeler'). This is the standard way to say your name in French. 'Mon nom est' is technically correct but uncommon in speech." },
        { id: 5, topic: "Grammar", question: "What is the feminine definite article in French?", options: ["le", "un", "la", "les"], answer: 2, explanation: "La = feminine definite article (the). Le = masculine, Les = plural. Un/Une are indefinite articles (a/an)." },
        { id: 6, topic: "Pronunciation", question: "In French, the final consonant of a word is usually:", options: ["Strongly pronounced", "Silent", "Aspirated", "Doubled"], answer: 1, explanation: "French generally does not pronounce final consonants. For example, 'Paris' is pronounced 'Pa-ri' (silent s). Exception: words ending in C, R, F, L (the 'CaReFuL' rule) are often pronounced." },
        { id: 7, topic: "Days", question: "What is 'Wednesday' in French?", options: ["mardi", "jeudi", "mercredi", "vendredi"], answer: 2, explanation: "mercredi = Wednesday. lundi=Mon, mardi=Tue, mercredi=Wed, jeudi=Thu, vendredi=Fri, samedi=Sat, dimanche=Sun." },
        { id: 8, topic: "Grammar", question: "How do you make a negative sentence in French?", options: ["Add 'non' before the verb", "Add 'pas' after the verb", "Wrap the verb with 'ne...pas'", "Use 'jamais' before the verb"], answer: 2, explanation: "French negation: ne + verb + pas. Example: Je parle → Je ne parle pas (I don't speak). Ne comes before the verb, pas after it." },
        { id: 9, topic: "Colours", question: "What does 'rouge' mean in English?", options: ["Blue", "Green", "Red", "Yellow"], answer: 2, explanation: "Rouge = Red. Bleu = Blue, Vert = Green, Jaune = Yellow, Noir = Black, Blanc = White." },
        { id: 10, topic: "Basic Phrases", question: "What does 'Je ne comprends pas' mean?", options: ["I don't speak French", "I don't understand", "I need help", "I am not ready"], answer: 1, explanation: "Je ne comprends pas = I don't understand. 'Comprendre' = to understand. 'Je comprends' = I understand; with 'ne...pas' it becomes negative." },
    ]
};

// ─── Master Export ────────────────────────────────────────────────────────────
export const othersData: Record<string, OthersSubjectData> = {
    "physical-education": physicalEducation,
    "soft-skills": softSkills,
    "japanese": japanese,
    "french": french,
};
