// Google-like Comprehensive Search Index - Recruiter Optimized
const searchIndex = [
    // About & Personal - Extensive keywords for recruiters
    { 
        keywords: [
            'about', 'me', 'ronit', 'bhatia', 'ronit amar bhatia', 'personal', 'background', 'introduction', 'who', 
            'engineer', 'software engineer', 'software developer', 'developer', 'programmer', 'coder', 'tech professional',
            'ml engineer', 'machine learning engineer', 'ai engineer', 'data scientist', 'data engineer', 'full stack developer',
            'fullstack', 'backend developer', 'frontend developer', 'web developer', 'application developer',
            'portfolio', 'profile', 'bio', 'biography', 'overview', 'summary', 'introduction'
        ], 
        page: '/', 
        section: 'about', 
        title: 'About Me', 
        description: 'Learn about Ronit Bhatia, software engineer and ML enthusiast' 
    },
    
    // UnclogAI Project - Extensive keywords
    { 
        keywords: [
            'unclogai', 'unclog', 'unclog ai', 'workflow', 'intelligence', 'platform', 'workflow intelligence',
            'langgraph', 'lang graph', 'llm', 'large language model', 'language models', 'openai', 'hugging face',
            'graph', 'graph analytics', 'graph theory', 'networkx', 'network analysis', 'graph database',
            'analytics', 'data analytics', 'business analytics', 'operational analytics', 'predictive analytics',
            'bottleneck', 'bottleneck detection', 'process optimization', 'workflow optimization',
            'automation', 'workflow automation', 'process automation', 'business process automation', 'bpa',
            'nlp', 'natural language processing', 'text processing', 'text analysis', 'language understanding',
            'enterprise', 'enterprise software', 'enterprise solution', 'saas', 'software as a service',
            'tinyllama', 'tiny llama', 'hugging face transformers', 'transformers', 'gradio', 'sqlite',
            'jira', 'asana', 'slack', 'project management', 'task management', 'dependency analysis',
            'critical path', 'resource allocation', 'risk mitigation', 'operational efficiency',
            'ai ml', 'artificial intelligence', 'machine learning', 'deep learning', 'neural networks',
            'python', 'data science', 'data engineering', 'etl', 'data pipeline'
        ], 
        page: '/projects', 
        section: 'unclogai', 
        title: 'UnclogAI: AI-Driven Workflow Intelligence Platform', 
        description: 'Enterprise-grade workflow intelligence platform with graph-based process analytics' 
    },
    
    // VoyageLog Project
    { 
        keywords: [
            'voyagelog', 'voyage log', 'voyage', 'travel', 'journal', 'travel journal', 'travel app',
            'map', 'interactive map', 'mapping', 'geocoding', 'geospatial', 'gis', 'geographic information',
            'flask', 'python flask', 'web framework', 'restful', 'rest api', 'api', 'restful api',
            'docker', 'containerization', 'containers', 'dockerization', 'leaflet', 'openstreetmap',
            'nominatim', 'osm', 'web app', 'web application', 'full stack', 'fullstack',
            'sqlalchemy', 'orm', 'object relational mapping', 'database', 'sqlite', 'relational database',
            'ci cd', 'continuous integration', 'continuous deployment', 'devops', 'deployment',
            'backend', 'backend development', 'server side', 'server-side', 'api development'
        ], 
        page: '/projects', 
        section: 'voyagelog', 
        title: 'VoyageLog: Interactive Travel Journal & Map', 
        description: 'Lightweight travel-journal web app with interactive map and photo uploads' 
    },
    
    // Startup Planner Agent
    { 
        keywords: [
            'startup planner', 'startup', 'planner', 'agent', 'ai agent', 'strategic planning', 'business planning',
            'ollama', 'llama', 'llama 3', 'local llm', 'open source llm', 'local ai', 'offline ai',
            'streamlit', 'python streamlit', 'web app', 'interactive app', 'business plan', 'mvp',
            'minimum viable product', 'startup strategy', 'business strategy', 'market analysis', 'swot',
            'competitive analysis', 'product development', 'go to market', 'gtm', 'business model',
            'multi agent', 'agentic', 'agent architecture', 'llm application', 'generative ai'
        ], 
        page: '/projects', 
        section: 'startupplanner', 
        title: 'Startup Planner Agent: AI-Powered Strategic Planning Tool', 
        description: 'Locally hosted AI application using open-source language models to generate structured startup strategies' 
    },
    
    // ExcellenSight Project
    { 
        keywords: [
            'excellensight', 'excellen', 'excellen sight', 'chatgpt', 'chat gpt', 'openai chatgpt',
            'feedback', 'analyzer', 'feedback analysis', 'user feedback', 'customer feedback',
            'neural networks', 'neural network', 'deep learning', 'custom model', 'model training',
            'nlp', 'natural language processing', 'text classification', 'sentiment analysis',
            'streamlit', 'python streamlit', 'data visualization', 'dashboard', 'analytics',
            'multi task', 'multitask', 'classification', 'summarization', 'text summarization',
            'bert', 'embeddings', 'word embeddings', 'feature extraction', 'text processing',
            'machine learning', 'ml', 'ai', 'artificial intelligence', 'data science'
        ], 
        page: '/projects', 
        section: 'excellensight', 
        title: 'ExcellenSight: AI-Powered ChatGPT Feedback Analyzer', 
        description: 'End-to-end NLP system with custom neural network to extract insights from ChatGPT user feedback' 
    },
    
    // Link Analysis Capstone
    { 
        keywords: [
            'link analysis', 'fraud detection', 'fraud prevention', 'anti fraud', 'fraud analytics',
            'capstone', 'capstone project', 'final project', 'senior project', 'thesis project',
            'insurance', 'insurance industry', 'fortune 500', 'enterprise', 'large enterprise',
            'risk management', 'risk analysis', 'financial risk', 'operational risk',
            'financial modeling', 'financial analysis', 'quantitative analysis', 'data modeling',
            'competitive analysis', 'market research', 'strategy', 'business strategy',
            'swot', 'cost benefit analysis', 'cba', 'break even', 'vendor evaluation',
            'data analysis', 'business intelligence', 'bi', 'analytics', 'decision making'
        ], 
        page: '/projects', 
        section: 'link-analysis', 
        title: 'Capstone Project: Link Analysis & Fraud Detection Strategy', 
        description: 'Fraud detection strategy project for Fortune 500 insurance company' 
    },
    
    // Taskify Project
    { 
        keywords: [
            'taskify', 'task', 'task matching', 'task assignment', 'team matching', 'team member matching',
            'transformer', 'transformer model', 'attention mechanism', 'self attention', 'cross attention',
            'recommendation', 'recommendation system', 'recommendation engine', 'collaborative filtering',
            'neural network', 'deep learning', 'machine learning', 'ml', 'ai', 'artificial intelligence',
            'streamlit', 'python streamlit', 'web interface', 'user interface', 'ui',
            'compatibility score', 'matching algorithm', 'ranking', 'prediction', 'classification',
            'binary classifier', 'feature engineering', 'embeddings', 'semantic similarity',
            'project management', 'team management', 'resource allocation', 'workforce optimization'
        ], 
        page: '/projects', 
        section: 'taskify', 
        title: 'Taskify: AI-Powered Task-to-Team Member Matching System', 
        description: 'AI-driven recommendation engine using Transformer-based neural network for task assignment' 
    },
    
    // GDELT Project
    { 
        keywords: [
            'gdelt', 'gdelt monitoring', 'global database of events language and tone',
            'global macro', 'macro economics', 'macro analysis', 'macro trends',
            'investment', 'investment strategy', 'portfolio management', 'hedge fund',
            'llm', 'large language model', 'language model', 'generative ai', 'gen ai',
            'vector database', 'vector db', 'embeddings database', 'chroma', 'vector search',
            'semantic search', 'similarity search', 'financial analysis', 'quantitative finance',
            'geopolitical', 'geopolitics', 'news analysis', 'real time', 'real-time',
            'data scraping', 'web scraping', 'data collection', 'data pipeline', 'etl',
            'ollama', 'local llm', 'privacy', 'offline', 'on premise', 'on-premise',
            'python', 'data science', 'financial modeling', 'trading', 'investment research'
        ], 
        page: '/projects', 
        section: 'gdelt', 
        title: 'GDELT Monitoring System: LLM-Powered Global Macro Investment Engine', 
        description: 'LLM-powered system for generating investment strategies based on real-time global news' 
    },
    
    // Rock Paper Scissors ESP32
    { 
        keywords: [
            'rock paper scissors', 'rps', 'gesture recognition', 'hand gesture', 'gesture detection',
            'esp32', 'esp32s3', 'esp32 sense', 'microcontroller', 'embedded', 'embedded systems',
            'hardware', 'iot', 'internet of things', 'edge computing', 'edge ai', 'edge device',
            'computer vision', 'cv', 'image recognition', 'image classification', 'vision',
            'cnn', 'convolutional neural network', 'neural network', 'deep learning',
            'micropython', 'python', 'embedded python', 'firmware', 'embedded programming',
            'machine learning', 'ml', 'ai', 'artificial intelligence', 'on device ai',
            'tensorflow lite', 'tflite', 'model optimization', 'quantization', 'model compression'
        ], 
        page: '/projects', 
        section: 'rps', 
        title: 'Rock-Paper-Scissors Recognition on ESP32S3', 
        description: 'Computer vision project for gesture recognition on embedded hardware' 
    },
    
    // L-Store Database
    { 
        keywords: [
            'l-store', 'lstore', 'lineage', 'lineage based', 'lineage storage',
            'database', 'database engine', 'storage engine', 'dbms', 'database management system',
            'acid', 'transaction', 'transactions', 'concurrency', 'concurrency control',
            'two phase locking', '2pl', 'locking', 'lock manager', 'deadlock',
            'bufferpool', 'buffer pool', 'lru', 'least recently used', 'page replacement',
            'secondary index', 'indexing', 'b tree', 'btree', 'hash table', 'hash index',
            'columnar', 'columnar storage', 'column store', 'row store', 'storage format',
            'merge', 'background merge', 'tail page', 'base page', 'rid', 'record id',
            'python', 'database systems', 'systems programming', 'low level', 'performance'
        ], 
        page: '/projects', 
        section: 'lstore', 
        title: 'L-Store: Lineage-Based Database Storage Engine', 
        description: 'Lineage-based database storage engine implementation' 
    },
    
    // QAlienAI Experience
    { 
        keywords: [
            'qalienai', 'qalien', 'qalien ai', 'intern', 'internship', 'machine learning engineer',
            'ml engineer', 'ai engineer', 'software engineer intern', 'engineering intern',
            'ftc', 'federal trade commission', 'fda', 'food drug administration', 'compliance',
            'regulatory compliance', 'content compliance', 'marketing compliance', 'legal compliance',
            'claude', 'claude 3.5', 'claude sonnet', 'anthropic', 'gemini', 'gemini 2.5', 'gemini pro',
            'google gemini', 'bedrock', 'aws bedrock', 'amazon bedrock', 'aws', 'amazon web services',
            'supabase', 'supabase edge functions', 'edge functions', 'serverless', 'serverless functions',
            'ocr', 'optical character recognition', 'text extraction', 'image to text',
            'asr', 'automatic speech recognition', 'speech to text', 'audio transcription',
            'multimodal', 'multimodal ai', 'multimodal learning', 'vision language', 'vision language model',
            'pgvector', 'postgresql vector', 'vector search', 'semantic search', 'embeddings',
            'typescript', 'deno', 'javascript', 'node.js', 'async', 'async programming',
            'saas', 'software as a service', 'multi tenant', 'multi-tenant', 'scalable',
            'job queue', 'workflow', 'pipeline', 'ai pipeline', 'ml pipeline'
        ], 
        page: '/experience', 
        section: 'qalienai', 
        title: 'QAlienAI - Machine Learning Engineer Intern', 
        description: 'Leading AI systems for marketing content compliance evaluation' 
    },
    
    // Gallox Semiconductors
    { 
        keywords: [
            'gallox', 'gallox semiconductors', 'semiconductors', 'semiconductor', 'semiconductor industry',
            'testing', 'test automation', 'automated testing', 'test framework', 'test suite',
            'automation', 'lab automation', 'hardware automation', 'test automation',
            'mosfet', 'metal oxide semiconductor', 'igbt', 'insulated gate bipolar transistor',
            'power', 'power device', 'power electronics', 'power semiconductor', 'high voltage',
            'device', 'device testing', 'device characterization', 'device validation',
            'hardware', 'hardware engineering', 'electronics', 'electrical engineering',
            'lab', 'laboratory', 'research lab', 'testing lab', 'quality assurance', 'qa',
            'python', 'automation scripting', 'data acquisition', 'instrumentation', 'measurement'
        ], 
        page: '/experience', 
        section: 'gallox', 
        title: 'Gallox Semiconductors - Software Engineer Intern', 
        description: 'Built automation tools for semiconductor power device testing' 
    },
    
    // Cornell CALS Research
    { 
        keywords: [
            'cornell', 'cornell university', 'cornell cals', 'college of agriculture and life sciences',
            'research', 'research assistant', 'student researcher', 'undergraduate research',
            'assistant', 'student assistant', 'research intern', 'academic research',
            'student', 'undergraduate', 'university', 'college', 'academic',
            'climate', 'climate change', 'climate science', 'environmental science',
            'greenhouse', 'greenhouse gas', 'ghg', 'carbon emissions', 'emissions',
            'agriculture', 'agricultural', 'farming', 'sustainable agriculture', 'agtech',
            'geospatial', 'gis', 'geographic information systems', 'spatial data', 'geographic data',
            'data', 'data analysis', 'data science', 'data processing', 'data pipeline',
            'k-means', 'kmeans', 'clustering', 'machine learning', 'ml', 'unsupervised learning',
            'geopandas', 'pandas', 'numpy', 'python', 'data analysis', 'statistical analysis'
        ], 
        page: '/experience', 
        section: 'cornell', 
        title: 'Cornell CALS - Student Research Assistant', 
        description: 'ML pipelines for analyzing agricultural GHG emission datasets' 
    },
    
    // ColentAI Experience
    { 
        keywords: [
            'colentai', 'colent', 'colent ai', 'software developer', 'developer intern', 'intern',
            'internship', 'software engineering', 'engineering intern',
            'llm', 'large language model', 'language model', 'generative ai', 'gen ai',
            'fine-tuning', 'fine tuning', 'model fine tuning', 'transfer learning',
            'hyperparameter', 'hyperparameter tuning', 'hyperparameter optimization', 'model tuning',
            'api', 'api integration', 'api development', 'rest api', 'api research',
            'nlp', 'natural language processing', 'text processing', 'language understanding',
            'bert', 'bidirectional encoder', 'transformer', 'transformer model',
            'ner', 'named entity recognition', 'entity extraction', 'information extraction',
            'tf-idf', 'tfidf', 'vectorization', 'text vectorization', 'feature extraction',
            'semantic similarity', 'similarity analysis', 'classification', 'text classification',
            'python', 'machine learning', 'ml', 'ai', 'artificial intelligence'
        ], 
        page: '/experience', 
        section: 'colentai', 
        title: 'ColentAI - Software Developer Intern', 
        description: 'Optimized LLM performance through hyperparameter tuning and fine-tuning techniques' 
    },
    
    // Cardinality-AI Experience
    { 
        keywords: [
            'cardinality', 'cardinality-ai', 'cardinality ai', 'data analyst', 'analyst intern', 'intern',
            'internship', 'data science intern', 'analytics intern',
            'sql', 'structured query language', 'database', 'relational database', 'rdbms',
            'data pipeline', 'etl', 'extract transform load', 'data processing', 'data transformation',
            'matlab', 'matlab programming', 'numerical computing', 'scientific computing',
            'analytics', 'data analytics', 'business analytics', 'statistical analysis',
            'pattern recognition', 'signal processing', 'fourier transform', 'spectral analysis',
            'window functions', 'cte', 'common table expressions', 'stored procedures',
            'data ingestion', 'data transformation', 'data modeling', 'data engineering',
            'python', 'data science', 'machine learning', 'ml', 'predictive modeling'
        ], 
        page: '/experience', 
        section: 'cardinality', 
        title: 'Cardinality-AI - Data Analyst Intern', 
        description: 'Designed and built data pipelines using SQL and MATLAB for machine learning' 
    },
    
    // Education Page - General entry for page-level searches
    { 
        keywords: [
            'education', 'educational', 'academic background', 'academics', 'university', 'college', 
            'degree', 'degrees', 'school', 'schooling', 'studies', 'academic studies', 'learning',
            'qualifications', 'credentials', 'academic credentials', 'educational background'
        ], 
        page: '/education', 
        section: null, 
        title: 'Education', 
        description: 'Academic background, university education, and coursework' 
    },
    
    // Education - Cornell
    { 
        keywords: [
            'cornell', 'cornell university', 'ivy league', 'ivy', 'top university', 'prestigious university',
            'university', 'college', 'education', 'degree', 'bachelor', "bachelor's", 'bs', 'bachelor of science',
            'engineering', 'engineering management', 'operations research', 'or', 'operations analysis',
            'management', 'business management', 'engineering management', 'technical management',
            'operations', 'operations research', 'optimization', 'mathematical optimization',
            'academic', 'academics', 'studies', 'coursework', 'curriculum', 'program',
            'undergraduate', 'undergrad', 'student', 'alumni', 'graduate', 'alumnus'
        ], 
        page: '/education', 
        section: 'cornell', 
        title: 'Cornell University', 
        description: 'Bachelor of Science in Engineering Management and Operations Research' 
    },
    
    // Education - Coursework
    { 
        keywords: [
            'coursework', 'courses', 'classes', 'subjects', 'curriculum', 'studies', 'academic courses',
            'relevant coursework', 'key courses', 'major courses', 'core courses', 'electives',
            'education', 'academic', 'learning', 'training', 'knowledge', 'skills learned'
        ], 
        page: '/education', 
        section: 'coursework', 
        title: 'Key Coursework', 
        description: 'Relevant coursework and academic studies' 
    },
    
    // Skills Page - General entry for page-level searches
    { 
        keywords: [
            'skills', 'skill', 'technical skills', 'technologies', 'technology', 'tech', 'tech stack',
            'technology stack', 'tools', 'tool', 'frameworks', 'framework', 'languages', 'language',
            'programming languages', 'programming skills', 'technical expertise', 'expertise',
            'competencies', 'competency', 'capabilities', 'capability', 'proficiencies', 'proficiency',
            'abilities', 'ability', 'know-how', 'knowledge', 'technical knowledge'
        ], 
        page: '/skills', 
        section: null, 
        title: 'Skills', 
        description: 'Technical skills, programming languages, frameworks, and tools' 
    },
    
    // Skills - Programming Languages
    { 
        keywords: [
            'python', 'python programming', 'python developer', 'pythonic', 'pandas', 'numpy', 'scipy',
            'c++', 'cpp', 'c plus plus', 'c', 'c programming', 'systems programming', 'low level',
            'sql', 'structured query language', 'database', 'query', 'sql programming', 'database programming',
            'go', 'golang', 'go programming', 'google go', 'concurrent programming',
            'javascript', 'js', 'ecmascript', 'node.js', 'nodejs', 'typescript', 'ts',
            'html', 'html5', 'hypertext markup', 'markup language', 'web markup',
            'css', 'css3', 'cascading style sheets', 'styling', 'web styling',
            'micropython', 'embedded python', 'microcontroller python',
            'lisp', 'lisp programming', 'functional programming', 'symbolic computation',
            'prolog', 'prolog programming', 'logic programming', 'declarative programming',
            'programming', 'coding', 'software development', 'development', 'software engineering',
            'programming languages', 'languages', 'tech stack', 'technology stack'
        ], 
        page: '/skills', 
        section: 'programming', 
        title: 'Programming Languages', 
        description: 'Python, C/C++, SQL, Go, JavaScript, HTML, CSS, and more' 
    },
    
    // Skills - ML & AI
    { 
        keywords: [
            'machine learning', 'ml', 'machine learning engineer', 'ml engineer', 'ml developer',
            'ai', 'artificial intelligence', 'ai engineer', 'ai developer', 'ai researcher',
            'tensorflow', 'tf', 'tensor flow', 'google tensorflow', 'deep learning framework',
            'pytorch', 'py torch', 'torch', 'facebook pytorch', 'deep learning',
            'scikit-learn', 'scikit learn', 'sklearn', 'scikit', 'machine learning library',
            'langchain', 'lang chain', 'llm framework', 'ai framework', 'agent framework',
            'ollama', 'local llm', 'llm runtime', 'model serving',
            'langfuse', 'lang fuse', 'llm observability', 'llm monitoring', 'llm analytics',
            'langgraph', 'lang graph', 'workflow orchestration', 'agent orchestration',
            'pydantic', 'pydantic ai', 'data validation', 'type validation',
            'unsloth', 'model training', 'efficient training', 'training optimization',
            'neural networks', 'neural network', 'deep learning', 'deep neural networks', 'dnn',
            'cnn', 'convolutional neural network', 'rnn', 'recurrent neural network',
            'transformer', 'transformer model', 'attention', 'self attention',
            'llm', 'large language model', 'language model', 'generative ai', 'gen ai',
            'nlp', 'natural language processing', 'text processing', 'language understanding',
            'computer vision', 'cv', 'image processing', 'image recognition', 'vision',
            'reinforcement learning', 'rl', 'supervised learning', 'unsupervised learning'
        ], 
        page: '/skills', 
        section: 'ml', 
        title: 'ML & AI', 
        description: 'Machine learning frameworks and AI tools' 
    },
    
    // Skills - Tools & DevOps
    { 
        keywords: [
            'tools', 'development tools', 'dev tools', 'software tools', 'productivity tools',
            'devops', 'dev ops', 'development operations', 'sre', 'site reliability engineering',
            'git', 'version control', 'vcs', 'source control', 'git workflow', 'git branching',
            'github', 'git hub', 'code repository', 'version control', 'open source',
            'docker', 'containerization', 'containers', 'dockerization', 'container orchestration',
            'vscode', 'visual studio code', 'code editor', 'ide', 'integrated development environment',
            'matlab', 'matlab programming', 'numerical computing', 'scientific computing',
            'jira', 'project management', 'issue tracking', 'agile', 'scrum', 'kanban',
            'powerbi', 'power bi', 'business intelligence', 'bi', 'data visualization', 'dashboard',
            'ci cd', 'continuous integration', 'continuous deployment', 'cicd', 'ci/cd pipeline',
            'automation', 'build automation', 'test automation', 'deployment automation',
            'linux', 'unix', 'command line', 'cli', 'bash', 'shell scripting'
        ], 
        page: '/skills', 
        section: 'tools', 
        title: 'Tools & DevOps', 
        description: 'Development tools and DevOps practices' 
    },
    
    // Skills - Cloud Platforms
    { 
        keywords: [
            'cloud', 'cloud computing', 'cloud platforms', 'cloud services', 'cloud infrastructure',
            'aws', 'amazon web services', 'amazon cloud', 'aws cloud', 'amazon',
            's3', 'simple storage service', 'object storage', 'cloud storage', 'storage',
            'ec2', 'elastic compute cloud', 'virtual machines', 'vm', 'compute', 'servers',
            'lambda', 'aws lambda', 'serverless', 'serverless computing', 'functions as a service', 'faas',
            'sagemaker', 'aws sagemaker', 'ml platform', 'machine learning platform', 'mlops',
            'rds', 'relational database service', 'database service', 'managed database',
            'dynamodb', 'dynamo db', 'nosql', 'no sql', 'key value store', 'document database',
            'gcp', 'google cloud platform', 'google cloud', 'gcp cloud', 'google',
            'bigquery', 'big query', 'data warehouse', 'analytics', 'sql analytics',
            'vertex ai', 'vertex', 'google ai', 'ml platform', 'ai platform',
            'cloud run', 'serverless containers', 'container service', 'serverless compute',
            'cloud architecture', 'distributed systems', 'scalable systems', 'microservices'
        ], 
        page: '/skills', 
        section: 'cloud', 
        title: 'Cloud Platforms', 
        description: 'AWS and GCP cloud services and platforms' 
    },
    
    // Initiative & Impact
    { 
        keywords: [
            'initiative', 'initiatives', 'leadership', 'leadership experience', 'leading',
            'impact', 'community impact', 'social impact', 'positive impact',
            'volunteer', 'volunteering', 'volunteer work', 'community service', 'service',
            'community', 'community involvement', 'community engagement', 'outreach',
            'social', 'social responsibility', 'corporate social responsibility', 'csr',
            'contribution', 'contributions', 'giving back', 'philanthropy', 'charity'
        ], 
        page: '/initiative-impact', 
        section: 'initiative', 
        title: 'Initiative & Impact', 
        description: 'Leadership initiatives and community impact' 
    },
    
    // Resume Download
    { 
        keywords: [
            'resume', 'cv', 'curriculum vitae', 'download resume', 'download cv', 'get resume',
            'pdf', 'resume pdf', 'cv pdf', 'portfolio', 'credentials', 'qualifications'
        ], 
        page: '/', 
        section: 'resume', 
        title: 'Download Resume', 
        description: 'Download Ronit Bhatia\'s resume' 
    },
    
    // Contact
    { 
        keywords: [
            'contact', 'email', 'gmail', 'roncy.bhatia@gmail.com', 'email address', 'reach out',
            'get in touch', 'connect', 'connection', 'communication', 'message', 'send message',
            'hire', 'hiring', 'recruitment', 'recruiter', 'job opportunity', 'opportunity'
        ], 
        page: '/', 
        section: 'contact', 
        title: 'Contact', 
        description: 'Get in touch via email' 
    },
    
    // GitHub
    { 
        keywords: [
            'github', 'git hub', 'code', 'repository', 'repositories', 'repos', 'source code',
            'projects', 'open source', 'contributions', 'coding projects', 'portfolio projects',
            'software projects', 'code samples', 'examples', 'showcase'
        ], 
        page: '/', 
        section: 'github', 
        title: 'GitHub', 
        description: 'View code repositories and projects on GitHub' 
    },
    
    // LinkedIn
    { 
        keywords: [
            'linkedin', 'linked in', 'professional', 'professional network', 'networking',
            'network', 'career', 'career profile', 'professional profile', 'work profile',
            'connect', 'connection', 'professional connections', 'industry network'
        ], 
        page: '/', 
        section: 'linkedin', 
        title: 'LinkedIn', 
        description: 'Connect on LinkedIn' 
    },
];

