// ============================================================
// App Constants
// ============================================================

export const APP_NAME = 'CareerCanvas AI'

export const INTERNSHIP_STATUSES = [
  { id: 'wishlist', label: 'Wishlist', color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.1)' },
  { id: 'applied', label: 'Applied', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  { id: 'assessment', label: 'Assessment', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  { id: 'interview', label: 'Interview', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  { id: 'offer', label: 'Offer', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)' },
  { id: 'rejected', label: 'Rejected', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' }
]

export const DEGREE_OPTIONS = [
  'B.Tech CSE', 'B.Tech ECE', 'B.Tech EEE', 'B.Tech IT',
  'B.Sc Computer Science', 'B.Sc Mathematics', 'B.Sc Statistics',
  'BCA', 'MCA', 'M.Tech', 'MBA', 'B.Com', 'BA Economics', 'Other'
]

export const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate']

export const INDUSTRY_OPTIONS = [
  'Technology', 'Finance & Banking', 'Healthcare', 'E-Commerce',
  'Gaming', 'EdTech', 'FinTech', 'Consulting', 'Media & Entertainment',
  'Cybersecurity', 'Government', 'Startups', 'MNC', 'Research'
]

export const SKILLS_OPTIONS = [
  'JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'TypeScript',
  'React', 'Vue.js', 'Angular', 'Node.js', 'Django', 'Flask', 'FastAPI',
  'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes',
  'Machine Learning', 'Deep Learning', 'Data Analysis', 'Power BI', 'Tableau',
  'Figma', 'UI/UX Design', 'Git', 'Linux', 'AWS', 'Azure', 'GCP',
  'DSA', 'System Design', 'Agile', 'Scrum', 'REST APIs', 'GraphQL'
]

export const INTERESTS_OPTIONS = [
  'Web Development', 'Mobile Development', 'AI & Machine Learning',
  'Data Science', 'Cloud Computing', 'Cybersecurity', 'Blockchain',
  'UI/UX Design', 'Product Management', 'DevOps', 'Open Source',
  'Game Development', 'AR/VR', 'IoT', 'Robotics', 'Competitive Programming'
]

export const GRADUATION_YEARS = ['2024', '2025', '2026', '2027', '2028', '2029']

export const SKILLS_RADAR_DEFAULTS = {
  'Frontend': 40,
  'Backend': 30,
  'DSA': 25,
  'Communication': 60,
  'Problem Solving': 50,
  'System Design': 20,
  'Testing': 15,
  'Leadership': 35
}

export const LOCAL_STORAGE_KEYS = {
  USER: 'careercanvas_user',
  TOKEN: 'careercanvas_token',
  THEME: 'careercanvas_theme',
  ONBOARDING: 'careercanvas_onboarding',
  ROADMAPS: 'careercanvas_roadmaps',
  MILESTONES: 'careercanvas_milestones',
  INTERNSHIPS: 'careercanvas_internships',
  GOALS: 'careercanvas_goals',
  SKILLS: 'careercanvas_skills',
  ACTIVITY: 'careercanvas_activity',
  NOTIFICATIONS: 'careercanvas_notifications'
}

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'roadmap', label: 'Career Roadmap', path: '/roadmap', icon: 'Map' },
  { id: 'planner', label: 'Task Planner', path: '/planner', icon: 'KanbanSquare' },
  { id: 'internships', label: 'Internship Tracker', path: '/internships', icon: 'Briefcase' },
  { id: 'goals', label: 'Goal Tracker', path: '/goals', icon: 'Target' },
  { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'BarChart2' },
  { id: 'skills', label: 'Skills Radar', path: '/skills', icon: 'Activity' },
  { id: 'recommendations', label: 'AI Insights', path: '/recommendations', icon: 'Sparkles' },
  { id: 'profile', label: 'Profile', path: '/profile', icon: 'User' }
]

export const AI_RECOMMENDATION_PROMPTS = {
  career: (profile) => `You are an expert career mentor for students. A student with the following profile needs guidance:

Name: ${profile.name}
Degree: ${profile.degree}, ${profile.year}
Target Role: ${profile.targetRole}
Skills: ${profile.skills?.join(', ')}
Interests: ${profile.interests?.join(', ')}
Industries: ${profile.industries?.join(', ')}

Provide structured JSON response with:
{
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["area1", "area2", ...],
  "skillsToImprove": ["skill1", "skill2", ...],
  "learningStrategy": "paragraph",
  "interviewTips": ["tip1", "tip2", ...],
  "internshipAdvice": "paragraph",
  "weeklyFocus": ["week1 focus", "week2 focus", "week3 focus", "week4 focus"]
}`
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

export const DIFFICULTY_COLORS = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red'
}

export const CAREER_ROLES = [
  'Frontend Developer', 'Backend Developer', 'Data Analyst', 'Data Scientist',
  'AI Engineer', 'Cybersecurity Analyst', 'DevOps Engineer', 'Software Engineer',
  'UX Designer', 'Product Manager'
]
