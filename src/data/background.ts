
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  readMore: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: "y-meadows",
    company: "Y Meadows",
    role: "Forward Deployed Engineer",
    period: "Jan 2026 – Present",
    location: "Remote",
    type: "Full Time",
    description:
      "Working across onboarding, integrations, and deployment readiness to help customers move from kickoff to production smoothly. Partnering closely with product and engineering to turn requirements into stable, repeatable implementations.",
    readMore: [
      "Owned configuration and validation of end-to-end customer onboarding workflows across internal systems and third-party integrations. Verified data mappings, permissions, and environment setup, and ran system and integration checks to ensure customers entered UAT fully prepared and deployments were reliable.",
      "Collaborated with product managers and engineers to break down customer requirements into clear technical tasks. Tracked dependencies in JIRA and aligned implementation work with customer context in Salesforce, identifying risks early and helping reduce time-to-go-live by roughly 20 percent.",
      "Maintained onboarding documentation, configuration checklists, and internal runbooks to keep implementations consistent and easy to hand off. Improved configuration tooling and templates to reduce manual errors, streamline deployments, and make ongoing support easier for downstream teams.",
    ],
    tech: ["Customer Onboarding", "Integrations", "JIRA", "Salesforce"],
  },
  {
    id: "qalienai",
    company: "QAlienAI",
    role: "Machine Learning Engineer Intern",
    period: "Oct 2025 – Feb 2026",
    location: "Remote",
    type: "Internship",
    description:
      "Led development of AI systems that evaluate marketing content for FTC and FDA compliance using LLMs, semantic similarity, and rule-based checks. Built multimodal classifiers and unified OCR/ASR pipelines to support platform-wide content intelligence.",
    readMore: [
      "Led development of AI systems that evaluate marketing content for FTC and FDA compliance using LLMs, semantic similarity, and rule-based checks. Worked with Claude 3.5 Sonnet and Gemini 2.5 Pro to deliver accurate, interpretable assessments. Built multimodal classifiers that distinguish user-generated from professional content.",
      "Developed multimodal content analysis capabilities using image, video, and audio processing through AWS Bedrock and Gemini Vision. Built a unified OCR and ASR pipeline with Gemini Vision and AssemblyAI for reliable text extraction across images, audio, and video. Implemented confidence scoring, fallback logic, and error handling for robust performance.",
      "Implemented semantic search with pgvector to retrieve regulatory guidance, generating embeddings, and tuning similarity search. Created a brand compliance analyzer powered by multiple LLM providers that produces structured evaluations of tone, vocabulary, layout, and visual identity with confidence scoring.",
      "Engineered end-to-end AI pipelines using Supabase Edge Functions, TypeScript, and Deno. Managed async workflows, job queues, and result aggregation for a scalable multi-tenant SaaS platform.",
    ],
    tech: ["LLMs", "AWS Bedrock", "Multimodal AI", "pgvector", "TypeScript"],
  },
  {
    id: "gallox",
    company: "Gallox Semiconductors",
    role: "Software Engineer Intern",
    period: "Nov 2024 – Jan 2025",
    location: "Remote",
    type: "Internship",
    description:
      "Built smart automation tools to test semiconductor power devices, helping engineers save time and get more accurate results. My work made it easier to spot issues early and sped up the overall testing process in the lab.",
    readMore: [
      "Architected comprehensive automation frameworks for semiconductor power device testing, streamlining characterization workflow for high-voltage MOSFETs and IGBTs. Built sophisticated real-time data visualization dashboard with multi-threaded data acquisition and automated anomaly detection, reducing manual debugging time by 40%.",
      "Developed robust testing protocols and quality assurance systems that improved device characterization accuracy and significantly reduced testing cycle times. Implemented advanced data processing algorithms to handle large-scale semiconductor datasets efficiently.",
    ],
    tech: ["Python", "Test Automation", "Hardware", "Data Visualization"],
  },
  {
    id: "cornell-cals",
    company: "Cornell CALS",
    role: "Student Research Assistant",
    period: "Aug 2024 – Dec 2024",
    location: "Ithaca, NY",
    type: "Research",
    description:
      "Explored how machine learning can help tackle climate change by analyzing greenhouse gas emissions from different crops. Built efficient tools to clean and process large amounts of geospatial data for sustainable agriculture strategies.",
    readMore: [
      "Engineered sophisticated ML pipelines to analyze large-scale agricultural GHG emission datasets, implementing advanced k-means clustering algorithms with custom distance metrics. Developed comprehensive Python-based ETL workflows using Pandas, NumPy, and GeoPandas to process and standardize geospatial crop emissions data from multiple sources.",
      "Conducted extensive data analysis to identify patterns in agricultural emissions and developed predictive models for sustainable farming practices. Collaborated with research teams to validate findings and contribute to climate change mitigation strategies through data-driven insights.",
    ],
    tech: ["Machine Learning", "GeoPandas", "Climate Tech", "Python"],
  },
  {
    id: "colentai",
    company: "ColentAI",
    role: "Software Developer Intern",
    period: "Jan 2024 – Mar 2024",
    location: "Remote",
    type: "Internship",
    description:
      "Worked on making generative AI models smarter and faster by fine-tuning how they learn. Built reliable pipelines to pull in diverse data from APIs which helped improve the quality of training datasets.",
    readMore: [
      "Optimized large language model performance through systematic hyperparameter tuning and advanced fine-tuning techniques. Conducted extensive API research and integration work, developing robust data acquisition pipelines.",
      "Built sophisticated automated skill taxonomy generator leveraging advanced NLP techniques including TF-IDF vectorization, NER, and BERT embeddings for semantic similarity analysis, achieving 92% classification accuracy.",
    ],
    tech: ["NLP", "BERT", "Fine-tuning", "LLMs"],
  },
  {
    id: "cardinality-ai",
    company: "Cardinality-AI",
    role: "Data Analyst Intern",
    period: "June 2021 – Sept 2021",
    location: "Remote",
    type: "Internship",
    description:
      "Worked on designing and building smart data pipelines to prepare large, structured datasets for machine learning. Used SQL to clean and organize the data efficiently and engineered new features to help models make better predictions.",
    readMore: [
      "Architected and implemented robust data ingestion and transformation pipelines using advanced SQL techniques including window functions, CTEs, and stored procedures to efficiently process large-scale structured datasets.",
      "Leveraged MATLAB's advanced analytics capabilities to conduct sophisticated pattern recognition analysis using signal processing techniques, Fourier transforms, and spectral analysis for data-driven policy recommendations.",
    ],
    tech: ["SQL", "MATLAB", "Data Pipelines"],
  },
];