// Enhanced Google-like Fuzzy Search Algorithm
function fuzzyMatch(query, text) {
    if (!query || !text) return 0;
    
    query = query.toLowerCase().trim();
    text = text.toLowerCase();
    
    // Exact match gets highest score
    if (text === query) return 100;
    
    // Starts with query gets very high score
    if (text.startsWith(query)) return 95;
    
    // Contains query as whole word gets high score
    const wordBoundaryRegex = new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (wordBoundaryRegex.test(text)) return 90;
    
    // Contains query as substring
    if (text.includes(query)) return 85;
    
    // Calculate similarity using Levenshtein distance
    const similarity = calculateSimilarity(query, text);
    
    // Check for word matches with better scoring
    const queryWords = query.split(/\s+/).filter(w => w.length > 0);
    const textWords = text.split(/\s+/).filter(w => w.length > 0);
    let wordMatches = 0;
    let exactWordMatches = 0;
    
    queryWords.forEach(qWord => {
        textWords.forEach(tWord => {
            if (tWord === qWord) {
                exactWordMatches++;
                wordMatches += 2;
            } else if (tWord.startsWith(qWord) || qWord.startsWith(tWord)) {
                wordMatches += 1.5;
            } else if (tWord.includes(qWord) || qWord.includes(tWord)) {
                wordMatches += 1;
            } else {
                const wordSimilarity = calculateSimilarity(qWord, tWord);
                if (wordSimilarity > 0.8) {
                    wordMatches += 0.8;
                } else if (wordSimilarity > 0.6) {
                    wordMatches += 0.5;
                }
            }
        });
    });
    
    const wordMatchScore = (wordMatches / Math.max(queryWords.length, 1)) * 60;
    const exactMatchBonus = (exactWordMatches / Math.max(queryWords.length, 1)) * 20;
    
    return Math.max(similarity * 40, wordMatchScore + exactMatchBonus);
}

