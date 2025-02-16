import { IStorage } from "./types";
import { User, Skill, Roadmap, Progress, InsertUser } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skills: Map<number, Skill>;
  private roadmaps: Map<number, Roadmap>;
  private progress: Map<number, Progress>;
  private currentId: number;
  readonly sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.roadmaps = new Map();
    this.progress = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Seed initial skills and roadmaps
    this.seedInitialData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getRoadmap(skillId: number): Promise<Roadmap | undefined> {
    return Array.from(this.roadmaps.values()).find(
      (roadmap) => roadmap.skillId === skillId,
    );
  }

  async getProgress(userId: number, roadmapId: number): Promise<Progress | undefined> {
    return Array.from(this.progress.values()).find(
      (p) => p.userId === userId && p.roadmapId === roadmapId,
    );
  }

  async updateProgress(progress: Progress): Promise<Progress> {
    this.progress.set(progress.id, progress);
    return progress;
  }

  private seedInitialData() {
    // Seed skills
    const webDev: Skill = {
      id: 1,
      name: "Web Development",
      description: "Learn modern web development from start to finish",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    };
    this.skills.set(webDev.id, webDev);

    const ml: Skill = {
      id: 2,
      name: "Machine Learning",
      description: "Master machine learning and AI concepts",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    };
    this.skills.set(ml.id, ml);

    const devops: Skill = {
      id: 3,
      name: "DevOps",
      description: "Learn modern DevOps practices and tools",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
    };
    this.skills.set(devops.id, devops);

    const cybersecurity: Skill = {
      id: 4,
      name: "Cybersecurity",
      description: "Master cybersecurity concepts and practices",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    };
    this.skills.set(cybersecurity.id, cybersecurity);

    // Seed roadmaps
    const webDevRoadmap: Roadmap = {
      id: 1,
      skillId: 1,
      title: "Full Stack Web Development",
      description: "Complete path to becoming a full stack developer",
      steps: [
        {
          id: "html-css",
          title: "HTML & CSS Fundamentals",
          description: "Learn the basics of web development",
          resources: [
            {
              type: "course",
              title: "HTML & CSS Crash Course",
              url: "https://www.youtube.com/watch?v=916GWv2Qs08",
              duration: "2 hours"
            },
            {
              type: "article",
              title: "MDN Web Docs - HTML Basics",
              url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics"
            }
          ]
        },
        {
          id: "javascript",
          title: "JavaScript Essentials",
          description: "Master core JavaScript concepts",
          resources: [
            {
              type: "article",
              title: "JavaScript Fundamentals",
              url: "https://javascript.info/"
            },
            {
              type: "course",
              title: "JavaScript - The Complete Guide",
              url: "https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced",
              duration: "52 hours"
            }
          ]
        },
        {
          id: "react",
          title: "React Framework",
          description: "Learn React for building modern web applications",
          resources: [
            {
              type: "course",
              title: "React - The Complete Guide",
              url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux",
              duration: "48 hours"
            },
            {
              type: "video",
              title: "React Crash Course",
              url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
              duration: "4 hours"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(webDevRoadmap.id, webDevRoadmap);

    const mlRoadmap: Roadmap = {
      id: 2,
      skillId: 2,
      title: "Machine Learning Engineer Path",
      description: "Comprehensive guide to becoming an ML engineer",
      steps: [
        {
          id: "python-basics",
          title: "Python Programming",
          description: "Learn Python fundamentals for ML",
          resources: [
            {
              type: "course",
              title: "Python for Data Science",
              url: "https://www.coursera.org/learn/python-for-applied-data-science-ai",
              duration: "20 hours"
            }
          ]
        },
        {
          id: "math-stats",
          title: "Mathematics and Statistics",
          description: "Essential math concepts for ML",
          resources: [
            {
              type: "course",
              title: "Mathematics for Machine Learning",
              url: "https://www.coursera.org/specializations/mathematics-machine-learning",
              duration: "4 months"
            }
          ]
        },
        {
          id: "ml-basics",
          title: "ML Fundamentals",
          description: "Core machine learning concepts",
          resources: [
            {
              type: "course",
              title: "Machine Learning by Andrew Ng",
              url: "https://www.coursera.org/learn/machine-learning",
              duration: "60 hours"
            },
            {
              type: "article",
              title: "ML Crash Course by Google",
              url: "https://developers.google.com/machine-learning/crash-course"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(mlRoadmap.id, mlRoadmap);

    const devopsRoadmap: Roadmap = {
      id: 3,
      skillId: 3,
      title: "DevOps Engineering Path",
      description: "Master modern DevOps practices",
      steps: [
        {
          id: "linux-basics",
          title: "Linux Fundamentals",
          description: "Learn Linux system administration",
          resources: [
            {
              type: "course",
              title: "Linux Administration Bootcamp",
              url: "https://www.udemy.com/course/linux-administration-bootcamp",
              duration: "24 hours"
            }
          ]
        },
        {
          id: "docker-containers",
          title: "Containerization with Docker",
          description: "Master Docker and container concepts",
          resources: [
            {
              type: "video",
              title: "Docker for Beginners",
              url: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
              duration: "4 hours"
            },
            {
              type: "course",
              title: "Docker Mastery",
              url: "https://www.udemy.com/course/docker-mastery",
              duration: "21 hours"
            }
          ]
        },
        {
          id: "kubernetes",
          title: "Kubernetes Orchestration",
          description: "Learn container orchestration with Kubernetes",
          resources: [
            {
              type: "course",
              title: "Kubernetes for the Absolute Beginners",
              url: "https://www.udemy.com/course/learn-kubernetes",
              duration: "5 hours"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(devopsRoadmap.id, devopsRoadmap);

    const securityRoadmap: Roadmap = {
      id: 4,
      skillId: 4,
      title: "Cybersecurity Specialist Path",
      description: "Become a cybersecurity professional",
      steps: [
        {
          id: "networking",
          title: "Networking Fundamentals",
          description: "Learn computer networking basics",
          resources: [
            {
              type: "course",
              title: "Computer Networking Course",
              url: "https://www.coursera.org/learn/computer-networking",
              duration: "30 hours"
            }
          ]
        },
        {
          id: "security-basics",
          title: "Security Fundamentals",
          description: "Learn basic security concepts",
          resources: [
            {
              type: "course",
              title: "Introduction to Cybersecurity",
              url: "https://www.coursera.org/learn/intro-cyber-security",
              duration: "15 hours"
            },
            {
              type: "video",
              title: "Web Security Fundamentals",
              url: "https://www.youtube.com/watch?v=WlmKwIe9z1Q",
              duration: "1 hour"
            }
          ]
        },
        {
          id: "ethical-hacking",
          title: "Ethical Hacking",
          description: "Learn ethical hacking and penetration testing",
          resources: [
            {
              type: "course",
              title: "Ethical Hacking Course",
              url: "https://www.udemy.com/course/ethical-hacking-beginners-to-expert-level",
              duration: "45 hours"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(securityRoadmap.id, securityRoadmap);
  }

}

export const storage = new MemStorage();