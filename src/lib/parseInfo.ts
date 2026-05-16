import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Social {
  github: string;
  linkedin: string;
  email: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  bio_short: string;
  roles: string[];
  stats: Stat[];
  socials: Social;
  projects: Project[];
  skills: SkillCategory[];
  experience: Experience[];
  aboutHtml: string;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const infoPath = path.join(process.cwd(), 'content', 'info.md');
  const fileContents = fs.readFileSync(infoPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const aboutHtml = processedContent.toString();

  return {
    name: data.name || 'Developer',
    tagline: data.tagline || '',
    bio_short: data.bio_short || '',
    roles: data.roles || [],
    stats: data.stats || [],
    socials: data.socials || { github: '', linkedin: '', email: '' },
    projects: data.projects || [],
    skills: data.skills || [],
    experience: data.experience || [],
    aboutHtml,
  };
}