// Calculate similarity between two strings (0-1) - Enhanced
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    if (shorter.length === 0) return 0.0;
    
    const distance = levenshteinDistance(longer, shorter);
    const maxLength = Math.max(longer.length, shorter.length);
    
    return (maxLength - distance) / maxLength;
}

// Levenshtein distance algorithm
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Context-aware category detection
function detectSearchIntent(query) {
    const queryLower = query.toLowerCase().trim();
    const queryWords = queryLower.split(/\s+/);
    
    // Category keywords mapping
    const categoryKeywords = {
        'projects': ['projects', 'project', 'portfolio', 'work', 'build', 'built', 'developed', 'development'],
        'skills': ['skills', 'skill', 'technologies', 'technology', 'tech', 'tools', 'framework', 'language', 'languages'],
        'experience': ['experience', 'work', 'job', 'intern', 'internship', 'employment', 'career', 'position', 'role'],
        'education': ['education', 'university', 'college', 'degree', 'school', 'academic', 'coursework', 'courses'],
        'about': ['about', 'me', 'who', 'introduction', 'background', 'bio', 'biography']
    };
    
    const intent = {
        category: null,
        confidence: 0
    };
    
    // Check for category matches
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        for (const keyword of keywords) {
            if (queryWords.includes(keyword) || queryLower.includes(keyword)) {
                intent.category = category;
                intent.confidence = 1.0;
                break;
            }
        }
        if (intent.category) break;
    }
    
    return intent;
}

