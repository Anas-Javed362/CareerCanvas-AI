// ============================================================
// Career Roadmap Templates — Adapted per target role
// ============================================================

export const ROADMAP_TEMPLATES = {
  'Frontend Developer': {
    color: '#2563EB',
    icon: 'Monitor',
    description: 'Master modern web development from HTML to React and beyond.',
    milestones: [
      {
        id: 'fe-1', title: 'HTML & CSS Fundamentals', description: 'Learn semantic HTML5, CSS3, Flexbox, Grid, and responsive design principles.',
        duration: '3 weeks', difficulty: 'Beginner', category: 'Foundation',
        resources: [
          { type: 'docs', title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { type: 'course', title: 'freeCodeCamp HTML/CSS', url: 'https://www.freecodecamp.org' },
          { type: 'youtube', title: 'The Net Ninja CSS', url: 'https://www.youtube.com/@NetNinja' }
        ]
      },
      {
        id: 'fe-2', title: 'JavaScript Essentials', description: 'Master ES6+, DOM manipulation, fetch API, async/await, and modern JS patterns.',
        duration: '5 weeks', difficulty: 'Beginner', category: 'Core',
        resources: [
          { type: 'docs', title: 'javascript.info', url: 'https://javascript.info' },
          { type: 'course', title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net' },
          { type: 'youtube', title: 'Fireship JS Crash Course', url: 'https://www.youtube.com/@Fireship' }
        ]
      },
      {
        id: 'fe-3', title: 'Git & GitHub', description: 'Learn version control, branching, pull requests, and collaborative workflows.',
        duration: '1 week', difficulty: 'Beginner', category: 'Tools',
        resources: [
          { type: 'docs', title: 'Pro Git Book', url: 'https://git-scm.com/book' },
          { type: 'platform', title: 'GitHub Learning Lab', url: 'https://lab.github.com' }
        ]
      },
      {
        id: 'fe-4', title: 'React.js', description: 'Build modern UIs with React, hooks, Context API, and component patterns.',
        duration: '6 weeks', difficulty: 'Intermediate', category: 'Framework',
        resources: [
          { type: 'docs', title: 'React Official Docs', url: 'https://react.dev' },
          { type: 'course', title: 'Scrimba React Course', url: 'https://scrimba.com' },
          { type: 'youtube', title: 'Jack Herrington React', url: 'https://www.youtube.com/@jherr' }
        ]
      },
      {
        id: 'fe-5', title: 'State Management', description: 'Learn Redux Toolkit, Zustand, or Context API for managing complex application state.',
        duration: '3 weeks', difficulty: 'Intermediate', category: 'Advanced',
        resources: [
          { type: 'docs', title: 'Redux Toolkit', url: 'https://redux-toolkit.js.org' },
          { type: 'docs', title: 'Zustand', url: 'https://github.com/pmndrs/zustand' }
        ]
      },
      {
        id: 'fe-6', title: 'TypeScript', description: 'Add type safety to your JavaScript projects and learn TypeScript patterns.',
        duration: '3 weeks', difficulty: 'Intermediate', category: 'Language',
        resources: [
          { type: 'docs', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs' },
          { type: 'course', title: 'Total TypeScript', url: 'https://www.totaltypescript.com' }
        ]
      },
      {
        id: 'fe-7', title: 'Build Portfolio', description: 'Create 3-4 impressive projects demonstrating your skills and problem-solving ability.',
        duration: '4 weeks', difficulty: 'Intermediate', category: 'Projects',
        resources: [
          { type: 'platform', title: 'Frontend Mentor', url: 'https://www.frontendmentor.io' },
          { type: 'platform', title: 'CSS Battle', url: 'https://cssbattle.dev' }
        ]
      },
      {
        id: 'fe-8', title: 'Apply for Internships', description: 'Craft a compelling resume, prepare cover letters, and apply to target companies.',
        duration: '2 weeks', difficulty: 'Beginner', category: 'Career',
        resources: [
          { type: 'platform', title: 'LinkedIn', url: 'https://linkedin.com' },
          { type: 'platform', title: 'Internshala', url: 'https://internshala.com' }
        ]
      },
      {
        id: 'fe-9', title: 'Interview Preparation', description: 'Practice JavaScript, DSA, system design questions, and behavioral interviews.',
        duration: '4 weeks', difficulty: 'Advanced', category: 'Career',
        resources: [
          { type: 'platform', title: 'LeetCode', url: 'https://leetcode.com' },
          { type: 'platform', title: 'InterviewBit', url: 'https://www.interviewbit.com' }
        ]
      }
    ]
  },
  'Backend Developer': {
    color: '#7C3AED',
    icon: 'Server',
    description: 'Build scalable server-side applications and APIs.',
    milestones: [
      { id: 'be-1', title: 'Programming Fundamentals (Python/Node.js)', description: 'Master a backend language and OOP concepts.', duration: '4 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'docs', title: 'Node.js Docs', url: 'https://nodejs.org' }, { type: 'docs', title: 'Python.org', url: 'https://python.org' }] },
      { id: 'be-2', title: 'Databases (SQL & NoSQL)', description: 'Learn PostgreSQL, MySQL, MongoDB, and database design.', duration: '4 weeks', difficulty: 'Intermediate', category: 'Core', resources: [{ type: 'platform', title: 'SQLZoo', url: 'https://sqlzoo.net' }] },
      { id: 'be-3', title: 'REST API Design', description: 'Build RESTful APIs with Express or FastAPI.', duration: '3 weeks', difficulty: 'Intermediate', category: 'Core', resources: [{ type: 'docs', title: 'Express.js', url: 'https://expressjs.com' }] },
      { id: 'be-4', title: 'Authentication & Security', description: 'JWT, OAuth2, bcrypt, HTTPS, and security best practices.', duration: '2 weeks', difficulty: 'Intermediate', category: 'Security', resources: [{ type: 'docs', title: 'OWASP Top 10', url: 'https://owasp.org' }] },
      { id: 'be-5', title: 'Caching & Performance', description: 'Redis, CDN, query optimization, and performance tuning.', duration: '2 weeks', difficulty: 'Advanced', category: 'Advanced', resources: [{ type: 'docs', title: 'Redis Docs', url: 'https://redis.io' }] },
      { id: 'be-6', title: 'Docker & Deployment', description: 'Containerize apps, CI/CD pipelines, and cloud deployment.', duration: '3 weeks', difficulty: 'Advanced', category: 'DevOps', resources: [{ type: 'docs', title: 'Docker Docs', url: 'https://docs.docker.com' }] },
      { id: 'be-7', title: 'DSA & System Design', description: 'Practice algorithms and design scalable systems.', duration: '6 weeks', difficulty: 'Advanced', category: 'Career', resources: [{ type: 'platform', title: 'LeetCode', url: 'https://leetcode.com' }] },
      { id: 'be-8', title: 'Build Portfolio & Apply', description: 'Build backend projects and apply for roles.', duration: '3 weeks', difficulty: 'Intermediate', category: 'Career', resources: [{ type: 'platform', title: 'LinkedIn', url: 'https://linkedin.com' }] }
    ]
  },
  'Data Analyst': {
    color: '#059669',
    icon: 'BarChart2',
    description: 'Turn data into actionable business insights.',
    milestones: [
      { id: 'da-1', title: 'Python for Data Analysis', description: 'Learn NumPy, Pandas, and data manipulation.', duration: '4 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'docs', title: 'Pandas Docs', url: 'https://pandas.pydata.org' }] },
      { id: 'da-2', title: 'SQL Mastery', description: 'Complex queries, window functions, CTEs.', duration: '3 weeks', difficulty: 'Beginner', category: 'Core', resources: [{ type: 'platform', title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial' }] },
      { id: 'da-3', title: 'Data Visualization', description: 'Matplotlib, Seaborn, Tableau, Power BI.', duration: '3 weeks', difficulty: 'Intermediate', category: 'Core', resources: [{ type: 'docs', title: 'Matplotlib', url: 'https://matplotlib.org' }] },
      { id: 'da-4', title: 'Statistics & Probability', description: 'Descriptive stats, hypothesis testing, regression.', duration: '4 weeks', difficulty: 'Intermediate', category: 'Analytics', resources: [{ type: 'course', title: 'Khan Academy Statistics', url: 'https://khanacademy.org' }] },
      { id: 'da-5', title: 'Excel & BI Tools', description: 'Advanced Excel, Power Query, Tableau.', duration: '2 weeks', difficulty: 'Beginner', category: 'Tools', resources: [{ type: 'platform', title: 'Tableau Public', url: 'https://public.tableau.com' }] },
      { id: 'da-6', title: 'Real-world Projects', description: 'Analyze datasets, tell stories with data.', duration: '4 weeks', difficulty: 'Intermediate', category: 'Projects', resources: [{ type: 'platform', title: 'Kaggle', url: 'https://kaggle.com' }] },
      { id: 'da-7', title: 'Apply for Analyst Roles', description: 'Prepare resume and apply for data analyst positions.', duration: '2 weeks', difficulty: 'Beginner', category: 'Career', resources: [{ type: 'platform', title: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs' }] }
    ]
  },
  'Data Scientist': {
    color: '#0891B2',
    icon: 'Brain',
    description: 'Build ML models and derive deep insights from complex data.',
    milestones: [
      { id: 'ds-1', title: 'Python & Math Foundations', description: 'Linear algebra, calculus, probability, Python.', duration: '5 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'course', title: '3Blue1Brown Linear Algebra', url: 'https://youtube.com/@3blue1brown' }] },
      { id: 'ds-2', title: 'Machine Learning Fundamentals', description: 'Supervised/unsupervised learning, scikit-learn.', duration: '6 weeks', difficulty: 'Intermediate', category: 'Core', resources: [{ type: 'course', title: 'Andrew Ng ML Course', url: 'https://coursera.org/learn/machine-learning' }] },
      { id: 'ds-3', title: 'Deep Learning', description: 'Neural networks, TensorFlow/PyTorch.', duration: '6 weeks', difficulty: 'Advanced', category: 'Advanced', resources: [{ type: 'course', title: 'fast.ai', url: 'https://fast.ai' }] },
      { id: 'ds-4', title: 'NLP & Computer Vision', description: 'Text processing, image classification.', duration: '4 weeks', difficulty: 'Advanced', category: 'Specialization', resources: [{ type: 'platform', title: 'HuggingFace', url: 'https://huggingface.co' }] },
      { id: 'ds-5', title: 'End-to-End Projects', description: 'Build and deploy ML models.', duration: '5 weeks', difficulty: 'Advanced', category: 'Projects', resources: [{ type: 'platform', title: 'Kaggle', url: 'https://kaggle.com' }] },
      { id: 'ds-6', title: 'MLOps & Deployment', description: 'Model serving, monitoring, MLflow.', duration: '3 weeks', difficulty: 'Advanced', category: 'DevOps', resources: [{ type: 'docs', title: 'MLflow', url: 'https://mlflow.org' }] }
    ]
  },
  'AI Engineer': {
    color: '#DC2626',
    icon: 'Cpu',
    description: 'Design and build AI-powered systems and LLM applications.',
    milestones: [
      { id: 'ai-1', title: 'Python & ML Foundations', description: 'Core Python, NumPy, and ML basics.', duration: '4 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'docs', title: 'Python Docs', url: 'https://python.org' }] },
      { id: 'ai-2', title: 'Deep Learning & Transformers', description: 'Attention mechanisms, BERT, GPT architecture.', duration: '6 weeks', difficulty: 'Advanced', category: 'Core', resources: [{ type: 'platform', title: 'HuggingFace', url: 'https://huggingface.co' }] },
      { id: 'ai-3', title: 'LLM Integration', description: 'OpenAI API, LangChain, RAG systems.', duration: '4 weeks', difficulty: 'Advanced', category: 'Advanced', resources: [{ type: 'docs', title: 'LangChain Docs', url: 'https://langchain.com' }] },
      { id: 'ai-4', title: 'AI Application Development', description: 'Build AI-powered apps and APIs.', duration: '4 weeks', difficulty: 'Advanced', category: 'Projects', resources: [{ type: 'docs', title: 'OpenAI API', url: 'https://platform.openai.com' }] },
      { id: 'ai-5', title: 'MLOps & Production AI', description: 'Deploy and monitor AI systems at scale.', duration: '3 weeks', difficulty: 'Advanced', category: 'DevOps', resources: [{ type: 'docs', title: 'AWS SageMaker', url: 'https://aws.amazon.com/sagemaker' }] }
    ]
  },
  'DevOps Engineer': {
    color: '#D97706',
    icon: 'GitBranch',
    description: 'Bridge development and operations with automation and cloud.',
    milestones: [
      { id: 'do-1', title: 'Linux & Shell Scripting', description: 'Linux commands, bash scripting, system administration.', duration: '3 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'platform', title: 'Linux Journey', url: 'https://linuxjourney.com' }] },
      { id: 'do-2', title: 'Networking Fundamentals', description: 'TCP/IP, DNS, HTTP, load balancers.', duration: '2 weeks', difficulty: 'Beginner', category: 'Core', resources: [{ type: 'course', title: 'Computer Networking by Kurose', url: 'https://gaia.cs.umass.edu/kurose_ross' }] },
      { id: 'do-3', title: 'Docker & Kubernetes', description: 'Containerization and orchestration.', duration: '5 weeks', difficulty: 'Intermediate', category: 'Core', resources: [{ type: 'docs', title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs' }] },
      { id: 'do-4', title: 'CI/CD Pipelines', description: 'GitHub Actions, Jenkins, GitLab CI.', duration: '3 weeks', difficulty: 'Intermediate', category: 'Automation', resources: [{ type: 'docs', title: 'GitHub Actions', url: 'https://docs.github.com/actions' }] },
      { id: 'do-5', title: 'Cloud (AWS/GCP/Azure)', description: 'Cloud services, IAM, scaling.', duration: '6 weeks', difficulty: 'Advanced', category: 'Cloud', resources: [{ type: 'platform', title: 'AWS Free Tier', url: 'https://aws.amazon.com/free' }] },
      { id: 'do-6', title: 'Infrastructure as Code', description: 'Terraform, Ansible, CloudFormation.', duration: '3 weeks', difficulty: 'Advanced', category: 'Advanced', resources: [{ type: 'docs', title: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform' }] }
    ]
  },
  'UX Designer': {
    color: '#EC4899',
    icon: 'Palette',
    description: 'Create intuitive, beautiful digital experiences.',
    milestones: [
      { id: 'ux-1', title: 'Design Principles', description: 'Typography, color theory, visual hierarchy, gestalt.', duration: '3 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'course', title: 'Google UX Design Certificate', url: 'https://coursera.org/professional-certificates/google-ux-design' }] },
      { id: 'ux-2', title: 'User Research', description: 'Interviews, surveys, usability testing.', duration: '3 weeks', difficulty: 'Beginner', category: 'Research', resources: [{ type: 'docs', title: 'Nielsen Norman Group', url: 'https://nngroup.com' }] },
      { id: 'ux-3', title: 'Figma Mastery', description: 'Wireframing, prototyping, design systems.', duration: '4 weeks', difficulty: 'Intermediate', category: 'Tools', resources: [{ type: 'platform', title: 'Figma Community', url: 'https://figma.com/community' }] },
      { id: 'ux-4', title: 'Information Architecture', description: 'Sitemaps, user flows, navigation design.', duration: '2 weeks', difficulty: 'Intermediate', category: 'Core', resources: [{ type: 'docs', title: 'IA Institute', url: 'https://www.iainstitute.org' }] },
      { id: 'ux-5', title: 'Portfolio Building', description: 'Design 3-5 case studies for portfolio.', duration: '5 weeks', difficulty: 'Intermediate', category: 'Projects', resources: [{ type: 'platform', title: 'Behance', url: 'https://behance.net' }] }
    ]
  },
  'Product Manager': {
    color: '#7C3AED',
    icon: 'Target',
    description: 'Lead product strategy and drive business outcomes.',
    milestones: [
      { id: 'pm-1', title: 'Product Thinking', description: 'User-centered design, problem framing, product vision.', duration: '3 weeks', difficulty: 'Beginner', category: 'Foundation', resources: [{ type: 'course', title: 'Product School', url: 'https://productschool.com' }] },
      { id: 'pm-2', title: 'Market Research & Analytics', description: 'Competitive analysis, user research, metrics.', duration: '3 weeks', difficulty: 'Intermediate', category: 'Research', resources: [{ type: 'docs', title: 'Google Analytics', url: 'https://analytics.google.com' }] },
      { id: 'pm-3', title: 'Agile & Scrum', description: 'Sprint planning, backlog, roadmaps.', duration: '2 weeks', difficulty: 'Intermediate', category: 'Process', resources: [{ type: 'docs', title: 'Scrum Guide', url: 'https://scrumguides.org' }] },
      { id: 'pm-4', title: 'Data-Driven Decisions', description: 'A/B testing, cohort analysis, KPIs.', duration: '3 weeks', difficulty: 'Advanced', category: 'Analytics', resources: [{ type: 'platform', title: 'Mixpanel', url: 'https://mixpanel.com' }] },
      { id: 'pm-5', title: 'PM Interview Prep', description: 'Case studies, product design questions, estimation.', duration: '4 weeks', difficulty: 'Advanced', category: 'Career', resources: [{ type: 'course', title: 'Exponent PM', url: 'https://www.tryexponent.com' }] }
    ]
  }
}

export const CAREER_ROLES = Object.keys(ROADMAP_TEMPLATES)

export const DIFFICULTY_COLORS = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red'
}

export const RESOURCE_ICONS = {
  docs: 'BookOpen',
  course: 'GraduationCap',
  youtube: 'Play',
  platform: 'Globe',
  github: 'Github'
}

export const MILESTONE_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
}

export const KANBAN_COLUMNS = [
  { id: 'todo', title: 'To Learn', color: '#94A3B8' },
  { id: 'in_progress', title: 'In Progress', color: '#F59E0B' },
  { id: 'completed', title: 'Completed', color: '#22C55E' }
]
