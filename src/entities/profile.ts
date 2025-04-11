export interface UserCard {
    title: string;
    alt: string;
    name: string;
  }
  
  export interface Bio {
    title: string;
    intro: string;
    skills: string[];
    techIntro: string;
    technologies: string[];
    values: string;
  }
  
  export interface ProjectItem {
    role: string;
    company: string;
    period: string;
    description: string;
    team: string;
    responsibilities: string[];
    technologies: string;
  }
  
  export interface Projects {
    title: string;
    companyDomain: string;
    team: string;
    myRole: string;
    techEnv: string;
    showLess: string;
    readMore: string;
    at: string;
    items: ProjectItem[];
  }
  
  export interface CTA {
    message: string;
    button: string;
  }
  
  export interface Profile {
    title: string;
    description: string;
    userCard: UserCard;
    bio: Bio;
    projects: Projects;
    cta: CTA;
  }