// Enhanced Google-like Search Function with Better Ranking and Context Awareness
function performSearch(query) {
    if (!query || query.trim().length === 0) {
        return [];
    }
    
    const results = [];
    const queryLower = query.toLowerCase().trim();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
    const searchIntent = detectSearchIntent(query);
    
    // Page type mapping for intent filtering
    const pageTypeMap = {
        'projects': '/projects',
        'skills': '/skills',
        'experience': '/experience',
        'education': '/education',
        'about': '/'
    };
    
    searchIndex.forEach(item => {
        let score = 0;
        let matchedKeywords = [];
        let exactMatches = 0;
        let titleMatches = 0;
        let descMatches = 0;
        
        // Context-aware filtering: if searching for a category, heavily penalize non-matching pages
        if (searchIntent.category && searchIntent.confidence > 0.5) {
            const expectedPage = pageTypeMap[searchIntent.category];
            if (expectedPage && item.page !== expectedPage) {
                // Heavily reduce score for non-matching pages when category intent is clear
                // But don't completely exclude - allow if there's a very strong match
                score -= 200;
            } else if (expectedPage && item.page === expectedPage) {
                // Boost score for matching page type
                score += 300;
            }
        }
        
        // Check each keyword with enhanced scoring
        item.keywords.forEach(keyword => {
            const keywordLower = keyword.toLowerCase();
            
            // Exact keyword match
            if (keywordLower === queryLower) {
                score += 200;
                exactMatches++;
                matchedKeywords.push(keyword);
            }
            // Keyword starts with query
            else if (keywordLower.startsWith(queryLower)) {
                score += 150;
                matchedKeywords.push(keyword);
            }
            // Query starts with keyword
            else if (queryLower.startsWith(keywordLower)) {
                score += 140;
                matchedKeywords.push(keyword);
            }
            // Keyword contains query as whole word
            else {
                const matchScore = fuzzyMatch(queryLower, keywordLower);
                if (matchScore > 50) {
                    score += matchScore;
                    if (matchScore > 80) {
                        matchedKeywords.push(keyword);
                    }
                }
            }
        });
        
        // Enhanced title matching (higher weight)
        const titleLower = item.title.toLowerCase();
        queryWords.forEach(qWord => {
            if (titleLower.includes(qWord)) {
                titleMatches++;
                score += 100;
            }
        });
        // Full title match bonus
        if (titleLower.includes(queryLower)) {
            score += 150;
        }
        
        // Description matching (lower weight)
        const descLower = item.description.toLowerCase();
        queryWords.forEach(qWord => {
            if (descLower.includes(qWord)) {
                descMatches++;
                score += 30;
            }
        });
        
        // Bonus for multiple word matches
        if (queryWords.length > 1) {
            const matchedWordCount = titleMatches + descMatches;
            if (matchedWordCount === queryWords.length) {
                score += 50; // All words matched bonus
            }
        }
        
        // Page type bonus - if query matches page type
        const pageType = item.page === '/' ? 'about' : item.page.replace('.html', '').replace('index', 'about');
        if (queryWords.some(word => pageType.includes(word) || word.includes(pageType))) {
            score += 100;
        }
        
        // Only include if score is significant (adjusted threshold based on context)
        const threshold = searchIntent.category ? 100 : 50; // Higher threshold when category is detected
        if (score > threshold) {
            results.push({
                ...item,
                score: score,
                matchedKeywords: matchedKeywords.slice(0, 5), // Show more keywords
                exactMatches: exactMatches,
                relevance: score
            });
        }
    });
    
    // Enhanced sorting - prioritize exact matches, then score
    results.sort((a, b) => {
        // First sort by exact matches
        if (b.exactMatches !== a.exactMatches) {
            return b.exactMatches - a.exactMatches;
        }
        // Then by score
        return b.score - a.score;
    });
    
    // Limit results more intelligently - fewer results when category is detected
    const maxResults = searchIntent.category ? 8 : 12;
    return results.slice(0, maxResults);
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length === 0) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }
        
        // Debounce search (faster for better UX)
        searchTimeout = setTimeout(() => {
            const results = performSearch(query);
            displaySearchResults(results, query);
        }, 100);
    });
    
    searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            const results = performSearch(query);
            displaySearchResults(results, query);
        }
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                const results = performSearch(query);
                if (results.length > 0) {
                    navigateToResult(results[0]);
                }
            }
        }
    });
}

