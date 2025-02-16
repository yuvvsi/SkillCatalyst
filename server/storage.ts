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
    // Web Development Related Skills
    const webDev: Skill = {
      id: 1,
      name: "Web Development",
      description: "Learn modern web development from start to finish",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    };
    this.skills.set(webDev.id, webDev);

    const frontendDev: Skill = {
      id: 2,
      name: "Frontend Development",
      description: "Master modern frontend frameworks and tools",
      image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
    };
    this.skills.set(frontendDev.id, frontendDev);

    const backendDev: Skill = {
      id: 3,
      name: "Backend Development",
      description: "Build scalable server-side applications",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    };
    this.skills.set(backendDev.id, backendDev);

    // Data & AI Skills
    const ml: Skill = {
      id: 4,
      name: "Machine Learning",
      description: "Master machine learning and AI concepts",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    };
    this.skills.set(ml.id, ml);

    const dataScience: Skill = {
      id: 5,
      name: "Data Science",
      description: "Learn data analysis and visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    };
    this.skills.set(dataScience.id, dataScience);

    const deepLearning: Skill = {
      id: 6,
      name: "Deep Learning",
      description: "Master neural networks and deep learning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad095",
    };
    this.skills.set(deepLearning.id, deepLearning);

    // Infrastructure & DevOps
    const devops: Skill = {
      id: 7,
      name: "DevOps",
      description: "Learn modern DevOps practices and tools",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
    };
    this.skills.set(devops.id, devops);

    const cloudComputing: Skill = {
      id: 8,
      name: "Cloud Computing",
      description: "Master cloud platforms and services",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    };
    this.skills.set(cloudComputing.id, cloudComputing);

    const siteReliability: Skill = {
      id: 9,
      name: "Site Reliability Engineering",
      description: "Learn SRE practices and principles",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    };
    this.skills.set(siteReliability.id, siteReliability);

    // Security
    const cybersecurity: Skill = {
      id: 10,
      name: "Cybersecurity",
      description: "Master cybersecurity concepts and practices",
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    };
    this.skills.set(cybersecurity.id, cybersecurity);

    const appSecurity: Skill = {
      id: 11,
      name: "Application Security",
      description: "Learn secure coding and application security",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    };
    this.skills.set(appSecurity.id, appSecurity);

    const networkSecurity: Skill = {
      id: 12,
      name: "Network Security",
      description: "Master network security and protocols",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce",
    };
    this.skills.set(networkSecurity.id, networkSecurity);

    // Mobile & Game Development
    const mobileDev: Skill = {
      id: 13,
      name: "Mobile Development",
      description: "Build mobile apps for iOS and Android",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    };
    this.skills.set(mobileDev.id, mobileDev);

    const gameDev: Skill = {
      id: 14,
      name: "Game Development",
      description: "Create games using modern engines",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914",
    };
    this.skills.set(gameDev.id, gameDev);

    const arVr: Skill = {
      id: 15,
      name: "AR/VR Development",
      description: "Build augmented and virtual reality experiences",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
    };
    this.skills.set(arVr.id, arVr);

    // Programming Languages
    const rust: Skill = {
      id: 16,
      name: "Rust Programming",
      description: "Learn systems programming with Rust",
      image: "https://images.unsplash.com/photo-1536395475264-165de25b30a7",
    };
    this.skills.set(rust.id, rust);

    const golang: Skill = {
      id: 17,
      name: "Go Programming",
      description: "Master Go for backend development",
      image: "https://images.unsplash.com/photo-1600267204026-85c3cc6c8459",
    };
    this.skills.set(golang.id, golang);

    const typescript: Skill = {
      id: 18,
      name: "TypeScript",
      description: "Write type-safe JavaScript applications",
      image: "https://images.unsplash.com/photo-1527427337751-fdca2f128ce5",
    };
    this.skills.set(typescript.id, typescript);

    // Emerging Technologies
    const blockchain: Skill = {
      id: 19,
      name: "Blockchain Development",
      description: "Build decentralized applications",
      image: "https://images.unsplash.com/photo-1644143379190-08a5f055de1d",
    };
    this.skills.set(blockchain.id, blockchain);

    const iot: Skill = {
      id: 20,
      name: "Internet of Things",
      description: "Develop IoT solutions and applications",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f",
    };
    this.skills.set(iot.id, iot);


    // Add more skills here...  At least 20 are required.  Adding placeholders.
    for (let i = 21; i <= 30; i++) {
        this.skills.set(i, {id: i, name: `Skill ${i}`, description: `Description for Skill ${i}`, image: "https://via.placeholder.com/150"});
    }


    // Example detailed roadmap for Web Development
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
            },
            {
              type: "course",
              title: "CSS Grid & Flexbox for Responsive Layouts",
              url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
              duration: "3 hours"
            },
            {
              type: "video",
              title: "CSS Animation Tutorial",
              url: "https://www.youtube.com/watch?v=jgw82b5Y2MU",
              duration: "1 hour"
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
            },
            {
              type: "video",
              title: "JavaScript ES6+ Features",
              url: "https://www.youtube.com/watch?v=nZ1DMMsyVyI",
              duration: "1.5 hours"
            },
            {
              type: "article",
              title: "JavaScript Design Patterns",
              url: "https://addyosmani.com/resources/essentialjsdesignpatterns/book/"
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
            },
            {
              type: "article",
              title: "React Patterns and Best Practices",
              url: "https://reactpatterns.com/"
            },
            {
              type: "course",
              title: "Advanced React Patterns",
              url: "https://frontendmasters.com/courses/advanced-react-patterns/",
              duration: "5 hours"
            }
          ]
        },
        {
          id: "backend",
          title: "Backend Development",
          description: "Build server-side applications with Node.js",
          resources: [
            {
              type: "course",
              title: "Node.js Complete Guide",
              url: "https://www.udemy.com/course/nodejs-the-complete-guide",
              duration: "40 hours"
            },
            {
              type: "video",
              title: "Express.js Crash Course",
              url: "https://www.youtube.com/watch?v=L72fhGm1tfE",
              duration: "1.5 hours"
            },
            {
              type: "article",
              title: "RESTful API Design Best Practices",
              url: "https://blog.restcase.com/rest-api-design-best-practices/"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(webDevRoadmap.id, webDevRoadmap);

    // Example detailed roadmap for Machine Learning
    const mlRoadmap: Roadmap = {
      id: 2,
      skillId: 4,
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
            },
            {
              type: "video",
              title: "Python for Beginners",
              url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
              duration: "6 hours"
            },
            {
              type: "article",
              title: "Python Data Structures",
              url: "https://realpython.com/python-data-structures/"
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
            },
            {
              type: "article",
              title: "Statistics for Machine Learning",
              url: "https://www.analyticsvidhya.com/blog/2017/01/comprehensive-practical-guide-statistical-modeling-data-analysis/"
            },
            {
              type: "video",
              title: "Linear Algebra Essentials",
              url: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
              duration: "15 hours"
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
            },
            {
              type: "video",
              title: "Applied ML with scikit-learn",
              url: "https://www.youtube.com/watch?v=pqNCD_5r0IU",
              duration: "4 hours"
            }
          ]
        },
        {
          id: "deep-learning",
          title: "Deep Learning",
          description: "Neural networks and deep learning concepts",
          resources: [
            {
              type: "course",
              title: "Deep Learning Specialization",
              url: "https://www.coursera.org/specializations/deep-learning",
              duration: "4 months"
            },
            {
              type: "video",
              title: "PyTorch Deep Learning",
              url: "https://www.youtube.com/watch?v=QIUxPv5PJOY",
              duration: "8 hours"
            },
            {
              type: "article",
              title: "Neural Networks Guide",
              url: "https://www.deeplearning.ai/ai-notes/"
            }
          ]
        }
      ]
    };
    this.roadmaps.set(mlRoadmap.id, mlRoadmap);

    const devopsRoadmap: Roadmap = {
      id: 3,
      skillId: 7,
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
      skillId: 10,
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