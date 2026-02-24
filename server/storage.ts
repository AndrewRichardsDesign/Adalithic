import { projects, contactSubmissions, type Project, type InsertProject, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentId: number;

  constructor() {
    this.projects = new Map();
    this.contactSubmissions = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample projects
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: "Arcatext",
        description: "AI-powered keyboard for translation and language practice",
        body: "An AI-powered keyboard for quick and accurate translation while texting. It works in any messaging app and provides an easy way to practice a language with friends or AI chat interfaces. Add it to your language learning toolkit, use it to communicate with international clients, and chat fluently with people you meet all over the world.",
        details: "Support: arcatextapp@gmail.com\nPrivacy policy"
      }
    ];

    // Initialize data
    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });

    this.currentId = 100; // Start IDs from 100 to avoid conflicts
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      company: insertSubmission.company || null,
      submittedAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