export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  subtitle?: string;
  period: string;
  coursework: string[];
}

export const education: EducationEntry[] = [
  {
    id: "cornell",
    school: "Cornell University",
    degree: "Master of Engineering in Engineering Management",
    period: "Aug 2024 – May 2025",
    coursework: [
      "AI for Engineering Managers",
      "Product Management",
      "Data Analytics",
      "Decision Framing",
      "Negotiations and Contracts",
    ],
  },
  {
    id: "uc-davis",
    school: "University of California, Davis",
    degree: "Bachelor of Science in Computer Science",
    subtitle: "Minor in Technology Management",
    period: "Sept 2020 – June 2024",
    coursework: [
      "Algorithm Design and Analysis",
      "Machine Learning",
      "Operating Systems",
      "Database Systems",
      "AI",
      "Human-Computer Interaction",
      "Programming Languages",
      "Computer Architecture",
      "Technology Management",
    ],
  },
];


export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export const categories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    skills: [
      "Python",
      "C/C++",
      "SQL",
      "Go",
      "JavaScript",
      "Swift",
      "SwiftUI",
      "HTML",
      "CSS",
      "MicroPython",
      "Lisp",
      "Prolog",
    ],
  },
  {
    id: "ml",
    name: "ML & AI",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "LangChain",
      "Ollama",
      "LangFuse",
      "LangGraph",
      "PydanticAI",
      "Gemma",
      "LiteRT-LM",
      "On-Device ML",
      "Computer Vision",
      "Unsloth",
      "Windsurf",
      "Cursor",
      "Kimi AI",
      "Kiro",
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "VS Code", "MATLAB", "JIRA", "PowerBI"],
  },
  {
    id: "cloud",
    name: "Cloud",
    skills: [
      "AWS (S3, EC2, Lambda, SageMaker, RDS, DynamoDB)",
      "GCP (BigQuery, Vertex AI, Cloud Run)",
    ],
  },
];