// Display search results with enhanced formatting
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item no-results">
                <p>No results found for "${query}"</p>
                <p class="search-suggestion">Try searching for: projects, experience, skills, education, or specific technologies like Python, ML, AWS, etc.</p>
            </div>
        `;
        searchResults.classList.add('active');
        return;
    }
    
    let html = '';
    results.forEach((result, index) => {
        // Store result data in data attributes for reliable access
        const resultData = encodeURIComponent(JSON.stringify(result));
        html += `
            <div class="search-result-item" 
                 data-page="${result.page}" 
                 data-section="${result.section || ''}" 
                 data-result='${resultData}'
                 role="button"
                 tabindex="0">
                <div class="search-result-header">
                    <h3 class="search-result-title">${highlightMatch(result.title, query)}</h3>
                    <span class="search-result-type">${getPageType(result.page)}</span>
                </div>
                <p class="search-result-description">${highlightMatch(result.description, query)}</p>
                ${result.matchedKeywords.length > 0 ? `
                    <div class="search-result-keywords">
                        ${result.matchedKeywords.map(kw => `<span class="search-keyword">${kw}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    searchResults.innerHTML = html;
    searchResults.classList.add('active');
    
    // Add click, keyboard, and hover event listeners to all result items
    const resultItems = searchResults.querySelectorAll('.search-result-item[data-result]');
    resultItems.forEach(item => {
        // Hover handler - add highlighted class on hover
        item.addEventListener('mouseenter', () => {
            // Remove highlighted from all items
            resultItems.forEach(i => i.classList.remove('highlighted'));
            // Add highlighted to current item
            item.classList.add('highlighted');
        });
        
        item.addEventListener('mouseleave', () => {
            // Optionally remove on mouse leave, or keep it highlighted
            // item.classList.remove('highlighted');
        });
        
        // Click handler
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                const resultData = decodeURIComponent(item.getAttribute('data-result'));
                const result = JSON.parse(resultData);
                navigateToResult(result);
            } catch (error) {
                console.error('Error parsing result data:', error);
                // Fallback to data attributes
                const page = item.getAttribute('data-page');
                const section = item.getAttribute('data-section');
                if (page) {
                    navigateToResult({ page, section });
                }
            }
        });
        
        // Keyboard handler (Enter/Space)
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                item.click();
            }
        });
        
        // Focus handler - highlight on focus (for keyboard navigation)
        item.addEventListener('focus', () => {
            resultItems.forEach(i => i.classList.remove('highlighted'));
            item.classList.add('highlighted');
        });
    });
}

