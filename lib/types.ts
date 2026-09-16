export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type NodeStatus = 'not_started' | 'learning' | 'completed';

export interface Course {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  subjects: string[];
  skills: string[];
  domains: string[];
  careerCount?: number;
}

export interface CareerRole {
  id: string;
  slug: string;
  courseSlug: string;
  title: string;
  domain: string;
  description: string;
  beginnerSummary: string;
  difficulty: DifficultyLevel;
  mainSkills: string[];
  technologies: string[];
  responsibilities: string[];
  beginnerReqs: string[];
  roadmapShUrl?: string;
  isPopular?: boolean;
}

export interface RoadmapTopic {
  id: string;
  name: string;
  completed?: boolean;
}

export interface RoadmapNode {
  id: string;
  order: number;
  title: string;
  summary: string;
  beginnerSummary: string;
  whyNeedIt: string;
  topics: string[];
  practiceTasks: string[];
  projectIdea: string;
  resources?: Resource[];
  status?: NodeStatus;
}

export interface Project {
  id: string;
  title: string;
  careerSlug?: string;
  difficulty: DifficultyLevel;
  description: string;
  technologies: string[];
  skillsLearned: string[];
  estimatedTime: string;
  features: string[];
  extensions: string[];
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface Resource {
  id: string;
  skillTag: string;
  title: string;
  type: 'Documentation' | 'Course' | 'Video' | 'Practice' | 'Project';
  level: DifficultyLevel;
  duration: string;
  url: string;
  isFree: boolean;
  provider: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  course: string;
  year: string;
  skillLevel: string;
  careerGoal: string;
  streakDays: number;
  weeklyGoalHours: number;
  studiedHoursThisWeek: number;
}

export interface StudyTask {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  topic: string;
  durationHours: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface CareerComparisonItem {
  category: string;
  key: string;
  values: Record<string, string>;
}