export const LEARNING_PHILOSOPHY =
  "Build what matters, not just what is interesting. Good engineering starts with understanding the user, the constraint, and the outcome we are trying to change. Impact over elegance.";


export interface Initiative {
  id: string;
  title: string;
  role?: string;
  period: string;
  description: string;
  tags: string[];
  more?: string[];
  github?: string;
}


export const initiatives: Initiative[] = [
  {
    id: "treadwell",
    title: "Builder: Treadwell @ DeepMind x UK AI Agents Lab",
    period: "Aug 2026",
    description:
      "Solo build of Treadwell, offline real-time hazard navigation for blind and low-vision users using on-device Gemma 4 via LiteRT-LM. Track 2: Best Use of Gemma. Silence is the default.",
    more: [
      "Local Perception Contract: Designed a constrained hazard vocabulary and five-word alert rule so speech earns attention instead of narrating the room. Camera frames stay on device. No Gemini API, Google AI Studio, or cloud LLM path during inference.",
      "End-to-End Prototype: Built the full loop from camera capture through LiteRT-LM constrained JSON decisions to spoken alerts. Demo architecture uses an iPhone as camera and speaker over local Bonjour while Gemma 4 runs on a Mac. Long-term form factor is a wearable, not a phone app.",
      "Honest Scope: Documented limits including approximate distance, starter hazard lists, multi-second latency, and the need for formal BLV user testing. Positioned Treadwell as an additional signal, not a replacement for cane, guide dog, or mobility training.",
    ],
    tags: ["Gemma 4", "LiteRT-LM", "On-Device ML", "Accessibility", "Hackathon"],
    github: "https://github.com/ronitbhatia/treadwell",
  },
  {
    id: "ai-hackathon",
    title: "Participant: AI Hackathon – Conference Buddy",
    period: "Aug 2025",
    description:
      "Built Conference Buddy, a web app that helps healthcare sales teams identify high-value prospects before conferences and book meetings ahead of time.",
    more: [
      "Strategic Problem Definition: I authored a comprehensive Product Requirements Document (PRD) that clearly defined the problem statement, identified target audience segments, and established measurable success metrics. This foundational work ensured all stakeholders had clarity on what success looked like and aligned the prototype development with the specific needs of healthcare sales teams.",
      "Rapid Technical Implementation: I architected the complete tech stack and rapidly implemented the application using AI-assisted development workflows to streamline prompt engineering, debugging, and deployment. Within a single day, the prototype successfully identified conference attendees, enriched their profiles with relevant data, and integrated scheduling features to pre-book meetings.",
      "End-to-End Solution Delivery: The comprehensive solution demonstrated how AI-driven rapid prototyping can create high-value business tools in compressed timelines. This project showcased my ability to combine product sense, technical implementation skills, and business impact understanding in a high-pressure hackathon setting.",
    ],
    tags: ["Product Management", "Generative AI", "Prompt Engineering", "Full-Stack Development"],
    github: "https://github.com/ronitbhatia/ConferenceBuddy",
  },
  {
    id: "ambassador",
    title: "Student Ambassador: Cornell University",
    period: "Feb 2025 – Present",
    description:
      "Served as a dedicated ambassador for the Cornell University MEng department, engaging with prospective students to provide authentic insights on academic programs, campus life, and career opportunities while fostering an inclusive and supportive community environment.",
    more: [
      "Prospective Student Engagement: Actively engaged with prospective students through UniBuddy, providing personalized guidance on academic programs, research opportunities, and the unique Cornell experience. Offered authentic perspectives on coursework rigor, faculty relationships, and the collaborative learning environment that defines Cornell's MEng. programs.",
      "Career Development Support: Provided comprehensive insights into career opportunities, industry connections, and professional development resources available at Cornell. Shared firsthand experiences about networking events, career fairs, and the strong alumni network that supports students in achieving their professional goals across various industries.",
      "Inclusive Community Building: Played a key role in fostering an inclusive and supportive community by connecting with students from diverse backgrounds and experiences. Helped create a welcoming environment where prospective students felt comfortable asking questions and could envision themselves as part of the Cornell community, contributing to increased enrollment of underrepresented groups.",
    ],
    tags: ["Leadership", "Student Outreach", "Community Building", "Mentorship"],
  },
  {
    id: "pm-club",
    title: "Outreach and Growth Leader: Cornell Graduate Product Management Club",
    period: "Dec 2024 – May 2025",
    description:
      "Helped launch the Cornell Graduate Product Management Club and set the foundation for sustainable programming and member growth.",
    more: [
      "Organizational Development: I assisted in the official registration of the club with Cornell, establishing it as a recognized graduate student organization. This formal recognition enabled the group to secure essential resources, funding opportunities, and increased visibility on campus, making it significantly easier to attract members and secure high-profile guest speakers.",
      "Strategic Framework Creation: I collaborated with fellow leaders to develop the club's charter, structure, and comprehensive membership framework. This foundational work provided a clear organizational roadmap and established governance procedures that future leaders could build upon to ensure the club's long-term sustainability and growth.",
      "Program Development: I contributed to setting the foundation for future programming and growth opportunities for graduate students interested in product management. This included outlining early initiatives such as workshops, case competitions, and speaker events that would create valuable learning and networking opportunities for the community.",
    ],
    tags: ["Leadership", "Team Collaboration", "Strategic Planning", "Growth Strategy"],
  },
  {
    id: "consulting",
    title: "Associate Consultant: Cornell Graduate Consulting Club",
    period: "Nov 2024 – May 2025",
    description:
      "Worked with MerQube, a financial technology firm, to identify strategic opportunities and sharpen product positioning.",
    more: [
      "Strategic Market Assessment: As an Associate Consultant, I led a semester-long engagement with MerQube, a fintech firm specializing in packaging financial products for investment banks. My role focused on evaluating the competitive landscape and uncovering strategic opportunities where MerQube could differentiate itself and expand its market presence.",
      "Comprehensive Analysis Framework: I conducted in-depth landscape and value chain analyses, systematically mapping competitors, distribution channels, and potential partnership opportunities. This rigorous analytical approach helped identify untapped opportunities for MerQube in structured products and index services, providing actionable insights for strategic decision-making.",
      "Actionable Strategic Recommendations: By combining thorough market research with strategic insights, I developed comprehensive recommendations that guided MerQube on refining its product positioning and strengthening its market presence with institutional clients. These findings directly informed the company's strategic planning and competitive positioning efforts.",
    ],
    tags: ["Consulting", "Market Analysis", "Value Chain Analysis"],
  },
  {
    id: "talent-hackathon",
    title: "Talent 2.0 Hackathon Finalist",
    period: "Nov 2024",
    description:
      "Finalist in a three-day hackathon cohosted by Cornell and Johnson & Johnson with a VR onboarding solution focused on engagement and efficiency.",
    more: [
      "Innovative Solution Design: I led a multidisciplinary team in developing a cutting-edge VR simulation designed to revolutionize onboarding and employee engagement processes. The solution aimed to reduce training costs, significantly shorten ramp-up times, and dramatically improve overall employee experience by offering immersive and interactive learning environments.",
      "Strategic Business Analysis: My contributions included comprehensive problem scoping, detailed cost-saving estimations, and strategic framing of the financial benefits of a VR-based approach. I worked closely with teammates to design sophisticated interaction flows, performance metrics, and feedback mechanisms within the VR environment to ensure optimal user experience.",
      "Competitive Success: Throughout the hackathon, we collaborated closely with industry mentors to refine our solution and perfect our pitch. Our final presentation earned us a prestigious finalist position, demonstrating both the creativity of our concept and the practical viability of its business case in real-world corporate environments.",
    ],
    tags: ["Project Management", "Cost Estimation", "Strategic Thinking"],
  },
];