// Enhanced highlight matching with word boundaries
function highlightMatch(text, query) {
    if (!query) return text;
    const queryWords = query.split(/\s+/).filter(w => w.length > 0);
    let highlighted = text;
    
    queryWords.forEach(qWord => {
        const regex = new RegExp(`(${qWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    
    return highlighted;
}

// Get page type label
function getPageType(page) {
    const types = {
        '/': 'Home',
        'index.html': 'Home', // Keep for backwards compatibility
        '/projects': 'Project',
        'projects.html': 'Project', // Keep for backwards compatibility
        '/experience': 'Experience',
        'experience.html': 'Experience', // Keep for backwards compatibility
        '/education': 'Education',
        'education.html': 'Education', // Keep for backwards compatibility
        '/skills': 'Skill',
        'skills.html': 'Skill', // Keep for backwards compatibility
        '/initiative-impact': 'Initiative',
        'initiative-impact.html': 'Initiative' // Keep for backwards compatibility
    };
    return types[page] || 'Page';
}

// Navigate to search result (global function) - Enhanced with reliable navigation
window.navigateToResult = function(result) {
    // Handle string result from onclick
    if (typeof result === 'string') {
        try {
            // Decode HTML entities and parse JSON
            const decoded = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            result = JSON.parse(decoded);
        } catch (e) {
            console.error('Error parsing result:', e, result);
            return;
        }
    }
    
    if (!result || !result.page) {
        console.error('Invalid result object:', result);
        return;
    }
    
    // Close search results
    const searchResults = document.getElementById('search-results');
    const searchInput = document.getElementById('search-input');
    if (searchResults) searchResults.classList.remove('active');
    if (searchInput) searchInput.blur();
    
    // Handle special sections
    if (result.section === 'resume') {
        const link = document.createElement('a');
        link.href = 'Resume.pdf';
        link.download = 'Resume.pdf';
        link.click();
        return;
    }
    
    if (result.section === 'contact') {
        if (typeof copyEmailToClipboard === 'function') {
            copyEmailToClipboard('roncy.bhatia@gmail.com', { preventDefault: () => {} });
        }
        return;
    }
    
    if (result.section === 'github') {
        window.open('https://github.com/ronitbhatia', '_blank');
        return;
    }
    
    if (result.section === 'linkedin') {
        window.open('https://www.linkedin.com/in/ronit-bhatia/', '_blank');
        return;
    }
    
    // Get current page - normalize to clean URLs
    const pathname = window.location.pathname;
    const pathNoSlash = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
    let currentPage = '/';
    if (pathNoSlash && pathNoSlash !== '/') {
        const lastSegment = pathNoSlash.split('/').filter(Boolean).pop();
        currentPage = lastSegment ? '/' + lastSegment : '/';
    }
    // Normalize: remove .html extension and handle index.html
    if (currentPage === '/index.html' || currentPage === '/index' || currentPage === 'index.html' || currentPage === 'index') {
        currentPage = '/';
    } else if (currentPage.endsWith('.html')) {
        currentPage = '/' + currentPage.replace('.html', '').replace(/^\//, '');
    }
    
    const targetPage = result.page;
    // Normalize target page
    let normalizedTarget = targetPage;
    if (normalizedTarget === 'index.html' || normalizedTarget === 'index') {
        normalizedTarget = '/';
    } else if (normalizedTarget.endsWith('.html')) {
        normalizedTarget = '/' + normalizedTarget.replace('.html', '');
    } else if (normalizedTarget && !normalizedTarget.startsWith('/')) {
        normalizedTarget = '/' + normalizedTarget;
    }
    
    const isSamePage = normalizedTarget === currentPage || 
                      (normalizedTarget === '/' && (currentPage === '' || currentPage === '/' || currentPage === 'index.html' || currentPage === 'index')) ||
                      (normalizedTarget === '/index' || normalizedTarget === '/index.html');
    
    if (isSamePage) {
        // Same page, scroll to section immediately
        if (result.section) {
            // Try immediate scroll first
            const section = document.getElementById(result.section);
            if (section) {
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight + 20 : 100;
                const targetPosition = section.offsetTop - offset;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            } else {
                // If not found, try after a short delay (for dynamically loaded content)
                setTimeout(() => {
                    const section = document.getElementById(result.section);
                    if (section) {
                        const navbar = document.querySelector('.navbar');
                        const offset = navbar ? navbar.offsetHeight + 20 : 100;
                        const targetPosition = section.offsetTop - offset;
                        window.scrollTo({
                            top: Math.max(0, targetPosition),
                            behavior: 'smooth'
                        });
                    } else {
                        console.warn('Section not found:', result.section);
                    }
                }, 200);
            }
        }
    } else {
        // Different page, navigate without hash for homepage (about section)
        // Never add #about to URL - always use root URL for homepage
        if (normalizedTarget === '/' && result.section === 'about') {
            // Check if we're already on the homepage
            if (currentPage === '/') {
                // Already on homepage, just scroll to about section
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 100;
                    window.scrollTo({
                        top: aboutSection.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Navigate to homepage without hash
                window.location.href = '/';
            }
        } else if (result.section) {
            // Navigate to the page with hash (for other pages)
            // Ensure targetPage starts with / for clean URLs
            const cleanTarget = normalizedTarget.startsWith('/') ? normalizedTarget : '/' + normalizedTarget.replace('.html', '');
            window.location.href = `${cleanTarget}#${result.section}`;
        } else {
            // Ensure targetPage starts with / for clean URLs
            const cleanTarget = normalizedTarget.startsWith('/') ? normalizedTarget : '/' + normalizedTarget.replace('.html', '');
            window.location.href = cleanTarget;
        }
    }
}

// Enhanced hash navigation handler for all pages - ensures search results scroll correctly
window.handleHashNavigation = function() {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Wait for page to fully load
            const scrollToSection = () => {
                const section = document.getElementById(hash);
                if (section) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 100;
                    const targetPosition = section.offsetTop - offset;
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    return true;
                }
                return false;
            };
            
            // Try immediately
            if (!scrollToSection()) {
                // Try after DOM is ready
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        setTimeout(scrollToSection, 100);
                    });
                } else {
                    setTimeout(scrollToSection, 100);
                }
            }
        }
    }
};

