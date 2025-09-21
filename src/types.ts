
export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export interface CodingProfile {
  _id: string;
  platform: string;
  url: string;
  username?: string;
  category: string;
}

export interface ContactInfo {
  _id: string;
  linkedin: string;
  github: string;
  email: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export interface Internship {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: any[]; // Sanity Portable Text
  technologies: string[];
}

export interface Resume {
  _id: string;
  title: string;
  file: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  fileUrl?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
}

export interface Goal {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
}
