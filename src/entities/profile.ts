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

  export interface Company {
    label: string;
    imageUrl: string;
  }
  
  export interface Project {
    role: string;
    company: Company;
    period: string;
    description: string;
    team: string;
    responsibilities: string[];
    technologies: string[];
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
    showAll: string;
    items: Project[];
  }
  
  export interface CTA {
    message: string;
    button: string;
  }

  export interface Issuer {
    label: string;
    imageUrl: string;
  }
  
  export interface Certification {
    imageSrc: string;
    title: string;
    issuer: Issuer;
    issuedDate: string;
  }

  export interface Certifications {
    title: string;
    showAll: string;
    items: Certification[];
  }
  
  export interface Profile {
    title: string;
    description: string;
    userCard: UserCard;
    bio: Bio;
    projects: Projects;
    cta: CTA;
    certifications: Certifications;
  }