// Initialize hash navigation on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.handleHashNavigation);
} else {
    window.handleHashNavigation();
}

// Also handle hash changes (when navigating within same page)
window.addEventListener('hashchange', window.handleHashNavigation);

// Dark mode functionality for about section - SAME PATTERN as hero-search
// Remove inline styles and let CSS handle it
window.applyAboutSectionTheme = function(theme) {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return; // Only run on pages with about section
    
    const aboutContent = document.querySelector('.about-content');
    const aboutTexts = document.querySelectorAll('#about .about-text, #about .section-title, #about p');
    
    // Set data-theme attribute - CSS will handle the styling
    aboutSection.setAttribute('data-theme', theme);
    
    // REMOVE inline styles - let CSS rules apply (same as hero-search)
    aboutSection.style.removeProperty('background');
    aboutSection.style.removeProperty('color');
    aboutSection.style.removeProperty('backdrop-filter');
    aboutSection.style.removeProperty('-webkit-backdrop-filter');
    
    if (aboutContent) {
        aboutContent.setAttribute('data-theme', theme);
    }
    
    // Remove inline styles from text elements - let CSS handle it
    aboutTexts.forEach(el => {
        el.setAttribute('data-theme', theme);
        el.style.removeProperty('color');
    });
    
    // Trigger reflow to ensure CSS rules apply
    void aboutSection.offsetHeight;
};

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}
